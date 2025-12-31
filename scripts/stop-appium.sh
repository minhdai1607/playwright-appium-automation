#!/bin/bash
# Stop Appium Server Script

echo "Stopping Appium Server..."
pkill -f "appium" || true
echo "Appium Server stopped"
