
<?php

$url = "https://www.sandbox.paypal.com" . $_SERVER["REQUEST_URI"];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$headers = array();
foreach (getallheaders() as $name => $value) {
    if ($name !== "Host") {
        $headers[] = "$name: $value";
    }
}

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "OPTIONS");
    curl_setopt($ch, CURLOPT_POSTFIELDS, null);
} else {
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER["REQUEST_METHOD"]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents("php://input"));
}

$response = curl_exec($ch);

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode === 0) {
    http_response_code(500);
} else {
    http_response_code($httpCode);
}

echo $response;
