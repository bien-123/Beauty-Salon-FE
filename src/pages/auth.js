// Trong một module riêng (ví dụ: auth.js)
export const isAuthenticated = () => {
    const storedUserDataJSON = localStorage.getItem('userData');
    return !!storedUserDataJSON;
};
