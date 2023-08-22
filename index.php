<?php

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/headers.php';

require_once __DIR__ . '/repositories/Product.php';
require_once __DIR__ . "/repositories/Category.php";
require_once __DIR__ . "/repositories/Sale.php";
require_once __DIR__ . "/repositories/SaleProduct.php";

require_once __DIR__ . '/controllers/product.php';
require_once __DIR__ . '/controllers/category.php';
require_once __DIR__ . '/controllers/sale.php';

require_once __DIR__ . '/routes/index.php';

$method = $_SERVER['REQUEST_METHOD'];
$route = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($method === 'OPTIONS') {
    defineHeaders();
    http_response_code(200);
} else {
    defineHeaders();
    initRoutes($route, $method);
}
