<?php

class OrderItem{

 	private static ?object $conn = null;
	
	private static function initializeConnection(): void {
		if (!isset(self::$conn))
			self::$conn = DatabaseConnection::getConnection();
	}


	private static function readOrderItems(): array {
    $sql = '
      SELECT ot.code, pr.name, ot.price, ot.tax, ot.amount,
      ot.price * ot.amount AS total,
      NULL AS totalvalue,
      NULL AS taxed
      FROM order_item ot
      INNER JOIN products pr ON ot.product_code = pr.code
      WHERE order_code = (SELECT MAX(code) FROM orders)
      UNION ALL
      SELECT NULL, NULL, NULL, NULL, NULL, NULL,
      SUM(price * amount),
      SUM(ROUND((price * amount) * (tax / 100), 2))
      AS tax_value
      FROM order_item
      WHERE order_code = (SELECT MAX(code) FROM orders)
      ORDER BY code;
    ';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }


	private static function readOrderItem(int $code): array {
    $sql = '
      SELECT ot.code, pr.name, ot.price, ot.tax, ot.amount,
      ot.price * ot.amount AS total,
      NULL AS totalvalue,
      NULL AS taxed
      FROM order_item ot
      INNER JOIN products pr ON ot.product_code = pr.code
      WHERE order_code = :code
      UNION ALL
      SELECT NULL, NULL, NULL, NULL, NULL, NULL,
      SUM(price * amount),
      SUM(round((price * amount) * (tax / 100), 2))
      AS tax_value
      FROM order_item
      WHERE order_code = :code
      ORDER BY code;
    ';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->execute(
      ['code' => $code ]
    );
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }


  private static function addOrderItems(int $product_code, int $amount): array { 
    $sql = '
      INSERT INTO order_item
      (product_code, amount, order_code, price, tax)
      VALUES (:product_code,
      :amount,
      (SELECT MAX(code) FROM orders),
      (SELECT pr.price FROM products pr 
      WHERE pr.code = :product_code),
      (SELECT ct.tax FROM products pr 
      INNER JOIN categories ct ON pr.category_code = ct.code 
      WHERE pr.code = :product_code)
      )
    ';

    try {
      self::$conn->beginTransaction();

      $stmt = self::$conn->prepare($sql);
      $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
      $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
      $stmt->execute();
      $last_code = self::$conn->lastInsertId();

      self::$conn->commit();

      self::updateOrders();

      $get_last_query_info = ('
        SELECT pr.name, pr.price,
        pr.price * ot.amount AS total,
        (SELECT total FROM orders WHERE code = (SELECT MAX(code) FROM orders)) AS totalest,
        (SELECT tax FROM orders WHERE code = (SELECT MAX(code) FROM orders)) AS totaltax
        FROM order_item ot
        INNER JOIN products pr ON ot.product_code = pr.code
        WHERE ot.code = (SELECT MAX(code) FROM order_item)
      ');
      $stmt = self::$conn->prepare($get_last_query_info);
      $stmt->execute();
      $info = $stmt->fetch(PDO::FETCH_ASSOC);

      return [
        "code" => $last_code,
        "product_code" => $product_code,
        "amount" => $amount,
        "name" => $info['name'],
        "price" => $info['price'],
        "total" => $info['total'],
        "totalest" => $info['totalest'],
        "totaltax" => $info['totaltax']
      ];
    } catch (PDOException) {
      http_response_code(401);
      return [
        'status' => 401,
        'message' => 'Unathourized'
      ];
    }
  }


  private static function updateOrders(): array {
    $update = '
      UPDATE orders
      SET total = (
      SELECT 
      SUM(ot.price * ot.amount) AS total
      FROM order_item ot 
      WHERE ot.order_code = (SELECT MAX(code) FROM orders)
      ),
      tax = (
      SELECT
      SUM(ROUND((ot.price * ot.amount) * (tax / 100), 2)) AS tax
      FROM order_item ot 	
      WHERE ot.order_code = (SELECT MAX(code) FROM orders)
      )
      WHERE code = (SELECT MAX(code) FROM orders)
    ';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($update);
    $stmt->execute();

    self::$conn->commit();

    http_response_code(200);
    return [
      '200' => 'Ok'
    ];
  }


  private static function deleteOrderItems(int $order_item_code): array {
    $sql = 'DELETE FROM order_item WHERE code = :order_item_code';

    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->bindParam(':order_item_code', $order_item_code, PDO::PARAM_INT);
    $stmt->execute();

    self::$conn->commit();

    self::updateOrders();

    $sql = '
      SELECT code, total, tax, historydate
      FROM orders
      WHERE code = (SELECT MAX(code) FROM orders)
      ORDER BY code ASC
    ';
    $stmt = self::$conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    return $result;
  }


  private static function deleteAllOrderItems(): array {
    $sql = '
      DELETE FROM order_item 
      WHERE order_code = (SELECT MAX(code) FROM orders)
    ';

    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->execute();

    self::$conn->commit();

    self::updateOrders();

    http_response_code(200);
    return [
      '200' => 'Ok'
    ];
  }


	public static function handleOrderItemRequest(array $request_info): array | object {
		self::initializeConnection();
		$method = $request_info['METHOD'];
    $item_code = intval($request_info['ITEM_CODE']) ?? null;

    $product_code = $request_info['BODY']['product_code'] ?? null;
    $amount = $request_info['BODY']['amount'] ?? null;

    $max = $_GET["max"] ?? null;

		switch ($method) {
      case 'GET':
        if ($max) {
          return Common::getMaxAmount($max);
        }
        else if ($item_code) {
          return self::readOrderItem($item_code);
        }
        return self::readOrderItems();
      break;

      case 'POST':
				if ($product_code and $amount) {
          return self::addOrderItems($product_code, $amount);
        }
        http_response_code(428);
				return [
					'status' => 428,
					'message' => 'Precondition Required'
        ];
        break;

      case 'DELETE':
        if ($item_code) {
          return self::deleteOrderItems($item_code);
        }
        return self::deleteAllOrderItems();
      break;

			default:
				http_response_code(501);
				return [
					'status' => 501,
					'message' => 'Not Implemented'
				];
      break;
		}
	}
}
