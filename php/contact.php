<?php
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
            // Envoyer un email
            $to = "thomas.dumont1806@gmail.com"; // Votre adresse email
            $subject = "Nouveau message de $name";
            $body = "Nom: $name\nEmail: $email\nMessage:\n$message";
            $headers = "From: $email";

            if (mail($to, $subject, $body, $headers)) {
                echo "Message envoyé avec succès !";
            } else {
                echo "Une erreur s'est produite lors de l'envoi du message.";
            }
        } else {
            echo "Erreur : " . $sql . "<br>" . $conn->error;
        }

        // Fermer la connexion
        $conn->close();
    }
}
?>