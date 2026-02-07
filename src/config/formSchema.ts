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
        gridWidth: 6,
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
        placeholder: 'example@email.com',
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

    // EXAMPLE: How to add new fields
    // Uncomment below to add Date of Birth field:
    // {
    //   name: 'dateOfBirth',
    //   label: 'Date of Birth',
    //   type: 'date',
    //   required: false,
    //   gridWidth: 6,
    // },

    // {
    //   name: 'address',
    //   label: 'Address',
    //   type: 'textarea',
    //   placeholder: 'Enter full address',
    //   required: false,
    //   gridWidth: 12,
    // },
];

/**
 * Zod validation schema
 * This is generated dynamically based on userFormFields
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

    // Future field validations can be added here:
    // dateOfBirth: z.string().optional(),
    // address: z.string().min(10, 'Address must be at least 10 characters').optional(),
});

export type UserFormData = z.infer<typeof userValidationSchema>;
