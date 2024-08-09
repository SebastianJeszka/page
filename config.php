<!-- Plik z konfiguracją połączenia do bazy danych -->

<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'twoj_uzytkownik');
define('DB_PASSWORD', 'twoje_haslo');
define('DB_NAME', 'nazwa_bazy');

try {
    $pdo = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Nie można się połączyć z bazą danych. Błąd: " . $e->getMessage());
}
?>
