<?php
require_once __DIR__ . "/config.php";

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

session_start();
$_SESSION = [];
session_destroy();