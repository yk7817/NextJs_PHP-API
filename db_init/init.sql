-- データベース作成
CREATE DATABASE IF NOT EXISTS nextapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nextapp;

-- USERSテーブル作成
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- POSTテーブル作成
CREATE TABLE IF NOT EXISTS posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    post TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 初期usersデータ追加
INSERT INTO users (name, email, password) VALUES
('Alice', 'alice@gmail.com', 'alice777'),
('Taro', 'tarou@gmail.com', 'taro777');

-- 初期postデータ追加
INSERT INTO posts (user_id, user_name ,post) VALUES
(1, 'Alice' ,'投稿テスト');