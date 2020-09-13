import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const SweetAlert = withReactContent(Swal);

export const SweetError = (props) => {
  return SweetAlert.fire({
    title: props.title || 'Error!',
    text: props.text || 'There was an error with the request.',
    icon: 'error',
    confirmButtonText: props.confirmButtonText || 'Close',
    footer: 'SPG',
    confirmButtonColor: '#65524D',
  });
};

export const SweetSuccess = (props = {}) => {
  return SweetAlert.fire({
    title: props.title || 'Perfect!',
    text: props.text || 'The request was successful.',
    icon: 'success',
    confirmButtonText: props.confirmButtonText || 'Close',
    footer: 'SPG',
    confirmButtonColor: '#65524D',
  });
};

export const SweetInputWarning = (props = {}) => {
  return SweetAlert.fire({
    title: props.title || 'Invalid!',
    text: props.text || 'Fill out the form properly.',
    icon: 'warning',
    confirmButtonText: props.confirmButtonText || 'Close',
    footer: 'SPG',
    confirmButtonColor: '#65524D',
  });
};

export const SweetConfirm = (props = {}) => {
  return SweetAlert.fire({
    title: props.title || 'Are you sure?',
    text: props.text || 'You will not be able to undo this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#65524D',
    cancelButtonColor: '#d33',
    confirmButtonText: props.okButtonText || 'Delete',
    reverseButtons: true,
  });
};
