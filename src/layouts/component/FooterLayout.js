import IconFB from '../../assets/icons/icon-fb.png';
import IconPhone from '../../assets/icons/icon-phone-1.png';
import IconTikTok from '../../assets/icons/icon-tt.png';
import LogoMain from '../../assets/logo/logo_main.jpg';
const Footer = () => {
    return (
        <>
            <hr />
            <div className="flex w-[1280px] m-auto gap-3 grid !grid-cols-3 py-6">
                <div className="flex flex-col items-center justify-center">
                    <a href="/">
                        <img src={LogoMain} alt="Logo Main" className="w-[100px] h-[100px] rounded-[50px]" />
                    </a>
                    <div className="flex gap-2 border-2 border-solid border-[#01babd] w-[150px] rounded-[50px] !my-4">
                        <div className="flex px-3 py-2">
                            <img src={IconPhone} alt="Icon Phone" />
                            <div className="px-2 text-[#000] font-bold">098.765.4321</div>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <a href="tel:0987654321">
                            <img src={IconFB} alt="Icon FB" />
                        </a>
                        <a href="/">
                            <img src={IconTikTok} alt="Icon Tiktok" />
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <a href="/" className="text-[#000] font-bold">
                            Chính sách bảo mật
                        </a>
                        |
                        <a href="/" className="text-[#000] font-bold">
                            Chính sách thanh toán
                        </a>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#01babd] font-bold text-[18px]">VIỆN THẨM MỸ BEAUTY</span>
                    {/* <span className="text-[#000] font-medium pt-1">
                    Địa chỉ: Hồ Chí Minh: Tòa nhà 383 Điện Biên Phủ, P4, Q.3
                </span> */}
                    <span className="text-[#000] font-medium pt-1">
                        Hà Nội: Trường Đại học Lâm nghiệp Việt Nam, TT.Xuân Mai, Huyện Chương Mỹ
                    </span>
                    <span className="text-[#000] font-medium pt-1">
                        Tổng đài: 1800 6221 - 0936 20 6868 - 0939 51 8888
                    </span>
                    <span className="text-[#000] font-medium pt-1">Hotline: 0933 17 8686</span>
                    <span className="text-[#000] font-medium pt-1">CSKH: 0901 35 1168 </span>
                    <span className="text-[#000] font-medium pt-1">Giờ mở cửa: 8:30 – 20:00</span>
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
        </>
    );
};

export default Footer;
