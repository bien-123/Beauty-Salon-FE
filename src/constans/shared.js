export const formatNumber = (num) => {
    return num?.toLocaleString('vi-VN');
};

export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9\d)\d{7}$/; // Regex cho số điện thoại Việt Nam
    return phoneRegex.test(phoneNumber);
};

export const isEmail = (email) => {
    // Biểu thức chính quy để kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
