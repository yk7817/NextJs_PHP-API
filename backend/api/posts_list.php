<?php

require_once __DIR__ . '/config.php';
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

try{
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password,[PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"]);
    $stmt = $pdo->query("
        SELECT 
            posts.id AS post_id,
            posts.post,
            posts.created_at,
            users.id AS user_id,
            users.name AS user_name
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
    ");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}