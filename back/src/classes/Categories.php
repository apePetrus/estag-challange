<?php

class Categories{

  private static ?object $conn = null;

	private static function initializeConnection(): void {
		if (!isset(self::$conn))
			self::$conn = DatabaseConnection::getConnection();
	}


	private static function readCategories(): array {
    $sql = 'SELECT code, name, tax
      FROM categories ORDER BY code ASC';
      self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $result;
  }


	private static function addCategory(string $name, float $tax): array {
    $sql = 'INSERT INTO categories (name, tax) VALUES (:name, :tax)';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':tax', $tax, PDO::PARAM_STR);
    $stmt->execute();
    $last_id = self::$conn->lastInsertId();

    self::$conn->commit();

    http_response_code(200);
    return [
      "code" => $last_id,
      "name" => $name,
      "tax" => $tax
    ];
	}


  private static function deleteCategory(int $code): array {
    $sql = 'DELETE FROM categories WHERE code = :code';
    self::$conn->beginTransaction();

    $stmt = self::$conn->prepare($sql);
    $stmt->bindParam(':code', $code, PDO::PARAM_INT);
    $stmt->execute();

    self::$conn->commit();

    http_response_code(200);
    return [
      '200' => 'Ok'
    ];
  }


	public static function handleCategoryRequest(array $request_info): array | object {
    self::initializeConnection();
    $method = $request_info['METHOD'];
    $item_code = intval($request_info['ITEM_CODE']) ?? null;

		$category_name = $request_info['BODY']['name'] ?? null;
    $tax = $request_info['BODY']['tax'] ?? null;

		switch ($method){
			case 'GET':
        return self::readCategories();
      break;

      case 'POST':
				if ($category_name and isset($tax)) {
          return self::addCategory($category_name, $tax);
        }

        http_response_code(428);
				return [
					'status' => 428,
					'message' => 'Precondition Required'
        ];
      break;

      case 'DELETE':
        return self::deleteCategory($item_code);
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
