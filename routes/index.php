<?php

function initRoutes($route, $method)
{
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if ($route && $data !== null) {
            switch ($route) {
                case '/api/product':
                    handleAddProduct($data);
                    break;
                case '/api/category':
                    handleAddCategory($data);
                    break;
                case '/api/sale':
                    handleAddSale($data);
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(['message' => 'Route not found']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid data']);
        }
    } elseif ($method === "GET") {
        switch ($route) {
            case '/api/category':
                if (isset($_GET['id'])) {
                    echo getCategoryById($_GET['id']);
                }
                break;
            case '/api/categories':
                echo getAllCategories();
                break;
            case '/api/products':
                if (isset($_GET['search'])) {
                    echo getProductsByName($_GET['search']);
                }
                break;
            case '/api/category/tax':
                if (isset($_GET['category_id'])) {
                    echo getTaxPercentage($_GET['category_id']);
                }
                break;
            case '/api/sales':
                // echo getAllSales($data);
                break;
            default:
                http_response_code(404);
                echo json_encode(['message' => 'Route GET not found']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Route GET not found']);
    }
}
