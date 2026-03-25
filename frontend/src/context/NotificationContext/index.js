import React, { createContext, useContext } from 'react';
import Swal from 'sweetalert2';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  
  // 1. Configuration para sa MALIIT (Toast)
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const notify = {
    // --- MALIIT (Toast) ---
    // Gamitin ito para sa "Success", "Update", o "Delete" feedback
    toast: (icon, title) => {
      Toast.fire({
        icon: icon || 'success',
        title: title || 'Action Successful'
      });
    },

    // --- MALAKI (Modal / Oops) ---
    // Gamitin ito sa Login Errors o Server Errors
    alertMsg: (msg, footerText, icon, title) => {
      Swal.fire({
        icon: icon,
        title: title || "Oops...",
        text: msg || "Something went wrong!",
        footer: footerText || "Please try again or contact support."
      });
    },

    // --- CONFIRMATION ---
    confirm: async (title, text) => {
      return Swal.fire({
        title: title || 'Sigurado ka ba?',
        text: text || "Hindi na ito mababawi!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceed!'
      });
    }
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);