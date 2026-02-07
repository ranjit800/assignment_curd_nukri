import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * Centered loading spinner component
 */
export const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: { xs: '300px', sm: '400px' },
        gap: 2,
        py: 4,
      }}
    >
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.6 },
            '100%': { opacity: 1 },
          },
        }}
      />
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          fontSize: { xs: '0.875rem', sm: '1rem' },
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};
