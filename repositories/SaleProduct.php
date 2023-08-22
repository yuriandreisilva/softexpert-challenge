<?php
class SalesProducts
{
    private $conn;

    public function __construct($connection)
    {
        $this->conn = $connection;
    }

    public function save($saleId, $productId, $soldQuantity)
    {
        $productValue = $this->getProductValue($productId);
        $taxPercent = $this->getTaxPercent($productId);

        $soldValueProduct = $this->calculateSoldValueProduct($productValue, $soldQuantity);
        $taxValueProduct = $this->calculateTaxValueProduct($soldValueProduct, $taxPercent);

        $insertProductQuery = "INSERT INTO Sales_Products (sale_id, product_id, sold_quantity, sold_value_product, tax_value_product) VALUES ($1, $2, $3, $4, $5)";

        pg_prepare($this->conn, "insert_product", $insertProductQuery);

        pg_execute($this->conn, "insert_product", array($saleId, $productId, $soldQuantity, $soldValueProduct, $taxValueProduct));
    }

    public function getProductValue($productId)
    {
        $productInstance = new Product($this->conn);
        $product = $productInstance->getById($productId);

        if ($product !== null) {
            return $product->getPrice();
        }

        return false;
    }

    public function getTaxPercent($productId)
    {
        $categoryQuery = "SELECT tax_percentage FROM Categories INNER JOIN Products ON Categories.id = Products.category_id WHERE Products.id = $1";
        $categoryResult = pg_query_params($this->conn, $categoryQuery, array($productId));
        $categoryData = pg_fetch_assoc($categoryResult);
        return $categoryData['tax_percentage'];
    }

    private function calculateSoldValueProduct($productValue, $soldQuantity)
    {
        return $productValue * $soldQuantity;
    }

    private function calculateTaxValueProduct($soldValueProduct, $taxPercent)
    {
        return ($soldValueProduct * $taxPercent) / 100;
    }
}
