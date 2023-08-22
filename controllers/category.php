<?php

require_once __DIR__ . "/../services/category/CategoryValidation.php";

function handleAddCategory($data)
{
    global $conn;

    $v = new CategoryValidation();
    $errorMessages = $v->validate($data, $conn);

    if (!empty($errorMessages)) {
        http_response_code(400);
        echo json_encode(['errors' => $errorMessages]);
        return;
    }

    $categoryInstance = new Category($conn);

    if ($categoryInstance->loadByName($data['name'])) {
        http_response_code(409);
        echo json_encode(['errors' => ["Nome já existe."]]);
        return;
    }

    $success = $categoryInstance->save(
        $data['name'],
        $data['tax_percentage'],
    );

    if ($success) {
        echo json_encode(['message' => "Category inserted successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => "Error inserting category."]);
    }
}

function getCategoryById($id)
{
    global $conn;

    $categoryInstance = new Category($conn);

    return $categoryInstance->loadById($id);
}

function getAllCategories()
{
    global $conn;

    $categoryInstance = new Category($conn);

    return $categoryInstance->loadAll();
}


function getTaxPercentage($categoryId)
{
    global $conn;

    $categoryInstance = new Category($conn);

    $categoryData = json_decode($categoryInstance->loadById($categoryId), true);

    return $categoryData['tax_percentage'];
}
