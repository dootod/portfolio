<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Charger les dépendances
require '../lib/vendor/autoload.php';

// Charger les variables d'environnement
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../lib');
$dotenv->load();

// Récupérer les valeurs depuis le fichier .env
$smtp_host = $_ENV['SMTP_HOST'];
$smtp_user = $_ENV['SMTP_USER'];
$smtp_pass = $_ENV['SMTP_PASS'];
$smtp_port = $_ENV['SMTP_PORT'];
$smtp_secure = $_ENV['SMTP_SECURE'];
$db_host = $_ENV['DB_HOST'];
$db_user = $_ENV['DB_USER'];
$db_pass = $_ENV['DB_PASS'];
$db_name = $_ENV['DB_NAME'];

// Vérifier que les données sont bien chargées (debug)
if (!$smtp_host || !$db_host) {
    die("Erreur : Impossible de charger les variables d'environnement.");
}

// Récupérer les données du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    if (empty($name) || empty($email) || empty($message)) {
        echo "Tous les champs sont obligatoires.";
    } else {
        // Connexion à la base de données
        $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

        if ($conn->connect_error) {
            die("Connexion échouée : " . $conn->connect_error);
        }

        $sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $message);

        if ($stmt->execute()) {
            // Envoyer l'email avec PHPMailer
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = $smtp_host;
                $mail->SMTPAuth = true;
                $mail->Username = $smtp_user;
                $mail->Password = $smtp_pass;
                $mail->SMTPSecure = $smtp_secure;
                $mail->Port = $smtp_port;

                $mail->setFrom($email, $name);
                $mail->addAddress('thomas.dumont1806@gmail.com');

                $mail->isHTML(false);
                $mail->Subject = "Nouveau message de $name";
                $mail->Body = "Nom: $name\nEmail: $email\nMessage:\n$message";

                $mail->send();
                echo "success";
            } catch (Exception $e) {
                echo "Erreur lors de l'envoi de l'email : " . $mail->ErrorInfo;
            }
        } else {
            echo "Erreur : " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    }
}
?>
