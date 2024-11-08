<?php

class Products{

	private static ?object $conn = null;

	private static function initializeConnection(): void {
		if (!isset(self::$conn))
			self::$conn = DatabaseConnection::getConnection();
  }


	private static function readProducts(): array {
    $sql = 'SELECT products.code, products.name, amount, price, categories.name AS category_name
      FROM products
      INNER JOIN categories ON products.category_code = categories.code
      ORDER BY products.code ASC';
    self::$conn->beginTransaction();
    
    $stmt = self::$conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }


  private static function readProduct(int $code): array {
    $sql = 'SELECT pr.code, pr.name, amount, price, ct.tax, ct.name AS category_name
      FROM products pr
      INNER JOIN categories ct ON pr.category_code = ct.code
      WHERE pr.code = :code
      ORDER BY pr.code ASC';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->execute(
      ['code' => $code]
    );
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }


  private static function readProductsByCategories(int $category_code): array {
    $sql = 'SELECT products.code, products.name, amount, price, categories.name AS category_name
      FROM products
      INNER JOIN categories ON products.category_code = categories.code
      WHERE category_code = :category_code
      ORDER BY products.code ASC';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->execute(
      [ 'category_code' => $category_code ]
    );
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }

 
  private static function addProduct(string $name, int $amount, float $price, int $category_code): array {
    $sql = '
      INSERT INTO products (name, amount, price, category_code)
      VALUES (:name, :amount, :price, :category_code)
    ';
    self::$conn->beginTransaction();

    try {
      $stmt = self::$conn->prepare($sql);
      $stmt->bindParam(':name', $name, PDO::PARAM_STR);
      $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
      $stmt->bindParam(':price', $price, PDO::PARAM_STR);
      $stmt->bindParam(':category_code', $category_code, PDO::PARAM_INT);
      $stmt->execute();

      $last_id = self::$conn->lastInsertId();
      self::$conn->commit();

      $get_category = ('
        SELECT name FROM categories WHERE code = :category_code;
      ');
      $stmt = self::$conn->prepare($get_category);
      $stmt->execute(
        [ 'category_code' => $category_code ]
      );
      $category_name = $stmt->fetch(PDO::FETCH_ASSOC);

      return [
        "code" => $last_id,
        "name" => $name,
        "amount" => $amount,
        "price" => $price,
        "category_code" => $category_code,
        "category_name" => $category_name['name']
      ];
    } catch (PDOException) {
      http_response_code(401);
      return [
        'status' => 401,
        'message' => 'Unathourized'
      ];
    }
  }


  private static function deleteProduct(int $product_id): array {
    $sql = 'DELETE FROM products WHERE code = :product_id';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
    $stmt->execute();

    self::$conn->commit();

    return [
      http_response_code(200)
    ];
  }


	public static function handleProductRequest(array $request_info): array | object | string {
    self::initializeConnection();
		$method = $request_info['METHOD'];
    $item_code = intval($request_info['ITEM_CODE']) ?? null;

		$product_name = $request_info['BODY']['name'] ?? null;
    $amount = $request_info['BODY']['amount'] ?? null;
    $price = $request_info['BODY']['price'] ?? null;
    $category_code = $request_info['BODY']['category_code'] ?? null;

    $category_parameter = $_GET['category'] ?? null;

		switch ($method) {
			case 'GET':
        if ($item_code) {
          return self::readProduct($item_code);
        }
        else if ($category_parameter) {
          return self::readProductsByCategories($category_parameter);
        }
        return self::readProducts();
      break;

			case 'POST':
				if ($product_name and $amount and $price and $category_code) {
          return self::addProduct($product_name, $amount, $price, $category_code);
        }

        http_response_code(428);
				return [
					'status' => 428,
					'message' => 'Precondition Required'
        ];
      break;

      case 'DELETE':
        return self::deleteProduct($item_code);
      break;

			default:
				http_response_code(405);
				return [
					'status' => 405,
          'message' => 'Method Not Allowed'
				];
      break;
		}
	}
}
