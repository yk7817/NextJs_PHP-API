<?php

require_once __DIR__ . '/config.php';

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

set_error_handler(function($severity, $message, $file, $line) {
    http_response_code(500);
    echo json_encode(["error" => $message]);
    exit();
});

set_exception_handler(function($e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
    exit();
});

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// バリデーション
if(empty($data["post"])) {
    http_response_code(400);
    echo json_encode(["error"  => "Post内容を入力してください"]);
    exit();
}else {
    try{
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $stmt = $pdo->prepare("insert into posts (user_id, user_name, post) values (?,?,?)");
        $stmt->execute([$data["userId"], $data["userName"] ,$data["post"]]);
        echo json_encode(["success" => true]);
    }catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "DB接続またはクエリエラー: " . $e->getMessage()]);
    }
}