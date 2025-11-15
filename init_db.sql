-- init_db.sql
PRAGMA foreign_keys = ON;


CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS products (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
description TEXT,
price REAL NOT NULL DEFAULT 0,
category_id INTEGER,
FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL
);


-- Insert sample category and product
INSERT OR IGNORE INTO categories (id, name) VALUES (1, 'Tortas');
INSERT OR IGNORE INTO categories (id, name) VALUES (2, 'Panadería');


INSERT OR IGNORE INTO products (name, description, price, category_id) VALUES
('Torta de chocolate', 'Torta 8 porciones', 20000, 1),
('Pan de molde', 'Pan integral', 1500, 2);