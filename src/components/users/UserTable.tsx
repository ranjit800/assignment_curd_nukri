import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { User } from '../../types/user.types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

/**
 * User Table Component
 * Displays all users in a Material-UI table with edit/delete actions
 * 
 * EXTENSIBILITY NOTE:
 * When adding new fields to the User type, update the TableCell
 * components to display them. The form will already handle them
 * thanks to the configuration-driven architecture.
 */
export const UserTable = ({ users, onEdit, onDelete, isDeleting }: UserTableProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDeletingId(id);
    onDelete(id);
  };

  if (users.length === 0) {
    return (
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h6" color="text.secondary">
            No users found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Add User" to create your first user
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            {/* Add new table headers here when adding fields */}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              {/* Add new table cells here when adding fields */}
              <TableCell align="right">
                <Tooltip title="Edit user">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(user)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete user">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.id!)}
                    disabled={isDeleting && deletingId === user.id}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
