import IconFB from '../../assets/icons/icon-fb.png';
import IconPhone from '../../assets/icons/icon-phone-1.png';
import IconTikTok from '../../assets/icons/icon-tt.png';
import IconZalo from '../../assets/icons/IconZalo.svg';
import IconMess from '../../assets/icons/IconMessenger.svg';
import { Link } from 'react-router-dom';
import config from '../../config';
import logo from '../../assets/logo/index';
import { useState, useEffect } from 'react';

const Footer = () => {
    const [login, setLogin] = useState(false);

    useEffect(() => {
        // Lấy chuỗi JSON từ localStorage dựa vào key 'userData'
        const storedUserDataJSON = localStorage.getItem('userData');

        // Chuyển chuỗi JSON thành đối tượng JavaScript
        const storedUserData = JSON.parse(storedUserDataJSON);

        if (storedUserData) {
            setLogin(true);
        }
    }, []);

    return (
        <>
            <div className="bg-[#F7F7F7]">
                {/* <hr /> */}
                <div className="flex max-w-[1280px] m-auto gap-3 grid !grid-cols-3 py-6">
                    <div className="flex flex-col items-center justify-center">
                        <Link to={config.routes.home}>
                            <img
                                src={logo.LogoMain}
                                alt="Logo Main"
                                className="w-[100px] h-[100px] rounded-[50px] border-2 border-solid border-[#01babd] p-2"
                            />
                        </Link>
                        <div className="flex gap-2 border-2 border-solid border-[#01babd] w-[150px] rounded-[50px] !my-4">
                            <a href="tel:0971035861">
                                <div className="flex px-3 py-2">
                                    <img src={IconPhone} alt="Icon Phone" />
                                    <div className="px-2 text-[#000] font-bold">097.103.5861</div>
                                </div>
                            </a>
                        </div>
                        <div className="flex gap-2 mb-4">
                            <a href="tel:0987654321">
                                <img src={IconFB} alt="Icon FB" />
                            </a>
                            <a href="/">
                                <img src={IconTikTok} alt="Icon Tiktok" />
                            </a>
                        </div>
                        <div className="mb-1">
                            <Link
                                to={login ? config.routes.admin : config.routes.login}
                                className="text-[#000] font-bold"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link to={config.routes.privacy} className="text-[#000] font-bold">
                                Chính sách bảo mật
                            </Link>
                            |
                            <Link to={config.routes.payment} className="text-[#000] font-bold">
                                Chính sách thanh toán
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[#01babd] font-bold text-[18px]">VIỆN THẨM MỸ BEAUTY</span>
                        <span className="text-[#000] font-medium pt-1">
                            Hà Nội: Trường Đại học Lâm nghiệp Việt Nam, TT.Xuân Mai, Huyện Chương Mỹ
                        </span>
                        <span className="text-[#000] font-medium pt-1">Tổng đài: 1800 0000 - 097 103 5861</span>
                        <span className="text-[#000] font-medium pt-1">Hotline: 097 103 5861</span>
                        <span className="text-[#000] font-medium pt-1">CSKH: 097 103 5861 </span>
                        <span className="text-[#000] font-medium pt-1">Giờ mở cửa: 08:30 – 17:30</span>
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3727.027993514735!2d105.57408767499749!3d20.911193391806687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134456c69afbb4d%3A0xaa4e3f4c05b31119!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBMw6JtIG5naGnhu4dwIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699370514377!5m2!1svi!2s"
                            width="100%"
                            height="300"
                            style={{ border: '0' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div>
                <a href="tel:0971035861" class="phone-wrapper" aria-label="Gọi với tư vấn viên">
                    097.103.5861
                </a>
                <div className="fixed bottom-7 right-7">
                    <a href="https://m.me/7003156739766071">
                        <img src={IconMess} alt="Icon Mess" className="w-[50px] h-[50px] mb-2"></img>
                    </a>
                    <a href="https://zalo.me/0971035861">
                        <img src={IconZalo} alt="Icon Zalo" className="w-12 h-12"></img>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Footer;
