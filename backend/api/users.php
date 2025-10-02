<?php
require_once __DIR__ . '/config.php';
header("Content-Type: application/json; charset=UTF-8");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $stmt = $pdo->query("select id, name, email, password, created_at from users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // JSON_PRETTY_PRINT = jsonを整形して表示させる
    // JSON_UNESCAPED_UNICODE = 日本語をそのまま表示できるオプション
    echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} catch (PODException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}