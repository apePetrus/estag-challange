<?php
class Orders{

 	private static ?object $conn = null;
	
	private static function initializeConnection(): void {
		if (!isset(self::$conn))
			self::$conn = DatabaseConnection::getConnection();
	}


	private static function readOrders(): array {
    $stmt = self::$conn->query('
      SELECT code, total, tax, historydate
      FROM orders ORDER BY code ASC'
    );
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }


  private static function updateOrders(float $total, float $tax): array {
    self::updateStorage();
    /* $sql = ' */
    /*   UPDATE orders */
    /*   SET total = :total, tax = :tax */
    /*   WHERE code = (select max(code) from orders) */
    /* '; */
    /**/
    /* self::$conn->beginTransaction(); */
    /* $stmt = self::$conn->prepare($sql); */
    /* $stmt->bindParam(':total', $total, PDO::PARAM_STR); */
    /* $stmt->bindParam(':tax', $tax, PDO::PARAM_STR); */
    /* $stmt->execute(); */
    /**/
    /* self::$conn->commit(); */

    self::addOrders(0, 0);

    return [
      "total" => $total,
      "tax" => $tax
    ];
  }


  private static function updateStorage() {
    $order_items = self::getOrderItems();

    foreach ($order_items as $i){
      $product_code = $i['product_code'];
      $amount_order_item = $i['amount'];

      $stmt = self::$conn->query("
        UPDATE products
        SET amount = amount - $amount_order_item
        WHERE code = $product_code
      ");
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
  }


	private static function getOrderItems(): array {
		self::initializeConnection();
    $stmt = self::$conn->query('
      SELECT ot.code, pr.name, pr.price, ot.amount,
      pr.price * ot.amount AS total,
      ot.product_code
      FROM order_item ot
      INNER JOIN products pr ON ot.product_code = pr.code
      WHERE order_code = (select max(code) FROM orders)
      ');
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }

  
	private static function addOrders(float $total, float $tax): array | string {
    $sql = '
      INSERT INTO orders (total, tax, historydate) VALUES (:total, :tax, :historydate)
    ';
    $current_data = Common::setDate();
    
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->bindParam(':total', $total, PDO::PARAM_STR);
    $stmt->bindParam(':tax', $tax, PDO::PARAM_STR);
    $stmt->bindParam(':historydate', $current_data, PDO::PARAM_STR);
    $stmt->execute();
    $last_code = self::$conn->lastInsertId();

    self::$conn->commit();

    return [
      "code" => $last_code,
      "total" => $total,
      "tax" => $tax	
    ];
	}


	public static function handleOrdersRequest(array $request_info): array | object | string {
		self::initializeConnection();
		$method = $request_info['METHOD'];

		$total = $request_info['BODY']['total'] ?? null;
    $tax = $request_info['BODY']['tax'] ?? null;

    switch ($method){
      case 'GET':
        return self::readOrders();
      break;

      case 'POST':
        if (isset($total) and isset($tax))
          return self::addOrders($total, $tax);
				return [
					'status' => 428,
					'message' => 'Precondition Required'
        ];
      break;

      case 'PATCH':
          return self::updateOrders($total, $tax);
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

