# Start Appium Server Script for Windows

Write-Host "Starting Appium Server..." -ForegroundColor Green

$appiumPath = Get-Command appium -ErrorAction SilentlyContinue

if (-not $appiumPath) {
    Write-Host "Appium not installed. Run: npm install -g appium" -ForegroundColor Red
    exit 1
}

Write-Host "Checking UiAutomator2 driver..." -ForegroundColor Yellow
appium driver list --installed | Select-String "uiautomator2"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing UiAutomator2 driver..." -ForegroundColor Yellow
    appium driver install uiautomator2
}

Write-Host "Starting Appium on http://127.0.0.1:4723" -ForegroundColor Green
appium --address 127.0.0.1 --port 4723 --allow-cors
