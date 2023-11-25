// Trong một module riêng (ví dụ: auth.js)
export const isAuthenticated = () => {
    const storedUserDataJSON = localStorage.getItem('userData');
    return !!storedUserDataJSON;
};

export const getDataLocalStorage = () => {
    const storedUserDataJSON = localStorage.getItem('userData');
    // Chuyển chuỗi JSON thành đối tượng JavaScript
    const storedUserData = JSON.parse(storedUserDataJSON);
    return storedUserData;
};

export const removeLocalStorage = () => {
    const removeData = localStorage.removeItem('userData');
    return removeData;
};
