<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $year = $_POST['year'];
    $interests = $_POST['interests'];
    
    $to = "akarafilakis1@gmail.com"; // Replace with your email
    $subject = "New GSA Membership Application";
    
    $message = "New Membership Application:\n\n";
    $message .= "Name: " . $name . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Year: " . $year . "\n";
    $message .= "Interests: " . $interests . "\n";
    
    $headers = "From: " . $email;
    
    mail($to, $subject, $message, $headers);
    
    header("Location: index.html?signup=success#membership");
    exit();
}
?>