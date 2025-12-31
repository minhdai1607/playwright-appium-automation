#!/bin/bash
# Stop Appium Server Script
# Dừng tất cả Appium processes

echo "🛑 Stopping Appium Server..."

# Kill all Appium processes
pkill -f "appium" || true

echo "✅ Appium Server đã dừng"


