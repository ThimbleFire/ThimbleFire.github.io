<?php
session_start();
$db = new SQLite3('db.sqlite');

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
$stmt->bindValue(':username', $username, SQLITE3_TEXT);
$result = $stmt->execute();
$user = $result->fetchArray();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['username'] = $username;
    header("Location: dashboard.php");
} else {
    echo "Invalid credentials. index.htmlTry again</a>";
}
?>
