"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { deleteBlogAction } from "@/actions/deleteBlogAction";
import { toast } from "react-toastify";

type DeleteDialogProps = {
  blogId: string;
  token: string | undefined;
};

export default function DeleteDialog({ blogId, token }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle dialog open state
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle dialog close state
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle delete confirmation
  const handleDelete = async () => {
    setLoading(true);
    const response = await deleteBlogAction({ blogId, token });
    setLoading(false);

    if (response.success) {
      toast.success(response.message || "Blog deleted successfully!");
      setOpen(false);
    } else {
      toast.error(response.error || "Failed to delete blog.");
    }
  };

  return (
    <>
      {/* Delete Button */}
      <IconButton
        aria-label="delete"
        color="error"
        onClick={handleOpen}
        sx={{ position: "absolute", right: 0, bottom: 0 }}
      >
        <DeleteIcon />
      </IconButton>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" my={2}>
          Are you sure you want to delete this blog post?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
