import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { userFormFields, userValidationSchema } from '../../config/formSchema';
import type { UserFormData } from '../../config/formSchema';
import type { User } from '../../types/user.types';

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  user?: User;
  isLoading?: boolean;
}

/**
 * EXTENSIBLE USER FORM DIALOG
 * 
 * This component demonstrates the extensibility architecture.
 * Form fields are dynamically generated from the formSchema configuration.
 * 
 * To add a new field:
 * 1. Add it to userFormFields in config/formSchema.ts
 * 2. Add it to User type in types/user.types.ts
 * 3. Add validation to userValidationSchema in config/formSchema.ts
 * 4. That's it! This component will automatically render it.
 */
export const UserFormDialog = ({
  open,
  onClose,
  onSubmit,
  user,
  isLoading = false,
}: UserFormDialogProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  // Reset form with user data when editing
  useEffect(() => {
    if (user) {
      reset(user);
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
    }
  }, [user, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ maxHeight: { xs: '60vh', sm: '70vh' }, overflowY: 'auto' }}>
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 2, 
              mt: 1 
            }}
          >
            {/* DYNAMIC FORM FIELD RENDERING */}
            {userFormFields.map((field) => (
              <Box
                key={field.name}
                sx={{
                  gridColumn: { 
                    xs: 'span 1',
                    sm: field.gridWidth === 12 ? 'span 2' : 'span 1'
                  },
                }}
              >
                <Controller
                  name={field.name as keyof UserFormData}
                  control={control}
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      fullWidth
                      multiline={field.type === 'textarea'}
                      rows={field.type === 'textarea' ? 4 : 1}
                      error={!!errors[field.name as keyof UserFormData]}
                      helperText={errors[field.name as keyof UserFormData]?.message}
                      disabled={isLoading}
                      InputLabelProps={{
                        shrink: field.type === 'date' ? true : undefined,
                      }}
                    />
                  )}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : user ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
