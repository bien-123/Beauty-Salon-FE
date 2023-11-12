import Header from '../../../layouts/component/Header/HeaderLayout';
import FormInput from '../../../layouts/component/FormInput';
import Footer from '../../../layouts/component/FooterLayout';
const Privacy = () => {
    return (
        <>
            <Header />
            <div className="w-[1050px] m-auto flex flex-col items-start justify-start py-8 gap-2 text-start">
                <div className="hr-underline">
                    <div className="text-2xl text-[#02a7aa] font-bold mb-2">Chính sách bảo vệ thông tin cá nhân</div>
                </div>
                <div className="bg-[#01babd66] p-[15px] text-base mb-2 text-start">
                    Chúng tôi có thể yêu cầu thông tin cá nhân của bạn để xử lý yêu cầu, trao đổi thông tin hoặc cung
                    cấp thông tin người tiêu dùng thông qua thư điện tử. Chúng tôi có thể bổ sung thông tin này trong cơ
                    sở dữ liệu để cung cấp dịch vụ tốt hơn.
                </div>
                <div className="font-bold text-xl">1. Mục đích thu thập thông tin người tiêu dùng</div>
                <divc className="text-base">
                    Mục đích của việc thu thập thông tin người tiêu dùng nhằm liên quan đến các vấn đề như:
                </divc>
                <ul>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Hỗ trợ khách hàng: tư vấn các dịch vụ của chúng tôi.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Cung cấp thông tin các dịch vụ và hỗ trợ theo yêu cầu của khách hàng.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Gửi thông báo các chương trình, dịch vụ mới nhất của chúng tôi.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">Giải quyết vấn đề phát sinh khi sử dụng dịch vụ.</li>
                    <li className="list-disc ml-9 gap-2 text-base">Ngăn chặn các hoạt động phạm pháp.</li>
                    <li className="list-disc ml-9 gap-2 text-base">Đo lường và cải thiện các dịch vụ.</li>
                </ul>
                <div className="text-base">
                    Khách hàng sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới thông tin
                    mà mình cung cấp và hộp thư điện tử của mình. Ngoài ra, khách hàng có trách nhiệm thông báo kịp thời
                    về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật để có biện pháp giải quyết phù hợp.
                </div>
                <div className="font-bold text-xl">2. Phạm vi thu thập thông tin</div>
                <div className="text-base">Chúng tôi thu thập thông tin cá nhân của khách hàng khi:</div>
                <ul>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Khách hàng trực tiếp cung cấp: Các thông tin bao gồm: Họ tên, địa chỉ email, số điện thoại, địa
                        chỉ, dịch vụ cần tư vấn.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Khách hàng tương tác với chúng tôi: Chúng tôi thu thập một số thông tin khi khách hàng tương tác
                        trên website: https://vienthammybeauty .vn/
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Từ những nguồn hợp pháp khác: Chúng tôi thu thập thông tin khách hàng từ các nguồn hợp pháp
                        khác.
                    </li>
                </ul>
                <div className="text-base">
                    Đây là các thông tin bắt buộc cần khách hàng cung cấp để chúng tôi liên hệ xác nhận lại nhằm đảm bảo
                    quyền lợi cho người tiêu dùng.
                </div>
                <div className="font-bold text-xl">3. Thời gian lưu trữ thông tin</div>
                <div className="text-base">
                    Công ty cổ phần Beauty Việt Nam sẽ lưu trữ các thông tin cá nhân do khách hàng cung cấp trên các hệ
                    thống nội bộ trong quá trình sử dụng dịch vụ hoặc khi khách hàng có yêu cầu hủy thông tin đã cấp.
                </div>
                <div className="text-base">
                    Mọi thông tin cá nhân của khách hàng sẽ được bảo mật trên máy chủ của Công ty cổ phần Beauty Việt
                    Nam.
                </div>
                <div className="font-bold text-xl">4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</div>
                <div className="text-base">Công ty cổ phần Beauty Việt Nam</div>
                <ul>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Địa chỉ: TP. Hà Nội: Thị Trấn Xuân Mai, Huyện Chương Mỹ
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">Email: info@vienthammybeauty .vn</li>
                    <li className="list-disc ml-9 gap-2 text-base">Điện thoại: 0901 351168</li>
                </ul>
                <div className="font-bold text-xl">
                    5. Những người hoặc tổ chức có thể được tiếp cận với thông tin đó
                </div>
                <ul>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình
                        bằng cách liên hệ với ban quản trị công ty thực hiện việc này.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Khách hàng có quyền gửi khiếu nại về việc bị lộ thông tin cá nhân đến Ban quản trị của công ty.
                        Khi tiếp nhận những phản hồi này, chúng tôi sẽ xác nhận lại thông tin, trường hợp đúng như phản
                        ánh tùy theo mức độ, công ty sẽ có những biện pháp xử lý kịp thời.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Yêu cầu pháp lý: Chúng tôi có thể tiết lộ các thông tin cá nhân nếu luật pháp yêu cầu và việc
                        tiết lộ như vậy là cần thiết một cách hợp lý để tuân thủ các quy trình pháp lý.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Chuyển giao kinh doanh (nếu có): Trong trường hợp sáp nhập, hợp nhất toàn bộ hoặc một phần với
                        công ty khác, người mua sẽ có quyền truy cập thông tin được chúng tôi lưu trữ, duy trì trong đó
                        bao gồm cả thông tin cá nhân.
                    </li>
                    <div className="font-bold text-xl">6. Cam kết bảo mật thông tin cá nhân khách hàng</div>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Thông tin cá nhân của khách hàng được bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân
                        của công ty. Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự
                        đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân
                        của khách hàng khi không có sự cho phép đồng ý từ khách hàng.
                    </li>
                    <li className="list-disc ml-9 gap-2 text-base">
                        Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất dữ liệu cá nhân khách
                        hàng, công ty sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời
                        và thông báo cho khách hàng được biết.
                    </li>
                </ul>
                <div className="text-base">
                    Ban quản trị công ty yêu cầu các cá nhân khi đăng ký nhận tư vấn phải cung cấp đầy đủ thông tin cá
                    nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, điện thoại, …. và chịu trách nhiệm về
                    tính pháp lý của những thông tin trên. Ban quản trị công ty không chịu trách nhiệm, không giải quyết
                    mọi khiếu nại có liên quan đến quyền lợi của khách hàng đó nếu xét thấy tất cả thông tin cá nhân của
                    khách hàng đó cung cấp khi đăng ký ban đầu là không chính xác.
                </div>
                <div className="font-bold text-xl">7. Tiếp nhận giải quyết khiếu nại</div>
                <div className="text-base">
                    Nếu bạn có bất kỳ vướng mắc, khiếu nại nào về chính sách bảo mật và an toàn thông tin người tiêu
                    dùng này hoặc các khía cạnh khác về quyền riêng tư, vui lòng liên hệ với chúng tôi:
                </div>
                <div className="text-base">Công ty cổ phần Beauty Việt Nam</div>
                <div className="font-bold text-base">Địa chỉ:</div>
                <li className="list-disc ml-9 gap-2 text-base">TP. Hà Nội: Thị Trấn Xuân Mai, Huyện Chương Mỹ</li>
            </div>
            <FormInput />
            <Footer />
        </>
    );
};

export default Privacy;
