<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wedding_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $wish_message = $_POST["wish_message"];
    $attend = $_POST["attend"];

    $sql = "INSERT INTO rsvp (name, wish_message, attend) VALUES ('$name', '$wish_message', '$attend')";

    if ($conn->query($sql) === TRUE) {
        echo "<p>Thank you, $name, for your RSVP! We have noted that you will $attend.</p>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Form submission method is not POST.";
}

$conn->close();
?>
