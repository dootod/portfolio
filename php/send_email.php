<?php
// =====================================
// FORMULAIRE DE CONTACT ULTRA-SÉCURISÉ
// =====================================

// 1. Démarrer la session pour les tokens CSRF
session_start();

// 2. Vérifier la méthode de requête
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Location: ../html/contact.html');
    exit;
}

// 3. Protection CSRF
if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
    http_response_code(403);
    header('Location: ../html/contact.html?status=error');
    exit;
}

// 4. Rate Limiting simple (max 3 soumissions par IP par heure)
$ip = $_SERVER['REMOTE_ADDR'];
$rate_file = 'rate_limit_' . md5($ip) . '.txt';
$current_time = time();

if (file_exists($rate_file)) {
    $attempts = json_decode(file_get_contents($rate_file), true);
    // Nettoyer les anciennes tentatives (plus d'1 heure)
    $attempts = array_filter($attempts, function($timestamp) use ($current_time) {
        return ($current_time - $timestamp) < 3600;
    });
    
    if (count($attempts) >= 3) {
        http_response_code(429);
        header('Location: ../html/contact.html?status=error');
        exit;
    }
    $attempts[] = $current_time;
} else {
    $attempts = [$current_time];
}
file_put_contents($rate_file, json_encode($attempts));

// 5. Honeypot anti-spam (champ caché)
if (!empty($_POST['website'])) {
    // Bot détecté - on fait semblant que ça marche
    header('Location: ../html/contact.html?status=success');
    exit;
}

// 6. Fonction pour charger les variables d'environnement
function loadEnv($filePath) {
    if (!file_exists($filePath) || !is_readable($filePath)) {
        throw new Exception("Fichier .env introuvable ou non lisible");
    }
    
    $env = [];
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) continue;
        
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value, '"\'');
            if (!empty($key)) {
                $env[$key] = $value;
            }
        }
    }
    
    return $env;
}

// 7. Charger PHPMailer
require_once 'PHPMailer/src/Exception.php';
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // 8. Charger la configuration
    $env = loadEnv('.env');
    
    // 9. Récupérer et NETTOYER les données (Protection XSS)
    $name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject'] ?? ''), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');
    
    // 10. Validation STRICTE
    $errors = [];
    
    // Nom : 2-50 caractères, pas de caractères spéciaux dangereux
    if (empty($name) || strlen($name) < 2 || strlen($name) > 50) {
        $errors[] = 'Le nom doit contenir entre 2 et 50 caractères';
    }
    if (preg_match('/[<>"\']/', $name)) {
        $errors[] = 'Le nom contient des caractères non autorisés';
    }
    
    // Email : validation renforcée
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Adresse email invalide';
    }
    if (strlen($email) > 254) {
        $errors[] = 'Adresse email trop longue';
    }
    
    // Sujet : 3-100 caractères
    if (empty($subject) || strlen($subject) < 3 || strlen($subject) > 100) {
        $errors[] = 'Le sujet doit contenir entre 3 et 100 caractères';
    }
    
    // Message : 10-2000 caractères
    if (empty($message) || strlen($message) < 10 || strlen($message) > 2000) {
        $errors[] = 'Le message doit contenir entre 10 et 2000 caractères';
    }
    
    // 11. Protection anti-spam avancée
    $spam_keywords = ['viagra', 'casino', 'loan', 'bitcoin', 'crypto', 'investment', 'profit', 'money', 'win', 'free', 'click here', 'buy now'];
    $content_check = strtolower($message . ' ' . $subject);
    
    foreach ($spam_keywords as $keyword) {
        if (strpos($content_check, $keyword) !== false) {
            // On ne dit pas que c'est du spam, on fait juste semblant
            header('Location: ../html/contact.html?status=success');
            exit;
        }
    }
    
    // Vérifier si trop de liens dans le message
    if (preg_match_all('/https?:\/\//', $message) > 2) {
        header('Location: ../html/contact.html?status=success');
        exit;
    }
    
    // 12. Si des erreurs, on redirige
    if (!empty($errors)) {
        error_log("Erreurs validation contact: " . implode(', ', $errors) . " - IP: " . $ip);
        throw new Exception('Données invalides');
    }
    
    // 13. Configuration PHPMailer sécurisée
    $mail = new PHPMailer(true);
    
    // Configuration serveur SMTP
    $mail->isSMTP();
    $mail->Host = $env['SMTP_HOST'] ?? 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $env['SMTP_USERNAME'] ?? '';
    $mail->Password = $env['SMTP_PASSWORD'] ?? '';
    $mail->SMTPSecure = ($env['SMTP_ENCRYPTION'] ?? 'tls') === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int)($env['SMTP_PORT'] ?? 587);
    $mail->CharSet = 'UTF-8';
    
    // Options de sécurité PHPMailer
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false
        ]
    ];
    
    // 14. Configuration de l'email (protection header injection)
    $safe_email = filter_var($email, FILTER_VALIDATE_EMAIL);
    $safe_name = preg_replace('/[^\w\s\-.]/', '', $name);
    
    $mail->setFrom($env['SMTP_USERNAME'], 'Contact Site Web Thomas Dumont');
    $mail->addAddress($env['DESTINATION_EMAIL'] ?? 'thomas.dumont1806@gmail.com');
    $mail->addReplyTo($safe_email, $safe_name);
    
    // 15. Contenu sécurisé de l'email
    $mail->isHTML(true);
    $mail->Subject = 'Contact: ' . substr($subject, 0, 50); // Limiter la longueur
    
    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: #5b8def; color: white; padding: 15px; border-radius: 5px; text-align: center; }
            .content { padding: 20px 0; }
            .info-row { margin: 10px 0; padding: 8px; background: white; border-left: 4px solid #5b8def; }
            .label { font-weight: bold; color: #555; }
            .message-content { background: white; padding: 15px; border-radius: 5px; margin-top: 15px; }
            .footer { font-size: 12px; color: #666; text-align: center; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>📧 Nouveau message de contact</h2>
            </div>
            <div class='content'>
                <div class='info-row'>
                    <span class='label'>👤 Nom:</span> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "
                </div>
                <div class='info-row'>
                    <span class='label'>📧 Email:</span> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "
                </div>
                <div class='info-row'>
                    <span class='label'>📝 Sujet:</span> " . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . "
                </div>
                <div class='info-row'>
                    <span class='label'>📅 Date:</span> " . date('d/m/Y à H:i:s') . "
                </div>
                <div class='info-row'>
                    <span class='label'>🌐 IP:</span> " . htmlspecialchars($ip, ENT_QUOTES, 'UTF-8') . "
                </div>
                <div class='message-content'>
                    <strong>💬 Message:</strong><br><br>
                    " . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "
                </div>
            </div>
            <div class='footer'>
                <p>Message envoyé depuis le formulaire de contact du site web de Thomas Dumont</p>
            </div>
        </div>
    </body>
    </html>";
    
    $textBody = "NOUVEAU MESSAGE DE CONTACT\n\n";
    $textBody .= "Nom: {$name}\n";
    $textBody .= "Email: {$email}\n";
    $textBody .= "Sujet: {$subject}\n";
    $textBody .= "Date: " . date('d/m/Y à H:i:s') . "\n";
    $textBody .= "IP: {$ip}\n\n";
    $textBody .= "Message:\n{$message}\n\n";
    $textBody .= "---\nMessage envoyé depuis le formulaire de contact";
    
    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;
    
    // 16. Envoyer l'email
    $mail->send();
    
    // 17. Log du succès (optionnel)
    error_log("Contact envoyé avec succès - Email: {$email} - IP: {$ip}");
    
    // 18. Redirection de succès
    header('Location: ../html/contact.html?status=success');
    exit;
    
} catch (Exception $e) {
    // 19. Log sécurisé des erreurs (sans exposer les détails)
    error_log("Erreur envoi contact: " . $e->getMessage() . " - IP: " . $ip);
    
    // 20. Redirection d'erreur
    header('Location: ../html/contact.html?status=error');
    exit;
}

// 21. Nettoyer les anciens fichiers de rate limiting (optionnel, à faire via cron)
// $old_files = glob('rate_limit_*.txt');
// foreach ($old_files as $file) {
//     if (filemtime($file) < time() - 3600) {
//         unlink($file);
//     }
// }
?>