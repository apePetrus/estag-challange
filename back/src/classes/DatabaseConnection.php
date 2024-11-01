<?php

class DatabaseConnection{

	private static string $HOSTNAME, $DATABASE, $USER, $PASSWORD;

	private static function initialize(): void {
		if (!isset(self::$HOSTNAME)) {
			self::$HOSTNAME = 'pgsql_desafio';
			self::$DATABASE = 'applicationphp';
			self::$USER = 'root';
			self::$PASSWORD = 'root';
		}
	}

	public static function getConnection(): ?object{
		self::initialize();
		try {
			$conn = new PDO(
				'pgsql:host=' . self::$HOSTNAME . ';dbname=' . self::$DATABASE,
				self::$USER,
				self::$PASSWORD
			);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $conn;
		} catch (Exception $e) {
			echo "Error : " . $e->getMessage();
			return null;
		}
	}
}
