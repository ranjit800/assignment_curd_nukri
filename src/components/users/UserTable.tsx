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
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  PersonOff as PersonOffIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDelete = (id: number) => {
    setDeletingId(id);
    onDelete(id);
  };

  // Empty State
  if (users.length === 0) {
    return (
      <Paper 
        elevation={2}
        sx={{ 
          p: { xs: 3, sm: 6 },
          textAlign: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <PersonOffIcon 
          sx={{ 
            fontSize: { xs: 60, sm: 80 }, 
            color: 'text.disabled',
            mb: 2,
          }} 
        />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click "Add User" to create your first user
        </Typography>
      </Paper>
    );
  }

  // Mobile Card View
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {users.map((user) => (
          <Card 
            key={user.id}
            elevation={2}
            sx={{
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" component="div">
                  {user.firstName} {user.lastName}
                </Typography>
                <Chip 
                  label={`#${user.id}`} 
                  size="small" 
                  color="primary"
                  variant="outlined"
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {user.phone}
                  </Typography>
                </Box>
                
                {/* Step 4 (Optional): Display new fields in mobile cards */}
                {/* {user.dateOfBirth && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CakeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {user.dateOfBirth}
                    </Typography>
                  </Box>
                )} */}
              </Box>

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 1 }}>
                <Tooltip title="Edit user">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(user)}
                    size="medium"
                    sx={{
                      border: '1px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete user">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.id!)}
                    disabled={isDeleting && deletingId === user.id}
                    size="medium"
                    sx={{
                      border: '1px solid',
                      borderColor: 'error.main',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Desktop Table View
  return (
    <TableContainer 
      component={Paper} 
      elevation={2}
      sx={{
        '& .MuiTableRow-root:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
            
            {/* Step 4 (Optional): Add table column headers for new fields */}
            {/* <TableCell sx={{ fontWeight: 600 }}>Date of Birth</TableCell> */}
            {/* <TableCell sx={{ fontWeight: 600 }}>Address</TableCell> */}
            
            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                transition: 'background-color 0.2s',
              }}
            >
              <TableCell component="th" scope="row">
                <Chip 
                  label={user.id} 
                  size="small" 
                  variant="outlined"
                  color="primary"
                />
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  {user.email}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  {user.phone}
                </Box>
              </TableCell>
              
              {/* Step 4 (Optional): Add table columns for new fields */}
              {/* <TableCell>{user.dateOfBirth || 'N/A'}</TableCell> */}
              {/* <TableCell>{user.address || 'N/A'}</TableCell> */}
              
              <TableCell align="right">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Tooltip title="Edit user">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(user)}
                      size="small"
                      sx={{
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
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
                      sx={{
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
