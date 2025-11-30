import { TextField, TextFieldProps } from '@mui/material';

export const Input = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#1a1a2e',
          color: '#fff',
          '& fieldset': {
            borderColor: '#333',
          },
          '&:hover fieldset': {
            borderColor: '#4299e1',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#4299e1',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#aaa',
        },
        ...props.sx,
      }}
    />
  );
};
