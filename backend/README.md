# Backend API

Simple JSON Server backend for the user management app.

## Getting Started

Install packages:
```bash
npm install
```

Run the server:
```bash
npm start
```

Server starts on `http://localhost:3001`

---

## API Endpoints

**Base URL:** `http://localhost:3001` (local) or `https://your-app.onrender.com` (production)

### Get all users
```
GET /users
```

### Get one user
```
GET /users/:id
```

### Create user
```
POST /users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### Update user
```
PUT /users/:id
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### Delete user
```
DELETE /users/:id
```

---

## Database

Everything is stored in `db.json`. Changes save automatically.

---

## Deploying to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repo
4. Set these configs:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click deploy

That's it!

---

## Notes

- CORS is enabled (frontend can make requests)
- Render's free tier sleeps after 15 min of inactivity
- First request after sleep takes ~30-60 seconds to wake up

Not a big deal for demos and assignments though!
