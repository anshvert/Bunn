import toast from 'solid-toast';

export const loginSuccessToast = () => {
    toast.success('Login Succeeded', {
        duration: 3000,
        position: 'top-center',
        unmountDelay: 500,
    })
}