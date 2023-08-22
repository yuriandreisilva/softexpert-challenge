<?php

class Product
{
    private $conn;
    private $id;
    private $name;
    private $price;
    private $categoryId;
    private $stockQty;
    private $code;

    public function __construct($connection)
    {
        $this->conn = $connection;
    }

    public function save(
        $name,
        $price,
        $categoryId,
        $stockQty,
        $code
    ) {
        $query = "INSERT INTO products (name, price, category_id, stock_qty, code) VALUES ($1, $2, $3, $4, $5)";

        $result = pg_query_params($this->conn, $query, array($name, $price, $categoryId, $stockQty, $code));

        return $result;
    }

    public function updateStockQty($newStockQty)
    {
        $query = "UPDATE products SET stock_qty = $1 WHERE id = $2";
        $result = pg_query_params($this->conn, $query, array($newStockQty, $this->getId()));

        return $result;
    }

    public function getByName($searchTerm)
    {
        $query = "SELECT * FROM products WHERE name ILIKE '%$searchTerm%' AND stock_qty > 0";
        $result = pg_query($this->conn, $query);

        $resultsArray = [];

        while ($row = pg_fetch_assoc($result)) {
            $resultsArray[] = $row;
        }

        if (empty($resultsArray)) {
            return json_encode(['error' => 'Not found product']);
        }

        return json_encode($resultsArray);
    }

    public function getById($id)
    {
        $query = "SELECT id, name, price, category_id, stock_qty, code FROM products WHERE id = $1";
        $result = pg_query_params($this->conn, $query, array($id));
        $productData = pg_fetch_assoc($result);

        if ($productData) {
            $product = new Product($this->conn);

            $product->setId($productData['id']);
            $product->setName($productData['name']);
            $product->setPrice($productData['price']);
            $product->setCategoryId($productData['category_id']);
            $product->setStockQty($productData['stock_qty']);
            $product->setCode($productData['code']);

            return $product;
        } else {
            return null;
        }
    }

    public function getTaxPercent()
    {
        $categoryQuery = "SELECT tax_percentage FROM Categories INNER JOIN Products ON Categories.id = Products.category_id WHERE Products.id = $1";

        $categoryResult = pg_query_params($this->conn, $categoryQuery, array($this->getId()));

        $categoryData = pg_fetch_assoc($categoryResult);

        return $categoryData['tax_percentage'];
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getCategoryId()
    {
        return $this->categoryId;
    }

    public function setCategoryId($categoryId)
    {
        $this->categoryId = $categoryId;
    }

    public function getStockQty()
    {
        return $this->stockQty;
    }

    public function setStockQty($stockQty)
    {
        $this->stockQty = $stockQty;
    }

    public function getCode()
    {
        return $this->code;
    }

    public function setCode($code)
    {
        $this->code = $code;
    }
}
