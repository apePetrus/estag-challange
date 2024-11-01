<?php

class Common {
	private static ?object $conn = null;
	
	private static function initializeConnection(): void {
		if (!isset(self::$conn))
			self::$conn = DatabaseConnection::getConnection();
  }


  public static function setDate(): string {
    date_default_timezone_set('America/Sao_Paulo');
    $date = date_create("");
    return date_format($date, "Y/m/d H:i:s");
  }


  public static function getMaxAmount(int $product_code): array {
    self::initializeConnection();
    try {
    $stmt = self::$conn->query("
      SELECT
      COALESCE(
      (SELECT
      pr.amount - COALESCE(SUM(ot.amount), 0)
      FROM order_item ot
      INNER JOIN products pr ON ot.product_code = pr.code
      WHERE pr.code = $product_code AND ot.order_code = (SELECT MAX(code) FROM orders)
      GROUP BY pr.amount)
      , (SELECT amount FROM products WHERE code = $product_code)) AS max
      ");
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      return $result;
    } catch (PDOException $e){

    }
  }
}
