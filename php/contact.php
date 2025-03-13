<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Chemin vers PHPMailer
require '../lib/PHPMailer/src/Exception.php';
require '../lib/PHPMailer/src/PHPMailer.php';
require '../lib/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Valider les données
    if (empty($name) || empty($email) || empty($message)) {
        echo "Tous les champs sont obligatoires.";
    } else {
        // Connexion à la base de données
        $servername = "localhost";
        $username = "root"; // Utilisateur par défaut de Laragon
        $password = ""; // Mot de passe par défaut de Laragon
        $dbname = "portfolio"; // Nom de la base de données

        // Créer une connexion
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Vérifier la connexion
        if ($conn->connect_error) {
            die("Connexion échouée : " . $conn->connect_error);
        }

        // Insérer les données dans la base de données
        $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";

        if ($conn->query($sql) === TRUE) {
            // Envoyer un email avec PHPMailer
            $mail = new PHPMailer(true);

            try {
                // Configuration du serveur SMTP
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com'; // Serveur SMTP de Gmail
                $mail->SMTPAuth = true;
                $mail->Username = 'votre_email@gmail.com'; // Votre adresse Gmail
                $mail->Password = 'votre_mot_de_passe'; // Votre mot de passe Gmail
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Encryption TLS
                $mail->Port = 587; // Port SMTP pour Gmail

                // Destinataires
                $mail->setFrom($email, $name);
                $mail->addAddress('thomas.dumont1806@gmail.com'); // Votre adresse email

                // Contenu de l'email
                $mail->isHTML(false); // Email en texte brut
                $mail->Subject = "Nouveau message de $name";
                $mail->Body = "Nom: $name\nEmail: $email\nMessage:\n$message";

                $mail->send();
                echo "success"; // Réponse pour JavaScript
            } catch (Exception $e) {
                echo "Erreur lors de l'envoi de l'email : " . $mail->ErrorInfo;
            }
        } else {
            echo "Erreur : " . $sql . "<br>" . $conn->error;
        }

        // Fermer la connexion
        $conn->close();
    }
}
?>