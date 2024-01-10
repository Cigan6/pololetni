<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $jsonData = $_POST["jsonData"];
    $jsonFilePath = "./stiznosti.json";
    $existingData = file_get_contents($jsonFilePath);
    $existingArray = json_decode($existingData, true);
    $newDataArray = json_decode($jsonData, true);

    if (!isset($existingArray['stiznosti'])) {
        $existingArray['stiznosti'] = $newDataArray;
    } else {
        $existingArray['stiznosti'] = array_merge($existingArray['stiznosti'], $newDataArray);
    }

    $updatedData = json_encode($existingArray, JSON_PRETTY_PRINT);
    file_put_contents($jsonFilePath, $updatedData);
    echo "Data saved successfully!";
} else {
    http_response_code(405);
    echo "Invalid request method";
}
?>