<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wedding_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, wish_message FROM rsvp ORDER BY id DESC LIMIT 10"; // Mengambil 10 pesan terbaru dari database
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="message">';
        echo $row["name"] . '<br>';
        echo $row["wish_message"];
        echo '</div>';
    }
} else {
    echo "Tidak ada pesan.";
}
$conn->close();
?>
