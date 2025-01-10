"use client";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, Zoom } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        hideProgressBar={true}
        theme="dark"
        transition={Zoom}
        position="top-center"
      />
    </>
  );
}
