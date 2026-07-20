# QR Business Profile

A responsive web application that scans a QR code and loads a business profile from a REST API.

---

## Project Flow

```text
User Opens Web Application
            │
            ▼
Clicks "Start Camera Scan"
            │
            ▼
Browser Requests Camera Permission
            │
            ▼
QR Code is Scanned
            │
            ▼
Extract URL from QR Code
            │
            ▼
Validate URL
            │
            ▼
Send GET Request to Business API
            │
            ▼
Receive JSON Response
            │
            ▼
Parse Business Information
            │
            ▼
Display Business Profile
```

---

## Workflow

### 1. Start the Scanner
The user clicks the **Start Camera Scan** button.

### 2. Camera Access
The browser asks for camera permission and opens the QR scanner.

### 3. Scan QR Code
The application scans the QR code and reads the encoded data.

Example QR Content:

```
https://jsonplaceholder.typicode.com/users/1
```

### 4. Validate the URL
The application checks that the scanned value is a valid HTTP/HTTPS URL before making a request.

### 5. Fetch Business Profile
A GET request is sent to the API.

Example:

```
GET https://jsonplaceholder.typicode.com/users/1
```

### 6. Receive Response

Example JSON:

```json
{
  "name": "Leanne Graham",
  "email": "leanne@example.com",
  "phone": "1-770-736-8031",
  "website": "hildegard.org"
}
```

### 7. Display Profile
The application displays:

- Business Name
- Email
- Phone Number
- Website

### 8. Error Handling

The application handles:

- Invalid QR codes
- Invalid URLs
- Camera permission denied
- API request failures
- Network errors

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- html5-qrcode Library

---

## Folder Structure

```
qr-business-profile/
│
├── README.md
├── index.html
├── style.css
├── script.js
├── assets/
└── screenshots/
```

---

## Future Improvements

- Backend authentication
- Database integration
- Business search
- Profile editing
- QR code generation
- Dark mode
- Offline caching
