<?php

spl_autoload_register(function ($class_name) {
    $file = __DIR__ . '/' . $class_name . '.php';

    if (file_exists($file)) {
        require $file;
    }
});
