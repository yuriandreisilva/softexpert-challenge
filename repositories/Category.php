<?php

class Category
{
    private $id;
    private $name;
    private $taxPercentage;

    private $conn;

    public function __construct($connection)
    {
        $this->conn = $connection;
    }

    public function save($name, $taxPercentage)
    {
        $query = "INSERT INTO categories (name, tax_percentage) VALUES ($1, $2)";

        $result = pg_query_params($this->conn, $query, array($name, $taxPercentage));

        return $result;
    }

    public function loadById($id)
    {
        $query = "SELECT * FROM categories WHERE id = $1";

        $result = pg_query_params($this->conn, $query, [$id]);

        if (!$result) {
            $error = pg_last_error($this->conn);
            return json_encode(['error' => "Error to search category: " . $error]);
        }

        $data = pg_fetch_assoc($result);

        if (!$data) {
            return json_encode(['error' => 'Category not found']);
        }

        return json_encode($data);
    }

    public function loadByName($name)
    {
        $query = "SELECT * FROM categories WHERE LOWER(name) = $1";

        $nameLower = strtolower(trim($name));

        $result = pg_query_params($this->conn, $query, [$nameLower]);

        if (!$result) {
            $error = pg_last_error($this->conn);
            return json_encode(['error' => "Error to search category by name. " . $error]);
        }

        $numRows = pg_num_rows($result);

        if ($numRows === 0) {
            error_log("Anything category by name: $name");
            return false;
        }

        return pg_fetch_assoc($result);
    }


    public function loadAll()
    {
        $query = "SELECT * FROM categories";
        $result = pg_query_params($this->conn, $query, array());

        if (!$result) {
            $error = pg_last_error($this->conn);
            return json_encode(['error' => "Erro ao consultar categorias: " . $error]);
        }

        $categories = [];

        while ($row = pg_fetch_assoc($result)) {
            $categories[] = $row;
        }

        if (empty($categories)) {
            return json_encode(['error' => 'Nenhuma categoria encontrada']);
        }

        return json_encode(['categories' => $categories]);
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

    public function getTaxPercentage()
    {
        return $this->taxPercentage;
    }

    public function setTaxPercentage($taxPercentage)
    {
        $this->taxPercentage = $taxPercentage;
    }
}
