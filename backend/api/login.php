<?php

require_once __DIR__ . "/config.php";

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if(!$data) {
    http_response_code(400);
    exit();
}

// DB接続
$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

// 認証フラグ
$auth = false;

// バリデーション
$errors = [];
if(empty($data["loginEmail"])) {
    $errors["email"] = "Emailを入力してください";
}
if(empty($data["loginPass"])) {
    $errors["password"] = "Passwordを入力してください";
}
if(empty($errors)) {
    $stmt = $pdo->prepare("select * from users where email=? and password=?");
    $stmt->execute([$data["loginEmail"], $data["loginPass"]]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if(!$user){
        $errors["login"] = "メールアドレスまたはパスワードが間違っています";
    }else{
        session_start();
        $_SESSION["user_id"] = $user["id"];
        $auth = true;
    }
}

// errorsにエラー文が代入されていたら...
if(!empty($errors)) {
    http_response_code(400);
    echo json_encode(["errors" => $errors], JSON_UNESCAPED_UNICODE);
    exit;
}

// ログイン後
if($auth) {
    echo json_encode([
        "success" => true,
        "user" => $user,
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "認証失敗",
    ]);
};

// 開発テスト用レスポンス
// echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);