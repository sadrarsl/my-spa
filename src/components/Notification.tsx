
import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface NotificationProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  handleClose: () => void;
}

/**
 * Notification component to display feedback messages.
 * @component
 * @param {NotificationProps} props - The props for the Notification component.
 * @returns {JSX.Element} The rendered Notification component.
 */
const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  severity,
  handleClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
