import { z } from 'zod';

/**
 * EXTENSIBILITY: Field Configuration Schema
 * 
 * This is the heart of the extensible architecture.
 * To add a new field to the form:
 * 1. Add the field to the userFormFields array below
 * 2. Add the field to the User interface in types/user.types.ts
 * 3. That's it! The form will automatically render the new field.
 * 
 * No need to modify components - they read from this configuration.
 */

export interface FieldConfig {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea';
    placeholder?: string;
    required: boolean;
    gridWidth?: number; // For grid layout (1-12)
}

/**
 * Field definitions for the user form
 * Modify this array to add/remove/reorder form fields
 */
export const userFormFields: FieldConfig[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter first name',
        required: true,
        gridWidth: 6, // Takes half width (6 out of 12 columns)
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter last name',
        required: true,
        gridWidth: 6,
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'user@example.com',
        required: true,
        gridWidth: 6,
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '1234567890',
        required: true,
        gridWidth: 6,
    },

    // ============================================
    // HOW TO ADD NEW FIELDS - STEP 2 of 3
    // ============================================
    // Add field configurations here. The form will
    // automatically render them based on this config.
    // 
    // EXAMPLES: Uncomment any of these to add fields
    // ============================================

    // Date field example
    // {
    //   name: 'dateOfBirth',
    //   label: 'Date of Birth',
    //   type: 'date',
    //   required: false,
    //   gridWidth: 6,
    // },

    // Text field example
    // {
    //   name: 'address',
    //   label: 'Address',
    //   type: 'text',
    //   placeholder: 'Enter your address',
    //   required: false,
    //   gridWidth: 12, // Full width
    // },

    // City and Zip side by side
    // {
    //   name: 'city',
    //   label: 'City',
    //   type: 'text',
    //   placeholder: 'Enter city',
    //   required: false,
    //   gridWidth: 6,
    // },
    // {
    //   name: 'zipCode',
    //   label: 'ZIP Code',
    //   type: 'text',
    //   placeholder: '123456',
    //   required: false,
    //   gridWidth: 6,
    // },

    // Number field example
    // {
    //   name: 'age',
    //   label: 'Age',
    //   type: 'number',
    //   placeholder: 'Enter age',
    //   required: false,
    //   gridWidth: 6,
    // },

    // Textarea example
    // {
    //   name: 'bio',
    //   label: 'Biography',
    //   type: 'textarea',
    //   placeholder: 'Tell us about yourself',
    //   required: false,
    //   gridWidth: 12,
    // },
];

/**
 * Zod Validation Schema
 * 
 * Defines validation rules for each field.
 * These rules are enforced on the client side before form submission.
 * 
 * ============================================
 * HOW TO ADD NEW FIELDS - STEP 3 of 3
 * ============================================
 * Add validation rules for your new fields here.
 */
export const userValidationSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must not exceed 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters'),

    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must not exceed 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters'),

    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),

    phone: z
        .string()
        .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .min(1, 'Phone number is required'),

    // ===== VALIDATION EXAMPLES: Uncomment to add =====

    // Optional string field
    // dateOfBirth: z.string().optional(),

    // Optional string with minimum length
    // address: z.string().min(5, 'Address must be at least 5 characters').optional(),

    // City validation (letters only)
    // city: z.string().regex(/^[A-Za-z\s]+$/, 'City can only contain letters').optional(),

    // ZIP code validation (6 digits)
    // zipCode: z.string().regex(/^\d{6}$/, 'ZIP code must be 6 digits').optional(),

    // Number validation with range
    // age: z.number().min(18, 'Must be at least 18').max(100, 'Must be under 100').optional(),

    // String length validation
    // bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),

    // URL validation
    // website: z.string().url('Must be a valid URL').optional(),

    // Enum validation (dropdown values)
    // role: z.enum(['admin', 'user', 'guest'], {
    //   errorMap: () => ({ message: 'Role must be admin, user, or guest' })
    // }).optional(),

    // Email with custom pattern
    // workEmail: z.string().email('Must be a valid email').optional(),

    // Complex phone validation
    // alternatePhone: z.string()
    //   .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone format')
    //   .optional(),
});

export type UserFormData = z.infer<typeof userValidationSchema>;
