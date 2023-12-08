import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import {
  ApiMethods,
  SnackbarInterface,
  SnackbarStatus,
} from "../interfaces/method";
import { VOTER_URL } from "../constants/url";
import CustomizedSnackbars from "./Snackbar";

interface VoterModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

function VoterModal({ open, onClose, setChanges }: VoterModalProps) {
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    status: null,
    opened: false,
    message: "",
  });

  const formik = useFormik({
    initialValues: {
      pin: "",
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetch(
        environment.apiUrl + VOTER_URL.POST,
        fetchApi(ApiMethods.POST, values)
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setChanges(prevChanges => !prevChanges)
            setSnackbar({
              opened: true,
              status: SnackbarStatus.SUCCESSFULL,
              message: "Voter added successfully",
            });
            setTimeout(() => {
              resetSnackbar();
              onClose();
              resetForm();
            }, 2000);
          }
        })
    },
  });

  const resetSnackbar = () => {
    setSnackbar({
      opened: false,
      status: null,
      message: "",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "400px",
          display: "flex",
          padding: "60px",
          gap: "10px",
        },
      }}
    >
      <form onSubmit={formik.handleSubmit} className="flex gap-5 flex-col">
        <TextField
          id="pin"
          name="pin"
          label="Voter ID"
          onChange={formik.handleChange}
          value={formik.values.pin}
        />
        <TextField
          id="name"
          name="name"
          label="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Button  type="submit" variant="contained">
        Submit
        </Button>
      </form>
      <Button
        type="submit"
        variant="outlined"
        onClick={() => {
          onClose();
        }}
      >
        Cancel
      </Button>
      {snackbar.opened && (
        <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      )}
    </Dialog>
  );
}

export default VoterModal;
