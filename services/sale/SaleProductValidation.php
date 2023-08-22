<?php

class SaleValidation
{
    public function validate($data, $conn)
    {
        $errorMessages = [];

        if (empty($data)) {
            $errorMessages[] = "Nenhum produto selecionado.";
            return $errorMessages;
        }

        foreach ($data as $sale) {
            switch (true) {
                case !$this->validateStockQty($conn, $sale["sold_quantity"], $sale["product_id"]):
                    $errorMessages[] = "Quantidade vendida inválida.";
                    break;
            }

            return $errorMessages;
        }
    }

    public function validateStockQty($conn, $soldQuantity, $productId)
    {
        if (!is_numeric($soldQuantity) || $soldQuantity < 0) {
            return false;
        }

        if (!is_numeric($productId) || $productId <= 0) {
            return false;
        }

        try {
            $productInstance = new Product($conn);
            $product = $productInstance->getById($productId);
        } catch (Exception $e) {
            return false;
        }

        error_log("here" . $product->getStockQty() - $soldQuantity);

        $stockAvailable = $product->getStockQty() - $soldQuantity;

        if ($stockAvailable < 0) {
            return false;
        }

        return true;
    }
}
