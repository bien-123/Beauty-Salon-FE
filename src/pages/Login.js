import config from '../config/index';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toaster } from 'evergreen-ui';
import StaffServer from '../services/staff';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        maNV: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleShowHidePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChangeLogin = (key, e) => {
        const value = e.target.value;
        switch (key) {
            case 'maNV':
                setLoginForm({ ...loginForm, maNV: value });
                break;
            case 'password':
                setLoginForm({ ...loginForm, password: value });
                break;
            default:
                break;
        }
    };

    const handleClickSend = async () => {
        if (!loginForm.maNV) {
            toaster.warning('Mã nhân viên không được để trống!');
        } else if (!loginForm.password) {
            toaster.warning('Mật khẩu không được để trống!');
        } else {
            const res = await StaffServer.login(loginForm.maNV, loginForm.password);
            if (res && res.success) {
                toaster.success('Đặt sim thành công!');
                // localStorage.setItem('staff', res?.existingStaff);
                const userDataJSON = JSON.stringify(res?.arr);
                localStorage.setItem('userData', userDataJSON);
                console.log(userDataJSON);
                navigate('/admin');
            } else {
                toaster.danger(res?.message || res?.response?.message || 'Đã xảy ra lỗi');
            }
        }
    };

    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="font-semibold text-3xl py-2">LOGIN</div>
                        <div className="flex flex-col items-start mb-2">
                            <label className="mb-2">Mã nhân viên:</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="border-2 border-solid border-[#01babd] w-full p-2 rounded-lg"
                                onChange={(e) => handleChangeLogin('maNV', e)}
                            />
                        </div>
                        <div className="flex flex-col items-start relative">
                            <label className="mb-2">Mật khẩu:</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="border-2 border-solid border-[#01babd] w-full p-2 rounded-lg"
                                placeholder="Enter your password"
                                onChange={(e) => handleChangeLogin('password', e)}
                            />
                            <span onClick={handleShowHidePassword} className="absolute right-2 bottom-[10px]">
                                <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}></div>
                        <div className="col-12">
                            <button className="btn-login" onClick={handleClickSend}>
                                Login
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <span className="forgot-password">Forgot your password?</span>
                            <Link to={config.routes.home}>Trở về trang chủ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
