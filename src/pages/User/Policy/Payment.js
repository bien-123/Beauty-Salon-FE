import Header from '../../../layouts/component/Header/HeaderLayout';
import FormInput from '../../../layouts/component/FormInput';
import Footer from '../../../layouts/component/FooterLayout';
import logo from '../../../assets/logo/index';
import { toaster } from 'evergreen-ui';
const Payment = () => {
    const buttonCopyMBbank = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('88165987565642329');
        toaster.success('Copy thành công!');
    };
    return (
        <>
            <Header />
            <div className="w-[1050px] m-auto flex flex-col items-start justify-start py-8 gap-2  text-start">
                <div className="text-2xl text-[#02a7aa] font-bold mb-2">
                    Chính sách thanh toán tại Viện Thẩm Mỹ Beauty
                </div>
                <div className="text-base">
                    Viện Thẩm Mỹ Beauty thực hiện việc thanh toán theo phương thức tiền mặt hoặc chuyển khoản.
                </div>

                <div className="font-bold text-xl">1. Phương thức thanh toán trả tiền mặt trực tiếp</div>
                <div className="text-base">
                    Phương thức thanh toán bằng tiền mặt áp dụng trong trường hợp khách hàng hoàn thành việc thanh toán
                    khi sử dụng các dịch vụ tại viện thẩm mỹ Beauty và thanh toán bằng tiền mặt trực tiếp tại địa chỉ
                    của bệnh viện.
                </div>
                <div className="font-bold text-xl">2. Phương thức thanh toán chuyển khoản ngân hàng</div>
                <div className="text-base ">
                    Phương thức thanh toán bằng chuyển khoản khi khách hàng ở xa, quý khách hàng không muốn thanh toán
                    trực tiếp bằng tiền mặt thì khách hàng có nhu cầu sử dụng phương thức thanh toán này.
                </div>
                <div className="flex w-[550px] m-auto">
                    <div className="flex border-2 border-solid border-[#01babd] p-2">
                        <img src={logo.LogoMBBank} alt="Logo MB" className="w-full" />
                    </div>
                    <div className="flex border-2 border-solid border-[#01babd] p-2">
                        <div className="text-base flex flex-col">
                            <div className="flex gap-2">
                                <strong>Số tài khoản: </strong>88165987565642329
                            </div>
                            <div className="flex gap-2">
                                <strong>Chủ tài khoản: </strong>Công ty CP Beauty Việt Nam
                            </div>
                            <div>
                                <strong>MB-BANK NGÂN HÀNG QUÂN ĐỘI</strong> chi nhánh Xuân Mai, Thị Trấn Xuân Mai, Huyện
                                Chương Mỹ, Thành Phố Hà Nội
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={buttonCopyMBbank}
                    className="bg-[#0068FF] text-center text-[#fff] px-[10px] py-[13px] rounded-md m-auto text-sm font-medium"
                >
                    Sao chép thông tin TK MBBank
                </button>
                <div className="font-bold text-xl">Thông tin liên hệ:</div>
                <ul>
                    <li className="list-disc ml-9 mt-2 text-base">
                        Địa chỉ: Thị Trấn Xuân Mai, Huyên Chương Mỹ, Thành Phố Hà Nội
                    </li>
                    <li className="list-disc ml-9 mt-2 text-base">SĐT: 093.951.8888</li>
                    <li className="list-disc ml-9 mt-2 text-base">Website: vienthammyBeauty.vn</li>
                </ul>
            </div>
            <FormInput />
            <Footer />
        </>
    );
};

export default Payment;
