import { useState } from 'react';
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { toaster } from 'evergreen-ui';

import StaffServer from '../../../services/staff';

const ModalChangePassword = ({ open, handleClose, maNV }) => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showXTPassword, setShowXTPassword] = useState(false);

    const [formData, setFormData] = useState({
        maNV: maNV,
        oldPassword: '',
        newPassword: '',
    });

    const handleShowOldPassword = () => {
        setShowOldPassword((prePS) => !prePS);
    };
    const handleShowNewPassword = () => {
        setShowNewPassword((prePS) => !prePS);
    };
    const handleShowXacThucPassword = () => {
        setShowXTPassword((prePS) => !prePS);
    };

    const handleFormChange = (key, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const [XTPassword, setXTPassword] = useState('');
    const handleXTPasswordChange = (e) => {
        setXTPassword(e.target.value);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword } = formData;
        if (!oldPassword) {
            toaster.warning('Vui lòng nhập mật khẩu cũ');
        } else if (!newPassword) {
            toaster.warning('Vui lòng nhập mật khẩu mới!');
        } else if (!XTPassword) {
            toaster.warning('Vui lòng nhập xác thực lại mật khẩu!');
        } else if (newPassword !== XTPassword) {
            toaster.warning('Mật khẩu mới và mật khẩu xác thực không giống nhau!');
        } else {
            try {
                const res = await StaffServer.updateAccount(maNV, formData);
                if (res) {
                    toaster.success('Cập nhật dữ liệu thành công');
                    // setFormType({ ...formType, open: false })
                }
            } catch (err) {
                console.log('Error:', err);
            }
        }
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className="!text-[#01babd] !font-bold">ĐỔI MẬT KHẨU</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="flex flex-col items-start mb-2">
                            <label className="mb-2">Mã nhân viên:</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="border-2 border-solid border-[#01babd] w-full p-2 rounded-lg"
                                value={maNV}
                                disabled={true}
                            />
                        </div>
                        <div className="flex flex-col items-start relative">
                            <label className="mb-2">Mật khẩu cũ:</label>
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                className="border-2 border-solid border-[#01babd] w-full p-2 rounded-lg"
                                placeholder="Enter your password"
                                onChange={(e) => handleFormChange('oldPassword', e.target.value)}
                            />
                            <span onClick={handleShowOldPassword} className="absolute right-2 bottom-[10px]">
                                <i className={showOldPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>
                        </div>
                        <div className="flex flex-col items-start relative">
                            <label className="mb-2">Mật khẩu mới:</label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                className="border-2 border-solid border-[#01babd] w-full p-2 rounded-lg"
                                placeholder="Enter your password"
                                onChange={(e) => handleFormChange('newPassword', e.target.value)}
                            />
                            <span onClick={handleShowNewPassword} className="absolute right-2 bottom-[10px]">
                                <i className={showNewPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>
                        </div>
                        <div className="flex flex-col items-start relative">
                            <label className="mb-2">Xác thực lại mật khẩu:</label>
                            <input
                                type={showXTPassword ? 'text' : 'password'}
                                className="border-2 border-solid border-[#01babd] w-full p-2 rounded-lg"
                                placeholder="Enter your password"
                                onChange={(e) => handleXTPasswordChange(e)}
                            />
                            <span onClick={handleShowXacThucPassword} className="absolute right-2 bottom-[10px]">
                                <i className={showXTPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-between">
                    <Button onClick={handleClose} appearance="subtle" className="!bg-[#FC553D] !text-white !w-16">
                        HỦY
                    </Button>
                    <Button onClick={handleSubmitForm} appearance="primary" className="!w-16">
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalChangePassword;
