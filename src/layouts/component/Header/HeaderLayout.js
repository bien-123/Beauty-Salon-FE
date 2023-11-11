import DangKyTuVan from '../../../assets/logo/Dang-ky-copy-3.png';
import IconPhone from '../../../assets/icons/phone-header.png';
import ModalHeader from './ModalHeader';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../../config';
import logo from '../../../assets/logo/index';
const Header = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = (value) => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="flex w-[1280px] h-[70px] m-auto justify-between items-center">
                <Link to={config.routes.home}>
                    <img src={logo.LogoMain} alt="Logo Main" className="w-[60px] h-[60px] rounded-[50px]" />
                </Link>
                <Link to={config.routes.introduce} className="text-[#02a7aa] font-bold text-lg">
                    GIỚI THIỆU
                </Link>
                <Link to={config.routes.service} className="text-[#02a7aa] font-bold text-lg">
                    DỊCH VỤ
                </Link>
                <Link to={config.routes.result} className="text-[#02a7aa] font-bold text-lg">
                    KẾT QUẢ
                </Link>
                <Link to={config.routes.contact} className="text-[#02a7aa] font-bold text-lg">
                    LIÊN HỆ
                </Link>
                <div className="flex items-center">
                    <img src={IconPhone} alt="Icon phone" className="w-[20px] h-[35px]"></img>
                    <div className="ml-4">
                        <div>TỔNG ĐÀI 24/7</div>
                        <a href="tel:18006221">
                            <div className="text-[#02a7aa] font-bold text-[19px] text-center">1800 6221</div>
                        </a>
                    </div>
                </div>
                <p onClick={() => handleOpen()}>
                    <img src={DangKyTuVan} alt="Đăng ký tư vấn"></img>
                </p>
            </div>
            {open && <ModalHeader open={open} handleClose={handleClose} />}
        </>
    );
};

export default Header;
