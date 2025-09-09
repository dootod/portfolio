<?php
// Générateur de token CSRF
session_start();

// Générer un token CSRF sécurisé
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Retourner le token (pas de HTML, juste le token)
header('Content-Type: text/plain');
echo $_SESSION['csrf_token'];
?>