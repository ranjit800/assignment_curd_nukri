/**
 * User Type Definition
 * 
 * Step 1: Add new fields here to extend the user model
 */
export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    // Extensibility Example: Adding optional fields
    // Uncomment any of these to add new fields to your form
    // dateOfBirth?: string;
    // address?: string;
    // city?: string;
    // zipCode?: string;
    // age?: number;
}

/**
 * Form input type (excludes the auto-generated ID)
 */
export type UserFormInput = Omit<User, 'id'>;
