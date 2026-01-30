<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'name' => 'Customer',
        'message' => 'Method not allowed.'
    ]);
    exit;
}

function clean_input($value)
{
    $value = is_string($value) ? $value : '';
    $value = strip_tags($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return trim($value);
}

$name = clean_input($_POST['name'] ?? '');
$email_raw = trim($_POST['email'] ?? '');
$email = filter_var($email_raw, FILTER_VALIDATE_EMAIL);
$phone = clean_input($_POST['phone'] ?? '');
$product = clean_input($_POST['product'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '') {
    $errors[] = 'Name is required.';
}
if (!$email) {
    $errors[] = 'Valid email is required.';
}
if ($phone === '') {
    $errors[] = 'Phone is required.';
}
if ($product === '' || $product === 'Select Product') {
    $errors[] = 'Product is required.';
}
if ($message === '') {
    $errors[] = 'Message is required.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'name' => $name !== '' ? $name : 'Customer',
        'message' => implode(' ', $errors)
    ]);
    exit;
}

$to = 'saranshtrading@gmail.com';
$subject = 'New quote request from ' . $name;
$bodyLines = [
    'New inquiry received:',
    '',
    'Name: ' . $name,
    'Email: ' . $email_raw,
    'Phone: ' . $phone,
    'Product: ' . $product,
    'Message:',
    $message
];
$body = implode("\n", $bodyLines);

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=UTF-8';
$headers[] = 'From: Saransh Trading Company <saranshtrading@gmail.com>';
$headers[] = 'Reply-To: ' . $email_raw;

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'name' => $name,
        'message' => 'We could not send your request right now. Please try again later.'
    ]);
    exit;
}

echo json_encode([
    'status' => 'success',
    'name' => $name,
    'message' => 'Your inquiry has been sent successfully. We will contact you soon.'
]);
