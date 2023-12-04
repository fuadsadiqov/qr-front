import React from "react";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface VoterModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { voterId: number; name: string }) => void;
}

function VoterModal({ open, onClose, onSubmit }: VoterModalProps) {
  const formik = useFormik({
    initialValues: {
      voterId: null,
      name: "",
    },
    onSubmit: (values) => {
      // onSubmit(values);
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="voterId"
          name="voterId"
          label="Voter ID"
          onChange={formik.handleChange}
          value={formik.values.voterId}
        />
        <TextField
          id="name"
          name="name"
          label="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Dialog>
  );
}

export default VoterModal;
