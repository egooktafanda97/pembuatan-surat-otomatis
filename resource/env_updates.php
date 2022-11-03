<?php
function updateEnv($data = array())
{
    if (!count($data)) {
        return;
    }

    $pattern = '/([^\=]*)\=[^\n]*/';

    $envFile = './system/.env';
    $lines = file($envFile);
    $newLines = [];
    foreach ($lines as $line) {
        preg_match($pattern, $line, $matches);

        if (!count($matches)) {
            $newLines[] = $line;
            continue;
        }

        if (!key_exists(trim($matches[1]), $data)) {
            $newLines[] = $line;
            continue;
        }

        $line = trim($matches[1]) . "={$data[trim($matches[1])]}\n";
        $newLines[] = $line;
    }

    $newContent = implode('', $newLines);
    file_put_contents($envFile, $newContent);
}

$config = json_decode(file_get_contents("../init/env.json"), true);

// print_r([
//     "DB_CONNECTION" => $config[$config["MODE"]]["DB_CONNECTION"],
//     "DB_HOST" => $config[$config["MODE"]]["DB_HOST"],
//     "DB_PORT" => $config[$config["MODE"]]["DB_PORT"],
//     "DB_DATABASE" => $config[$config["MODE"]]["DB_DATABASE"],
//     "DB_USERNAME" => $config[$config["MODE"]]["DB_USERNAME"],
//     "DB_PASSWORD" => $config[$config["MODE"]]["DB_PASSWORD"],
// ]);

updateEnv([
    "DB_CONNECTION" => $config[$config["MODE"]]["DB_CONNECTION"],
    "DB_HOST" => $config[$config["MODE"]]["DB_HOST"],
    "DB_PORT" => $config[$config["MODE"]]["DB_PORT"],
    "DB_DATABASE" => $config[$config["MODE"]]["DB_DATABASE"],
    "DB_USERNAME" => $config[$config["MODE"]]["DB_USERNAME"],
    "DB_PASSWORD" => $config[$config["MODE"]]["DB_PASSWORD"],
]);
