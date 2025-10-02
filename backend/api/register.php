<?php
require_once __DIR__ . '/config.php';
// CORSヘッダ
// http://localhost:3001（フロントサイド）からのアクセスを許可
header("Access-Control-Allow-Origin: http://localhost:3001");
// このAPIが許可するHTTPメソッドを指定,
// OPTIONS > サーバーにリクエストする前に事前にメソッド、Content-typeをチェックする
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// リクエストに使用するHTTPヘッダーを指定
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// レスポンスをJSONとして固定
header("Content-Type: application/json; charset=utf-8");

// プリフライトの確認
if($_SERVER["REQUEST_METHOD"] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// JSONを受け取る
$input = file_get_contents("php://input"); // フロントサイドで定義したbodyの引数を受け取る
$data = json_decode($input, true);
// リクエストエラーチェック
if(!$data) {
    // 400はBad Request > jsonが壊れている、必須パラメータが欠けている、データ形式が不正
    http_response_code(400);
    exit();
}

// バリデーション
$required = ["name", "email", "password"];
$errors = [];
foreach($required as $r) {
    if(empty($data[$r])) {
        $errors[$r] = "$r is Required";
    }elseif (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Please enter in email address format";
    }
}
// errorsが空ではなかったらレスポンスを返す
if(!empty($errors)) {
    http_response_code(400);
    echo json_encode(["errors" => $errors], JSON_UNESCAPED_UNICODE);
    exit;
}

// name重複チェック
$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
$stmt = $pdo->prepare("select count(*) from users where name=?");
$stmt->execute([$data["name"]]);
if($stmt->fetchColumn() > 0) {
    $errors["dup_name"] = "そのNameは既に登録されています";
}

// email重複チェック
$stmt = $pdo->prepare("select count(*) from users where email=?");
$stmt->execute([$data["email"]]);
if($stmt->fetchColumn() > 0) {
    $errors["dup_email"] = "そのEmailは既に登録されています";
}

if(!empty($errors)) {
    http_response_code(400);
    echo json_encode(["errors" => $errors], JSON_UNESCAPED_UNICODE);
    exit;
}

// エラーがinsert
$stmt = $pdo->prepare("insert into users (name, email, password) values (?, ?, ?)");
$stmt->execute([$data["name"], $data["email"], $data["password"]]);
http_response_code(200);
echo json_encode(["message" => "User created successfully"]);
exit;
// }else {
//     // errorsが空であればデータベースへデータを格納する
//     try {
//         // DB接続
//         $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
//         $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//         $stmt = $pdo->prepare("insert into users (name, email, password) values (?, ?, ?)"); 
//         $stmt->execute([$data["name"], $data["email"], $data["password"]]);
//         http_response_code(200);
//         echo json_encode(["message" => "User created successfully"]);
//         exit;
//     }catch (PDOException $e){
//         if($e->getCode() == 23000) {
//             http_response_code(400);
//             if(strpos($e->getMessage(), "name") !== false) {
//                 $errors["dup_name"] = "そのNameは既に使用されています";
//             };
//             if(strpos($e->getMessage(), "email") !== false) {
//                 $errors["dup_email"] = "そのメールアドレスは既に登録されています";
//             };
//         }
//     };
//     header("Content-Type: application/json; charset=utf-8");
//     echo json_encode(["errors" => $errors], JSON_UNESCAPED_UNICODE);
//     exit();
// }


// 確認用ログ(開発用)
// header("Content-Type: application/json; charset=utf-8");
// echo json_encode($errors, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE