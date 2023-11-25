import IconPhone from '../../assets/icons/phone-header.png';
import { Link } from 'react-router-dom';
import config from '../../config';
import logo from '../../assets/logo/index';
const Header = () => {
    return (
        <>
            <div className="bg-[#EEEEEE]">
                <div className="flex max-w-[1280px] h-[70px] m-auto justify-between items-center tran_header">
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
                        <div className="ml-4 text-lg font-bold">
                            <div>TỔNG ĐÀI 24/7</div>
                            <a href="tel:0971035861">
                                <div className="text-[#02a7aa] font-bold text-[19px] text-center">097.103.5861</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
