// import { notification } from 'antd';
// import React from 'react';

// export default function Notification({ message, type }) {
//   return notification[type]({
//     message: message,
//     placement: 'top',
//   });

// }

import Swal from 'sweetalert2';
import React from 'react';

export default function Notification({ message, type }) {
  Swal.fire({
    text: message,
    icon: type, // This can be 'success', 'error', 'warning', 'info', or 'question'
    // toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      container: 'custom-toast' // Apply your custom CSS class here
    }
  });

  return null;
}
