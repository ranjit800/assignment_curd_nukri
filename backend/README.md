# User Management Backend API

JSON Server backend for the User Management CRUD application.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm start
```

Server will run on `http://localhost:3001`

---

## 📌 API Endpoints

### Base URL
- Local: `http://localhost:3001`
- Production: `https://your-app.onrender.com`

### Available Endpoints

#### Get All Users
```
GET /users
```

#### Get Single User
```
GET /users/:id
```

#### Create User
```
POST /users
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string"
}
```

#### Update User
```
PUT /users/:id
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string"
}
```

#### Delete User
```
DELETE /users/:id
```

---

## 🗄️ Database

Data is stored in `db.json` file. Changes persist automatically.

---

## 🌐 Deploy to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Deploy!

---

## 🔧 Environment Variables

None required for basic setup.

---

## 📝 Notes

- CORS is enabled for all origins
- Free tier on Render sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
