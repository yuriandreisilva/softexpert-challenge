<?php
require __DIR__ . "/../services/sale/SaleProductValidation.php";

function handleAddSale($products)
{
    global $conn;

    $v = new SaleValidation();
    $errorMessages = $v->validate($products, $conn);

    if (!empty($errorMessages)) {
        echo json_encode(['errors' => $errorMessages]);
        return;
    }

    $sale = new Sale($conn);
    $productInstance = new Product($conn);
    $salesProducts = new SalesProducts($conn);

    $date = new DateTime();
    $saleDate = $date->format('Y-m-d');

    $totals = calculateTotals($products, $productInstance);

    $saleId = $sale->save($saleDate, $totals['totalSaleValue'], $totals['totalTax']);

    if ($saleId !== null) {
        foreach ($products as $product) {
            $soldQuantity = $product['sold_quantity'];
            $productId = $product['product_id'];

            $productLoaded = $productInstance->getById($productId);

            $salesProducts->save($saleId, $productId, $soldQuantity);

            subtractStockAndUpdate($productLoaded, $soldQuantity);
        }

        echo json_encode(['message' => "Sale inserted successfully!."]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => "Error inserting sale."]);
    }
}

function calculateTotals($products, $productInstance)
{
    $totalTax = 0;
    $totalSaleValue = 0;

    foreach ($products as $product) {
        $productLoaded = $productInstance->getById($product['product_id']);

        $productValue = $productLoaded->getPrice();
        $taxPercent = $productLoaded->getTaxPercent();

        $soldValueProduct = $productValue * $product['sold_quantity'];
        $taxValueProduct = ($soldValueProduct * $taxPercent) / 100;

        $totalSaleValue += $soldValueProduct + $taxValueProduct;
        $totalTax += $taxValueProduct;
    }

    return [
        'totalSaleValue' => $totalSaleValue,
        'totalTax' => $totalTax,
    ];
}

function subtractStockAndUpdate($product, $soldQuantity)
{
    $stockQty = $product->getStockQty();

    $newStockQty = $stockQty - $soldQuantity;

    $product->updateStockQty($newStockQty);
}
