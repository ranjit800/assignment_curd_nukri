/**
 * User type definition
 * This interface defines the shape of a user object
 */
export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    // Future fields can be added here easily:
    // dateOfBirth?: string;
    // address?: string;
    // city?: string;
    // country?: string;
}

/**
 * Form input type (without id for creating new users)
 */
export type UserFormInput = Omit<User, 'id'>;
