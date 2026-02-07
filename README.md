# User Management CRUD Application

Hey there! 👋 This is a React-based user management system I built for the Naukri assignment. It's a full CRUD application that lets you manage users, and I designed it to be super extensible - meaning you can easily add new fields without breaking everything!

## 🎯 What This App Does

It's pretty straightforward - you can:
- **Add new users** with their basic info (name, email, phone)
- **View all users** in a nice table
- **Edit existing users** when details change
- **Delete users** (with a confirmation, of course!)

The cool part? Everything is validated, shows loading states, and gives you feedback with those nice pop-up notifications.

## 🚀 Getting Started

### What You'll Need
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone this repository**
```bash
git clone <your-repo-url>
cd assignment_curd_nukri
```

2. **Install dependencies**
```bash
npm install
```

3. **Start both the app and the API**
```bash
npm run dev:all
```

This runs two things at once:
- The React app at `http://localhost:5173`
- The JSON Server API at `http://localhost:3001`

Or you can run them separately:
```bash
npm run dev    # Just the React app
npm run api    # Just the API server
```

4. **Open your browser** and go to `http://localhost:5173`

That's it! You should see the user management interface with some sample users already loaded.

## 🎨 Tech Stack

I used some modern tools to build this:

- **React 19** - The latest version for the UI
- **TypeScript** - For type safety and better code quality
- **Material-UI (MUI)** - For the professional-looking components
- **React Hook Form + Zod** - For smart form handling and validation
- **TanStack React Query** - For managing server state and caching
- **Axios** - For API calls
- **JSON Server** - As a mock REST API for development
- **Vite** - For super fast development and building
- **Tailwind CSS** - For utility styling

## ✨ The Extensibility Part (Important!)

This was a key requirement - making it easy to add new fields. Here's how I solved it:

### How to Add a New Field

Let's say you want to add a "Date of Birth" field. You only need to do 3 things:

**Step 1: Add the field to the User type**

Open `src/types/user.types.ts` and add your field:
```typescript
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;  // ← Add this line
}
```

**Step 2: Add the field to the form configuration**

Open `src/config/formSchema.ts` and add it to the `userFormFields` array:
```typescript
{
  name: 'dateOfBirth',
  label: 'Date of Birth',
  type: 'date',
  required: false,
  gridWidth: 6,
}
```

**Step 3: Add validation**

In the same file, add it to the `userValidationSchema`:
```typescript
dateOfBirth: z.string().optional(),
```

That's it! The form will automatically render the new field. No need to touch any component files.

### Why This Works

I built the form using a **configuration-driven architecture**. The `UserFormDialog` component reads from the config file and dynamically generates all the form fields. So when you add a new field to the config, it just appears - no extra code needed!

## 📁 Project Structure

Here's how I organized everything:

```
src/
├── components/
│   ├── common/              # Reusable components
│   │   ├── ConfirmDialog.tsx
│   │   └── LoadingSpinner.tsx
│   └── users/               # User-specific components
│       ├── UserList.tsx     # Main container
│       ├── UserTable.tsx    # Table display
│       └── UserFormDialog.tsx   # The magic extensible form!
├── config/
│   └── formSchema.ts        # THE KEY FILE - field configuration
├── hooks/
│   └── useUsers.ts          # Custom hook for CRUD operations
├── services/
│   └── api.ts               # API service layer
├── types/
│   └── user.types.ts        # TypeScript type definitions
└── App.tsx                  # Main app setup
```

## 🧪 Testing the App

Here's what you can test:

1. **Create a user** - Click "Add User", fill the form, submit
2. **View users** - See the table with all users
3. **Edit a user** - Click the pencil icon, modify data, save
4. **Delete a user** - Click the trash icon, confirm deletion
5. **Validation** - Try submitting invalid data (wrong email format, short phone number, etc.)
6. **Loading states** - Watch the buttons show "Saving..." during operations
7. **Notifications** - See the toast messages for success/error feedback

## 🎨 Design Decisions

### Why Material-UI?
I went with MUI because it's professional, well-maintained, and has built-in accessibility. Plus, it made the app look polished without spending days on custom CSS.

### Why React Query?
It handles all the hard parts of server state - caching, loading states, error handling, refetching. This means cleaner components and better user experience.

### Why TypeScript?
Type safety caught so many bugs before they happened. It also makes the code self-documenting and easier to maintain.

### Why Configuration-Driven Forms?
This was the whole point of the extensibility requirement! By keeping field definitions in a config file, new fields can be added without touching component code. It's the "open/closed principle" in action.

## 🔧 API Setup

The app uses **JSON Server** as a mock REST API. Here's what it provides:

- `GET /users` - Get all users
- `GET /users/:id` - Get one user
- `POST /users` - Create a user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

The data is stored in `db.json`. Any changes you make in the UI are automatically saved here!

## 🎯 Assignment Requirements Checklist

Just to make sure I covered everything:

- ✅ **CRUD Operations** - All working perfectly
- ✅ **Form Validation** - Email, phone, required fields - all validated
- ✅ **Extensibility** - Easy to add fields via configuration
- ✅ **Clean UI** - Material-UI with custom theme
- ✅ **API Integration** - JSON Server with proper error handling
- ✅ **TypeScript** - Bonus requirement achieved!
- ✅ **Loading States** - Shows feedback during async operations
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Git Commits** - Clean, descriptive commit history

## 🚢 Deployment

To deploy this app:

1. **Build for production**
```bash
npm run build
```

2. **Deploy to Vercel** (recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use Netlify, GitHub Pages, or any static hosting service!

**Note:** For production, you'll need to replace JSON Server with a real backend API.

## 💭 Assumptions & Decisions

- **Phone validation**: I assumed 10-digit phone numbers (can be adjusted in the Zod schema)
- **Names**: Only letters allowed (no numbers or special characters)
- **Email**: Standard email format validation
- **Mock API**: JSON Server is fine for development/demo but not for production
- **No authentication**: Not required for this assignment, but could be added easily

## 🤔 Future Improvements

If I had more time, I'd add:
- Search and filter functionality
- Pagination for large datasets
- Export to CSV
- Bulk operations (delete multiple users)
- More field types (address, dropdown, etc.)
- Dark mode toggle
- Unit tests

## 👨‍💻 Author

Built with ❤️ by Ranjit Jana for the Naukri React Developer Assignment

---

Questions? Feel free to reach out at rjranjit099@gmail.com

**Thanks for checking out my project!** 🎉
