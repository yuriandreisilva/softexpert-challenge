<?php

class ProductValidation
{
    public function validate($data, $conn)
    {
        $errorMessages = [];

        switch (true) {
            case !$this->validateName($data['name']):
                $errorMessages[] = "Nome inválido.";
                break;

            case !$this->validatePrice($data['price']):
                $errorMessages[] = "Preço inválido.";
                break;

            case !$this->validateCategoryId($data['category_id'], $conn):
                $errorMessages[] = "ID de categoria inválido.";
                break;

            case !$this->validateStockQty($data['stock_qty']):
                $errorMessages[] = "Quantidade de estoque inválida.";
                break;

            case !$this->validateCode($data['code']):
                $errorMessages[] = "Código inválido. Não pode haver caracteres especiais.";
                break;
        }

        return $errorMessages;
    }


    public function validateName($name)
    {
        $minLength = 3;
        $maxLength = 50;

        if (empty($name) || strlen($name) < $minLength || strlen($name) > $maxLength) {
            return false;
        }

        return true;
    }

    public function validatePrice($price)
    {

        $priceConverted = convertPriceUS($price);

        if (!is_numeric($priceConverted) || $priceConverted < 0) {
            return false;
        }

        return true;
    }

    public function validateCategoryId($categoryId, $conn)
    {
        $categoryInstance = new Category($conn);

        return $categoryInstance->loadById($categoryId);
    }

    public function validateStockQty($stockQty)
    {
        if (!is_numeric($stockQty) || $stockQty < 0) {
            return false;
        }

        return true;
    }

    public function validateCode($code)
    {
        $cleanedCode = preg_replace('/[^a-zA-Z0-9]/', '', $code);

        if ($cleanedCode !== $code) {
            return false;
        }

        return true;
    }
}
