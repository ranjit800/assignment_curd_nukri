# User Management Frontend

Modern React + TypeScript CRUD application for managing users.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Set Environment Variable
Create `.env` file:
```
VITE_API_URL=http://localhost:3001
```

### Run Development Server
```bash
npm run dev
```

App will run on `http://localhost:5173`

---

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI** - Component library  
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Query** - Data fetching
- **Axios** - HTTP client
- **Vite** - Build tool

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   └── users/           # User-specific components
├── config/
│   └── formSchema.ts    # Form configuration (extensibility!)
├── hooks/
│   └── useUsers.ts      # React Query hooks
├── services/
│   └── api.ts           # API layer
├── styles/
│   └── theme.ts         # MUI theme
└── types/
    └── user.types.ts    # TypeScript types
```

---

## 🎯 Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Form Validation** - Zod schema validation  
- ✅ **Responsive Design** - Mobile and desktop views
- ✅ **Configuration-Driven** - Easy to extend with new fields
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Professional UI** - Material-UI components

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001` |

---

## 🌐 Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deploy
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://your-api.onrender.com`)
4. Deploy!

---

## 📝 Adding New Fields

See [ADDING_NEW_FIELDS.md](../ADDING_NEW_FIELDS.md) for detailed instructions.

**Quick summary:**
1. Add field to `src/types/user.types.ts`
2. Add field config to `src/config/formSchema.ts`
3. Add validation to `src/config/formSchema.ts`
4. Done! Form auto-renders new field

---

## 🧪 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🎨 Customization

### Theme
Edit `src/styles/theme.ts` to customize colors and styles.

### Validation
Edit `src/config/formSchema.ts` to modify validation rules.

### API
Edit `src/services/api.ts` to change API endpoints or add authentication.

---

## 📄 License

MIT

---

## 👤 Author

Ranjit Jana - jranjit367@gmail.com
