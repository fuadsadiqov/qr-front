import { Box, Modal } from "@mui/material";
import QRCode from "react-qr-code";
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import html2canvas from 'html2canvas';
import { QRModalInterface } from "../interfaces/method";
import { Button } from "@mui/material";

interface QRModalProps {
  open: QRModalInterface;
  onClose: () => void;
}
const style = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 340,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};

function QRModal({ open, onClose }: QRModalProps) {
  const qrCodeRef = useRef(null);

  const downloadAsImage = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current)
        .then((canvas) => {
          const image = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = image;
          downloadLink.download = 'qrCode.png';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        });
    }
  }
  return (
    <Modal
      open={open.open}
      onClose={onClose}
    >
      <Box sx={style}>
        <div className="flex justify-end w-full">
          <IoMdClose onClick={onClose} className="text-4xl -translate-y-3 cursor-pointer" />
        </div>
        <div className="mb-5" ref={qrCodeRef}>
          {open.value && <QRCode size={200} value={open.value} />}
        </div>
        <Button onClick={downloadAsImage} fullWidth variant="contained">Save as image</Button>
      </Box>
    </Modal>
  );
}

export default QRModal;
