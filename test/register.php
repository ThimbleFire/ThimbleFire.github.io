<?php
$db = new SQLite3('db.sqlite');

// Create users table if not exists
$db->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)");

 = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Secure password hashing

$stmt = $db->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
$stmt->bindValue(':username', $username, SQLITE3_TEXT);
$stmt->bindValue(':password', $password, SQLITE3_TEXT);

if ($stmt->execute()) {
    echo "Account created successfully. index.htmlLogin here</a>";
} else {
    echo "Username already exists. index.htmlTry again</a>";
}
?>
