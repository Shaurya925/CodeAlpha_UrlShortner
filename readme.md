# 🔗 URL Shortener API

A production-ready URL Shortener built with Node.js, Express.js, and MongoDB that allows users to generate short URLs, create custom aliases, track clicks, and retrieve URL analytics.

---

# 🚀 Features

### URL Management

* Create Short URLs
* Custom Short Codes
* Automatic Short Code Generation using NanoID
* URL Validation
* Duplicate URL Detection

### Redirection

* Redirect Short URL to Original URL
* Dynamic Route Handling

### Analytics

* Click Tracking
* URL Statistics API
* Creation Date Tracking

### Security & Backend Architecture

* MVC Architecture
* MongoDB & Mongoose
* Async Error Handling
* Centralized Error Middleware
* Environment Configuration
* Clean REST API Design

---

# 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Utilities

* NanoID
* Validator
* Dotenv

---

# 📁 Project Structure

```bash
src/
├── config/
│   ├── config.js
│   └── db.js
│
├── controllers/
│   └── urlController.js
│
├── models/
│   └── urlModel.js
│
├── routes/
│   └── urlRoutes.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── utils/
│   └── asyncHandler.js
│
├── app.js
└── server.js
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

BASE_URL=http://localhost:5000
```

---

# 📦 Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd url-shortener
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

# 🔗 API Endpoints

## Create Short URL

```http
POST /api/v1/urls
```

Request Body:

```json
{
  "originalUrl":"https://google.com",
  "shortCode":"google"
}
```

Response:

```json
{
  "success": true,
  "body": {
    "shortUrl": "http://localhost:5000/google",
    "shortCode": "google",
    "clicks": 0
  }
}
```

---

## Redirect URL

```http
GET /:shortCode
```

Example:

```http
GET /google
```

Automatically redirects to:

```text
https://google.com
```

---

## Get URL Statistics

```http
GET /api/v1/urls/:shortCode/stats
```

Example:

```http
GET /api/v1/urls/google/stats
```

Response:

```json
{
  "success": true,
  "body": {
    "originalUrl": "https://google.com",
    "shortCode": "google",
    "clicks": 5,
    "createdAt": "2026-06-02T12:00:00.000Z"
  }
}
```

---

# 🧠 How It Works

1. User submits a long URL.
2. System validates the URL.
3. Generates a unique short code using NanoID or accepts a custom alias.
4. Stores URL in MongoDB.
5. Redirects users when the short URL is accessed.
6. Tracks click counts and analytics.

---

# 🔒 Validation Rules

* Valid URL required
* Duplicate URL handling
* Unique short code enforcement
* Custom aliases supported

---

# 📊 Example Workflow

```text
https://www.google.com
        ↓
Create Short URL
        ↓
http://localhost:5000/google
        ↓
User Visits
        ↓
Redirect to Original URL
        ↓
Click Count Updated
```

---

# 🎯 Future Improvements

* User Authentication
* QR Code Generation
* URL Expiration
* Password Protected Links
* Custom Domains
* Rate Limiting
* Redis Caching
* Analytics Dashboard
* Docker Support
* Swagger Documentation

---

# 💡 Key Learnings

* REST API Development
* MongoDB Integration
* URL Redirection
* Analytics Tracking
* MVC Architecture
* Error Handling
* Middleware Design
* Backend Project Structure

---

# 👨‍💻 Author

**Shaurya Kumar**

Built with Node.js, Express.js, and MongoDB.
