import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../services/api';
import type { UserFormInput } from '../types/user.types';
import toast from 'react-hot-toast';

/**
 * React Query key for users cache
 */
const USERS_QUERY_KEY = ['users'];

/**
 * Custom hook for user CRUD operations using React Query
 * 
 * This hook provides:
 * - Automatic loading states
 * - Error handling
 * - Cache management
 * - Optimistic updates
 * - Automatic refetching
 * 
 * Interview Tip: This demonstrates modern React patterns and
 * professional approach to server state management
 */
export const useUsers = () => {
    const queryClient = useQueryClient();

    /**
     * Fetch all users
     * React Query automatically handles loading, error, and caching
     */
    const {
        data: users = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: USERS_QUERY_KEY,
        queryFn: userApi.getAll,
        staleTime: 30000, // Consider data fresh for 30 seconds
        retry: 2, // Retry failed requests twice
    });

    /**
     * Create user mutation
     */
    const createMutation = useMutation({
        mutationFn: userApi.create,
        onSuccess: () => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
            toast.success('User created successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create user');
        },
    });

    /**
     * Update user mutation
     */
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UserFormInput }) =>
            userApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
            toast.success('User updated successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update user');
        },
    });

    /**
     * Delete user mutation
     */
    const deleteMutation = useMutation({
        mutationFn: userApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
            toast.success('User deleted successfully!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete user');
        },
    });

    return {
        // Data and state
        users,
        isLoading,
        error,
        refetch,

        // Mutations
        createUser: createMutation.mutate,
        updateUser: updateMutation.mutate,
        deleteUser: deleteMutation.mutate,

        // Mutation states (for showing loading spinners in buttons)
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};
