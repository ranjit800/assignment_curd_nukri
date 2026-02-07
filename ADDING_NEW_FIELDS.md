# 📚 Adding New Fields to the Application

Quick guide to add new fields using **configuration-driven architecture**.

---

## ⚡ 3-Step Process

1. **`frontend/src/types/user.types.ts`** - Add field to User interface
2. **`frontend/src/config/formSchema.ts`** - Add field config + validation
3. **`frontend/src/components/users/UserTable.tsx`** - Add to table (optional)

**No component logic changes needed!** Form auto-renders new fields.

---

## 📝 Example: Adding "Date of Birth"

### **Step 1: Update User Type** ✅

**File:** `frontend/src/types/user.types.ts`

```typescript
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  dateOfBirth?: string;  // ← Add new field (? = optional)
}
```

---

### **Step 2A: Add Field Config** ✅

**File:** `frontend/src/config/formSchema.ts` (line ~60)

```typescript
export const userFormFields: FieldConfig[] = [
  { name: 'firstName', ... },
  { name: 'lastName', ... },
  { name: 'email', ... },
  { name: 'phone', ... },
  
  // Add field configuration
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',       // text | email | tel | date | number | textarea
    required: false,
    gridWidth: 6,       // 12=full, 6=half, 4=third
  },
];
```

---

### **Step 2B: Add Validation** ✅

**File:** `frontend/src/config/formSchema.ts` (line ~160)

```typescript
export const userValidationSchema = z.object({
  firstName: z.string()...,
  lastName: z.string()...,
  email: z.string()...,
  phone: z.string()...,
  
  dateOfBirth: z.string().optional(),  // ← Add validation
});
```

**Common patterns:**
```typescript
// Optional text
address: z.string().optional(),

// Required with min length
address: z.string().min(5, 'Too short'),

// Number with range
age: z.number().min(18).max(100).optional(),

// Pattern (6-digit ZIP)
zipCode: z.string().regex(/^\d{6}$/, '6 digits required').optional(),
```

---

### **Step 3: Add to Table** 💡 (Optional)

**File:** `frontend/src/components/users/UserTable.tsx`

**Table header** (line ~202):
```tsx
<TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
<TableCell sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
<TableCell align="right">Actions</TableCell>
```

**Table cell** (line ~238):
```tsx
<TableCell>{user.phone}</TableCell>
<TableCell>{user.dateOfBirth || 'N/A'}</TableCell>
<TableCell align="right">...</TableCell>
```

---

## ✅ Done!

1. **Refresh** `http://localhost:5173`
2. Click **"Add User"**
3. **See new field** in form
4. Fill & submit
5. **Check table** (if added in Step 3)

---

## 📋 Commented Examples Already in Code

All files have examples you can uncomment:

### `frontend/src/types/user.types.ts`:
```typescript
// dateOfBirth?: string;
// address?: string;
// city?: string;
// age?: number;
```

### `frontend/src/config/formSchema.ts` (field config):
```typescript
// {
//   name: 'dateOfBirth',
//   label: 'Date of Birth',
//   type: 'date',
//   required: false,
//   gridWidth: 6,
// },
```

### `frontend/src/config/formSchema.ts` (validation):
```typescript
// dateOfBirth: z.string().optional(),
// address: z.string().min(5, 'At least 5 chars').optional(),
```

---

## 🎯 Why This Works

**Configuration-driven** approach:
- ✅ No UI rewrites - components read config
- ✅ Type-safe - TypeScript catches errors
- ✅ Scalable - add 100 fields the same way

Satisfies assignment requirement:
> "Adding a new field should not require major UI or backend logic rewrites."

---

## 🆘 Troubleshooting

**Field not showing?**
- Check field name matches in all files
- Confirm it's in `userFormFields` array
- Refresh browser

**TypeScript errors?**
- Add field to `User` interface first
- Check type is correct

**Validation issues?**
- Use `.optional()` for non-required fields
- Check schema matches field config

---

## � File Paths Reference

```
frontend/
├── src/
│   ├── types/
│   │   └── user.types.ts          # Step 1: Add field to interface
│   ├── config/
│   │   └── formSchema.ts          # Step 2: Add config + validation
│   └── components/
│       └── users/
│           └── UserTable.tsx      # Step 3: Add to table (optional)
```

**No need to change:**
- ❌ `UserFormDialog.tsx` - Form component
- ❌ `UserList.tsx` - Parent component
- ❌ `useUsers.ts` - API hooks
- ❌ `api.ts` - API service

---

## 👤 Author

Ranjit Jana - jranjit367@gmail.com
