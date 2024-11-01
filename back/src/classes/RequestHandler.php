<?php
class RequestHandler {

  private array $request;


	public function __construct(array $request_info) {
		$this->request = $request_info;
	}


	public function getRequestInfo(): array {
		return $this->request;
	}


	public function getResponse() {
    switch ($this->request['ENDPOINT']) {
			case null:
				return [
					'categories' => 'http://localhost/categories/',
					'products' => 'http://localhost/products/',
          'orders' => 'http://localhost/orders/',
          'order_item' => 'http://localhost/order_item/'
        ];
      break;

			case 'categories':
        return Categories::handleCategoryRequest($this->request);
      break;

			case 'products':
        return Products::handleProductRequest($this->request);
      break;

			case 'orders':
        return Orders::handleOrdersRequest($this->request);
      break;

      case 'order_item':
        return OrderItem::handleOrderItemRequest($this->request);
      break;

			default:
				http_response_code(404);
				return [
					'message' => 'Page not found'
				];
      break;
		}
	}

}
