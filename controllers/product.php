<?php

require __DIR__ . "/../services/product/ProductValidation.php";
require __DIR__ . "/../utils/numbers/convertPriceUs.php";

function handleAddProduct($data)
{
    global $conn;

    $v = new ProductValidation();
    $errorMessages = $v->validate($data, $conn);

    if (!empty($errorMessages)) {
        echo json_encode(['errors' => $errorMessages]);
        return;
    }

    $newProduct = new Product($conn);

    $success = $newProduct->save(
        $data['name'],
        convertPriceUS($data['price']),
        $data['category_id'],
        $data['stock_qty'],
        $data['code']
    );

    if ($success) {
        echo json_encode(['message' => "Product inserted successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => "Error inserting product."]);
    }
}

function getProductsByName($name)
{
    global $conn;

    $productInstance = new Product($conn);

    return $productInstance->getByName($name);
}
