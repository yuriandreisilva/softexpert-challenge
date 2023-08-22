<?php

class CategoryValidation
{
    public function validate($data)
    {
        // global $conn; remover
        $errorMessages = [];

        switch (true) {
            case !$this->validateName($data['name']):
                $errorMessages[] = "Nome inválido.";
                break;

            case !$this->validatePercentage($data['tax_percentage']):
                $errorMessages[] = "Taxa de porcentagem inválida.";
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

    public function validatePercentage($taxPercentage)
    {
        $taxPercentage = trim($taxPercentage);

        if (ctype_digit($taxPercentage)) {
            $inteiro = intval($taxPercentage);

            if ($inteiro >= 0 && $inteiro <= 100) {
                return true;
            }
        }

        return false;
    }
}
