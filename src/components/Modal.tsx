import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Checkmark } from 'react-checkmark';


interface ModalProps {
  open: boolean;
  handleCloseAlert: () => void;
}

const CustomPaper = (props: any) => (
  <Paper {...props} sx={{ backgroundColor: '#2C9CDB', padding: '20px' }} />
);

function Modal({ open, handleCloseAlert }: ModalProps) {
  return (
    <Dialog open={open} onClose={handleCloseAlert} PaperComponent={CustomPaper}>
      <div
        style={{
          position: 'fixed',
          top: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <Checkmark size="large" color="#0E9003" className="text-white" />
      </div>
      <DialogTitle style={{ color: 'white', marginTop: '10px', textAlign: 'center' }}>
        Səsverməni uğurla başa vurdunuz!
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: 'white', textAlign: 'center' }}>
          Sizin səsiniz uğurla qeydə alınmışdır. Səsvermədə iştirak etdiyiniz üçün
          təşəkkürlər!
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button
          onClick={handleCloseAlert}
          variant="outlined"
          sx={{ color: '#2C9CDB', backgroundColor: 'white',  '&:hover': {
            backgroundColor: 'white',
            color: '#2C9CDB',
          },}}
        >
          Yekunlaşdır
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
