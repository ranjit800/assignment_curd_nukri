import axios from 'axios';
import type { User, UserFormInput } from '../types/user.types';

/**
 * API Configuration
 * Using environment variables for flexibility
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Axios instance with default configuration
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

/**
 * API Service for User CRUD operations
 * This service layer abstracts all API calls
 * Makes it easy to switch backends or add features like authentication
 */
export const userApi = {
    /**
     * Get all users
     */
    getAll: async (): Promise<User[]> => {
        try {
            const response = await apiClient.get<User[]>('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users. Please try again.');
        }
    },

    /**
     * Get a single user by ID
     */
    getById: async (id: number): Promise<User> => {
        try {
            const response = await apiClient.get<User>(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            throw new Error('Failed to fetch user details. Please try again.');
        }
    },

    /**
     * Create a new user
     */
    create: async (userData: UserFormInput): Promise<User> => {
        try {
            const response = await apiClient.post<User>('/users', userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user. Please try again.');
        }
    },

    /**
     * Update an existing user
     */
    update: async (id: number, userData: UserFormInput): Promise<User> => {
        try {
            const response = await apiClient.put<User>(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            throw new Error('Failed to update user. Please try again.');
        }
    },

    /**
     * Delete a user
     */
    delete: async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`/users/${id}`);
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            throw new Error('Failed to delete user. Please try again.');
        }
    },
};
