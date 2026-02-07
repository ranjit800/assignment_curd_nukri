# User Management System

Full-stack CRUD application for managing users with React frontend and JSON Server backend.

## 📁 Project Structure

```
assignment_curd_nukri/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   └── README.md
├── backend/           # JSON Server backend
│   ├── server.js
│   ├── db.json
│   └── README.md
└── ADDING_NEW_FIELDS.md
```

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:3001`

### 2. Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🌐 Deployment

### Backend (Render)
1. Deploy `backend/` folder to Render
2. Set start command: `npm start`
3. Get URL: `https://your-app.onrender.com`

### Frontend (Vercel)
1. Deploy `frontend/` folder to Vercel
2. Set environment variable:
   - `VITE_API_URL` = `https://your-app.onrender.com`
3. Deploy!

See individual README files for detailed instructions.

---

## ✨ Features

- ✅ Full CRUD operations
- ✅ Form validation with Zod
- ✅ Responsive design
- ✅ Configuration-driven extensibility  
- ✅ TypeScript type safety
- ✅ Professional Material-UI

---

## 📚 Documentation

- [Adding New Fields](./ADDING_NEW_FIELDS.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

---

## 👤 Author

Ranjit Jana  
jranjit367@gmail.com
