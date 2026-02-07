import { CircularProgress, Box, Typography, Alert } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

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
        gap: 3,
        py: 4,
        px: 2,
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

      {/* Cold Start Notice */}
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ maxWidth: 600, mt: 1 }}
      >
        <Typography variant="body2">
          <strong>First time loading?</strong> This app uses Render's free tier. 
          The backend may take 30-60 seconds to wake up from sleep mode if it hasn't been used recently.
        </Typography>
      </Alert>
    </Box>
  );
};
