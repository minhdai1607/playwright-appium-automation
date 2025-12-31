#!/bin/bash
# Start Appium Server Script for Mac/Linux
# Chạy script này để khởi động Appium server

echo "🚀 Starting Appium Server..."

# Check if Appium is installed
if ! command -v appium &> /dev/null; then
    echo "❌ Appium chưa được cài đặt. Chạy: npm install -g appium"
    exit 1
fi

# Check and install UiAutomator2 driver
echo "📱 Checking UiAutomator2 driver..."
if ! appium driver list --installed | grep -q "uiautomator2"; then
    echo "📥 Installing UiAutomator2 driver..."
    appium driver install uiautomator2
fi

# Start Appium server
echo "🌐 Starting Appium on http://127.0.0.1:4723"
appium --address 127.0.0.1 --port 4723 --allow-cors


