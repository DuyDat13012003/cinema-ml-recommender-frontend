import { Button as MuiButton, ButtonProps } from '@mui/material';

export const Button = (props: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        ...props.sx,
      }}
    />
  );
};