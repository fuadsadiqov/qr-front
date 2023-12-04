import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props: any) {
  const {open, setOpen} = props;
  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen("");
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open.length != 0} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {open}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
