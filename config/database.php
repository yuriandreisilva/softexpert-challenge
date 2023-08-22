<?php

$dbHost = $_ENV['DB_HOST'];
$port   = $_ENV['DB_PORT'];
$dbUser = $_ENV['DB_USER'];
$dbPass = $_ENV['DB_PASS'];
$dbName = $_ENV['DB_NAME'];

$conn = pg_connect("host=$dbHost port=$port dbname=$dbName user=$dbUser password=$dbPass");

if (!$conn) {
    die("Conexão falhou: " . pg_last_error());
}

$schema = $_ENV['DB_SCHEMA'];
pg_query($conn, "SET search_path TO $schema");
