### How to get appPackage and appActivity
1. Turning on ADB on your Device
2. Installed that app on your device
Steps:
1. Open the app on your mobile
2. Run cmd on your laptop "adb shell dumpsys window | findstr mCurrentFocus"
Example expected result:
 mCurrentFocus=Window{132a452 u0 io.carv.mobileapp/io.carv.mobileapp.MainActivity}
 appPackage = io.carv.mobileapp

 ### How to Get Refresh token from google
 https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/oauth2callback&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline&prompt=consent

 after logging the system return
 http://localhost:3000/oauth2callback?code=4/0AfJohX...

Call API
curl -X POST https://oauth2.googleapis.com/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "code=PASTE_CODE_HERE" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=http://localhost:3000/oauth2callback" \
  -d "grant_type=authorization_code"

The system will return
{
  "access_token": "ya29...",
  "refresh_token": "1//0gxxxx",
  "expires_in": 3599,
  "scope": "https://www.googleapis.com/auth/gmail.readonly",
  "token_type": "Bearer"
}
