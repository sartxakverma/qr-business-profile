# QR Business Profile

A clean, responsive web app that scans a QR code and uses the decoded URL to load a business profile from a REST API.

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=222)

## Features

- Camera-based QR scanning with the browser’s secure media APIs
- Validates scanned HTTP/HTTPS API URLs before requesting them
- Loading, success, and error feedback
- Responsive business profile card with email, phone, and website links
- Safe DOM rendering (no API data is injected as HTML)
- One-click live demo, so the project is easy to test without a QR code

## How it works

1. Click **Start camera scan** and grant camera permission.
2. Scan a QR code containing the URL of a JSON business-profile API endpoint.
3. The app fetches the JSON response and displays the profile.

For a quick test, use the included live-demo button or create a QR code that contains:

```text
https://jsonplaceholder.typicode.com/users/1
```

## Run locally

Camera access requires a secure context, so run the project with a local development server rather than opening the HTML file directly.

```bash
npx serve .
```

Then open the local URL shown in your terminal. You can also deploy the repository on GitHub Pages, Netlify, or Vercel.

## API response shape

The app supports common fields such as `name`, `email`, `phone`, `website`, and the optional `company.catchPhrase`.

```json
{
  "name": "Acme Studio",
  "email": "hello@acme.test",
  "phone": "+91 98765 43210",
  "website": "acme.test",
  "company": { "catchPhrase": "Design that moves business" }
}
```

## Tech stack

- HTML5 and CSS3
- Vanilla JavaScript and Fetch API
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) (loaded via CDN)

## Author

**Sarthak** · [sarthakmlop@gmail.com](mailto:sarthakmlop@gmail.com)

---

If you found this useful, consider giving the repository a star.
