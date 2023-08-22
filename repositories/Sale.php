<?php
class Sale
{
    private $conn;

    public function __construct($connection)
    {
        $this->conn = $connection;
    }

    public function save($saleDate, $totalSaleValue, $totalTax)
    {
        $insertSaleQuery = "INSERT INTO Sales (sale_date, total_sale_value, total_tax) VALUES ($1, $2, $3) RETURNING id";
        $result = pg_query_params($this->conn, $insertSaleQuery, array($saleDate, $totalSaleValue, $totalTax));

        if ($result) {
            return pg_fetch_result($result, 0, 'id');
        } else {
            return null;
        }
    }
}
