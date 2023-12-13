import React from "react";
import Dialog from "@mui/material/Dialog";

interface SureDialogProps {
  open: boolean;
  handleClose: () => void;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds?: string[];
}

const SureDialog: React.FC<SureDialogProps> = ({
  open,
  handleClose,
  setDelete,
  selectedIds,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="p-[30px]">
        <button
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-100 hover:text-gray-400 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-toggle="deleteModal"
          onClick={handleClose}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <svg
          className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        {selectedIds && selectedIds?.length > 1 ? (
          <p className="mb-4 text-gray-800">
            Are you sure you want to delete {selectedIds?.length} items?
          </p>
        ) : (
          <p className="mb-4 text-gray-800">
            Are you sure you want to delete this item?
          </p>
        )}

        <div className="flex justify-center items-center space-x-4">
          <button
            type="submit"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            onClick={() => {
              handleClose();
              setDelete((prevDelete) => !prevDelete);
            }}
          >
            Yes, I'm sure
          </button>
          <button
            data-modal-toggle="deleteModal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            onClick={handleClose}
          >
            No, cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default SureDialog;
