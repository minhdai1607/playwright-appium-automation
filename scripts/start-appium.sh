#!/bin/bash
# Start Appium Server Script for Mac/Linux

echo "Starting Appium Server..."

if ! command -v appium &> /dev/null; then
    echo "Appium not installed. Run: npm install -g appium"
    exit 1
fi

echo "Checking UiAutomator2 driver..."
if ! appium driver list --installed | grep -q "uiautomator2"; then
    echo "Installing UiAutomator2 driver..."
    appium driver install uiautomator2
fi

echo "Starting Appium on http://127.0.0.1:4723"
appium --address 127.0.0.1 --port 4723 --allow-cors
