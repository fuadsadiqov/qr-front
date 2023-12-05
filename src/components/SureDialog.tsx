import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface SureDialogProps {
  open: boolean;
  handleClose: () => void;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const SureDialog: React.FC<SureDialogProps> = ({ open, handleClose, setDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure to delete this item?"}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={() => { handleClose(); setDelete(prevDelete => !prevDelete); }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default SureDialog;
