FROM php:8.2-apache

# MySQL PDO拡張をインストール
RUN docker-php-ext-install pdo pdo_mysql

# 作業ディレクトリ指定
WORKDIR /var/www/html