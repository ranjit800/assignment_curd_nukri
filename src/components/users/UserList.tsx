import { useState } from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useUsers } from '../../hooks/useUsers';
import { UserTable } from './UserTable';
import { UserFormDialog } from './UserFormDialog';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { User } from '../../types/user.types';
import type { UserFormData } from '../../config/formSchema';

/**
 * Main User List Component
 * Orchestrates all CRUD operations and manages dialog states
 */
export const UserList = () => {
  const {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    isCreating,
    isUpdating,
    isDeleting,
    refetch,
  } = useUsers();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  // Handle create/edit form submit
  const handleFormSubmit = (data: UserFormData) => {
    if (selectedUser) {
      // Update existing user
      updateUser(
        { id: selectedUser.id!, data },
        {
          onSuccess: () => {
            setFormOpen(false);
            setSelectedUser(undefined);
          },
        }
      );
    } else {
      // Create new user
      createUser(data, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  // Handle edit button click
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        },
      });
    }
  };

  // Handle add new user
  const handleAddNew = () => {
    setSelectedUser(undefined);
    setFormOpen(true);
  };

  // Close form dialog
  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedUser(undefined);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your users with full CRUD operations
          </Typography>
        </div>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error instanceof Error ? error.message : 'An error occurred'}
        </Alert>
      )}

      {/* Users Table */}
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        isDeleting={isDeleting}
      />

      {/* Add/Edit User Dialog */}
      <UserFormDialog
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
        confirmText="Delete"
        isLoading={isDeleting}
      />
    </Container>
  );
};
