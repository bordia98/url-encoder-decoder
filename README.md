# 🔗 URL Encoder & Decoder

[![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-blue?style=flat-square&logo=github)](https://bordia98.github.io/url-encoder-decoder/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-orange?style=flat-square)](#)
[![Client-Side Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-emerald?style=flat-square)](#)
[![Theme Support](https://img.shields.io/badge/Theme-Light%20%7C%20Dark-purple?style=flat-square)](#)

A modern, lightning-fast, and 100% client-side **URL Encoder & Decoder** web utility. Safely convert standard URLs, individual query parameters, complex query strings, and Base64URL-safe payloads directly in your browser with zero data leaving your machine.

🌐 **Live Demo:** [https://bordia98.github.io/url-encoder-decoder/](https://bordia98.github.io/url-encoder-decoder/)

---

## ✨ Features

- ⚡ **Instant Real-Time Conversion:** Encode and decode URLs and URI components as you type.
- 🎯 **Dual Encoding Modes:**
  - **Component Mode (`encodeURIComponent`):** Encodes all reserved characters (ideal for query parameter values).
  - **Full URL Mode (`encodeURI`):** Preserves URL structure delimiters (`://`, `/`, `?`, `&`, `#`).
- 🧩 **Interactive Query Parameter Editor:**
  - Automatically parses URLs into protocol, host, pathname, hash, and individual parameters.
  - Dynamically add, modify, or remove query keys and values with immediate live reconstruction.
- 🔐 **Base64 URL-Safe Encoder / Decoder:** Converts text to and from RFC 4648 §5 URL-safe Base64 (`-` and `_` substitutes, zero padding).
- 🌓 **Light & Dark Theme:** Clean developer-centric design, defaulting to light mode with persistent preference storage.
- 🔒 **100% Private & Client-Side:** No server requests, no cookies, no analytics tracking. Works completely offline.
- 📋 **Productivity Tools:** One-click copy with toast notifications, input/output swap, sample loader, and character / byte stats counter.
- 🔍 **SEO & Search-Engine Optimized:** Fully indexed semantic HTML, OpenGraph tags, Twitter cards, and Schema.org `WebApplication` and `FAQPage` JSON-LD data.

---

## 🚀 Quick Start / Local Development

Since this project has **zero build steps and zero external dependencies**, you can run it locally with any simple HTTP server or directly in your browser:

### Option 1: Open Directly
Simply open `index.html` in your favorite web browser.

### Option 2: Run with Python 3
```bash
cd url-encoder-decoder
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### Option 3: Run with Node.js `npx serve`
```bash
cd url-encoder-decoder
npx serve
```

---

## 🛠️ Deploying to GitHub Pages

To host this repository on your GitHub Pages:

1. Push this folder to a GitHub repository named `url-encoder-decoder` under your account (`bordia98/url-encoder-decoder`).
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Source**, select `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`.
5. Click **Save**. Within 1–2 minutes, your tool will be live at:
   ```
   https://bordia98.github.io/url-encoder-decoder/
   ```

---

## 📁 Project Structure

```
url-encoder-decoder/
├── index.html       # Semantic HTML5 markup, meta tags & structured data
├── style.css        # Responsive styling with CSS variables (Light/Dark)
├── script.js        # Pure vanilla JavaScript client-side logic
├── robots.txt       # Search engine crawler directives
├── sitemap.xml      # XML sitemap for SEO discovery
├── LICENSE          # MIT Open Source License
└── README.md        # Comprehensive documentation
```

---

## 🔒 Security & Privacy Guarantee

- **No Remote Calls:** All string transformations use standard browser native JavaScript APIs (`encodeURIComponent`, `TextEncoder`, `URL`, etc.).
- **Zero Data Collection:** No user input, query values, tokens, or URLs are ever transmitted to any third-party server or stored in cookies.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!
Feel free to open an issue or submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

Developed with care by [bordia98](https://github.com/bordia98).
