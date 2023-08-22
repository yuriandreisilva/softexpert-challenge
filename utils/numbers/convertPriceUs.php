<?php

function convertPriceUS($price)
{
    $formattedPrice = str_replace('.', '', $price);
    $formattedPrice = str_replace(',', '.', $price);

    if (is_numeric($formattedPrice)) {

        $usFormat = number_format((float)$formattedPrice, 2, '.', '');

        return $usFormat;
    }
}
