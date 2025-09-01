import Swal from 'sweetalert2';

const customSwal = Swal.mixin({
  customClass: {
    confirmButton: 'bg-[#2a3d85] hover:bg-[#1e2d5f] text-white font-medium py-2 px-4 rounded-md transition-colors',
    cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors mr-2',
    popup: 'rounded-lg shadow-xl',
    title: 'text-[#2a3d85] font-semibold',
  },
  buttonsStyling: false,
});

export const showSuccess = (title: string, text?: string) => {
  return customSwal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonText: 'Aceptar',
  });
};

export const showError = (title: string, text?: string) => {
  return customSwal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'Aceptar',
  });
};

export const showWarning = (title: string, text?: string) => {
  return customSwal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText: 'Aceptar',
  });
};

export const showConfirm = (title: string, text?: string, confirmText?: string, cancelText?: string) => {
  return customSwal.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText || 'Confirmar',
    cancelButtonText: cancelText || 'Cancelar',
  });
};

export const showInfo = (title: string, text?: string) => {
  return customSwal.fire({
    icon: 'info',
    title,
    text,
    confirmButtonText: 'Aceptar',
  });
};

export default customSwal;
