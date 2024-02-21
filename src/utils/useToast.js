import { useState } from 'react';

const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        const newToast = { id, message, type, duration };
        setToasts(prevToasts => [...prevToasts, newToast]);

        setTimeout(() => {
            hideToast(id);
        }, duration);
    };

    const hideToast = id => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };

    return { toasts, showToast };
};

export default useToast;
