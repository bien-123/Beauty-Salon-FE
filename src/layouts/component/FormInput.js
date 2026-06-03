import { useEffect, useState } from 'react';
import { Form, Select, Button } from 'antd';

import { isValidPhoneNumber } from '../../constans/shared';
import AppoimentServer from '../../services/appoiment';
import { toaster } from 'evergreen-ui';
import ServicesServer from '../../services/services';
import SendTelegram from '../../services/send_telegram';

const FormInput = () => {
    const [addAppoiment, setAddAppoiment] = useState({
        tenKH: '',
        sdt: '',
        tinhTrangHienTai: '',
        ngayHen: '',
        gioHen: '',
        name: '',
        status: 'Chưa xác nhận',
    });
    const { Option } = Select;
    const [dataService, setDataService] = useState([]);
    const [form] = Form.useForm();

    const resetForm = () => {
        setAddAppoiment({
            tenKH: '',
            sdt: '',
            tinhTrangHienTai: '',
            ngayHen: '',
            name: '',
            gioHen: '',
        });
    };

    const handleChangeOrder = (key, value) => {
        setAddAppoiment((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleClickSend = async (e) => {
        e.preventDefault();
        if (!addAppoiment.tenKH) {
            toaster.warning('Vui lòng nhập họ tên!');
        } else if (!addAppoiment.sdt) {
            toaster.warning('Vui lòng nhập số điện thoại!');
        } else if (!isValidPhoneNumber(addAppoiment.sdt)) {
            toaster.warning('Vui lòng nhập đúng định dạng số điện thoại!');
        } else if (!addAppoiment.ngayHen) {
            toaster.warning('Vui lòng nhập ngày hẹn!');
        } else if (!addAppoiment.gioHen) {
            toaster.warning('Vui lòng nhập giờ hẹn!');
        } else {
            try {
                const res = await AppoimentServer.addAppoiment({ ...addAppoiment });
                if (res) {
                    // format message telegram
                    const message = `📌 <b>ĐĂNG KÝ TƯ VẤN MỚI:</b>
👤 <b>Họ tên:</b> ${addAppoiment.tenKH}
📞 <b>SĐT:</b> ${addAppoiment.sdt}
📅 <b>Ngày hẹn:</b> ${addAppoiment.ngayHen}
⏰ <b>Giờ hẹn:</b> ${addAppoiment.gioHen}
🛠 <b>Dịch vụ:</b>
${Array.isArray(addAppoiment.name) ? addAppoiment.name.join(', ') : addAppoiment.name}
📝 <b>Ghi chú:</b>
${addAppoiment.tinhTrangHienTai || 'Không có'}
`;
                    await SendTelegram.sendTelegram(message);
                    toaster.success('Đặt lịch hẹn thành công!');
                    form.resetFields();
                    resetForm();
                }
            } catch (error) {
                console.error('Error:', error);
                toaster.warning('Đã xảy ra lỗi khi gửi!');
            }
        }
    };

    const getServices = async () => {
        try {
            const res = await ServicesServer.getServices();
            if (res?.data) {
                setDataService(res?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    return (
        <div className="">
            <div className="flex justify-center mt-4">
                <div className="bg-[#f2f2f2] p-5 rounded-md max-w-[700px] m-7 w-full">
                    <div className="text-[#01babd] font-bold text-xl text-center mb-4">ĐĂNG KÝ NHẬN TƯ VẤN</div>

                    {/* Dùng duy nhất 1 thẻ Form của Ant Design quản lý toàn bộ */}
                    <Form name="appointment_form" form={form} onFinish={handleClickSend} layout="vertical">
                        <div className="flex flex-wrap md:flex-nowrap gap-4">
                            <div className="w-full">
                                <div className="flex flex-col text-start mb-2">
                                    <label className="mb-2 font-bold">Họ và tên (*):</label>
                                    <input
                                        type="text"
                                        value={addAppoiment?.tenKH}
                                        onChange={(e) => handleChangeOrder('tenKH', e.target.value)}
                                        placeholder="Ví dụ: Trần Thị Thoa"
                                        className="w-full p-3 rounded-md h-[44px] border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col text-start mb-2">
                                    <label className="mb-2 font-bold">Số điện thoại (*):</label>
                                    <input
                                        type="number"
                                        value={addAppoiment?.sdt}
                                        onChange={(e) => handleChangeOrder('sdt', e.target.value)}
                                        placeholder="Ví dụ: 0987654321"
                                        className="w-full p-3 rounded-md h-[44px] border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col text-start mb-2">
                                    <label className="mb-2 font-bold">Ngày hẹn (*):</label>
                                    <input
                                        type="date"
                                        value={addAppoiment?.ngayHen}
                                        onChange={(e) => handleChangeOrder('ngayHen', e.target.value)}
                                        className="w-full p-3 rounded-md h-[44px] border border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col text-start mb-2">
                                    <label className="mb-2 font-bold">Giờ hẹn (từ 08:00 đến 17:30) (*):</label>
                                    <input
                                        type="time"
                                        value={addAppoiment?.gioHen}
                                        step="2"
                                        onChange={(e) => handleChangeOrder('gioHen', e.target.value)}
                                        className="w-full p-3 rounded-md h-[44px] border border-gray-300"
                                    />
                                </div>

                                {/* Ô chọn Dịch vụ đặt gọn gàng bên trong */}
                                <Form.Item
                                    name="tenDV"
                                    label={<span className="font-bold text-black text-base">Tên dịch vụ (*)</span>}
                                    className="mb-2"
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Chọn tên dịch vụ"
                                        onChange={(value) =>
                                            setAddAppoiment((prevState) => ({ ...prevState, name: value }))
                                        }
                                        value={addAppoiment?.name}
                                        className="w-full min-h-[44px]"
                                    >
                                        {dataService?.map((service) => (
                                            <Option key={service._id} value={service.name}>
                                                {service.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        {/* Ô nhập ghi chú */}
                        <div className="flex flex-col text-start mt-2">
                            <label className="mb-2 font-bold">Ghi chú:</label>
                            <textarea
                                value={addAppoiment?.tinhTrangHienTai}
                                onChange={(e) => handleChangeOrder('tinhTrangHienTai', e.target.value)}
                                placeholder="Bạn có thể nhập tình trạng hiện tại của bạn hoặc thông tin bác sĩ muốn chỉ định"
                                className="w-full p-3 rounded-md h-[100px] border border-gray-300"
                            />
                        </div>

                        <div className="text-[10px] text-[red] italic mt-2">
                            Những trường có dấu (*) là trường bắt buộc
                        </div>

                        {/* Dùng component Button Antd để kích hoạt sự kiện onFinish của Form */}
                        <Button
                            type="primary"
                            htmlType="submit" // htmlType="submit" sẽ tự kích hoạt hàm handleClickSend
                            className="bg-[#01babd] w-full p-6 rounded-md text-[#fff] text-base font-bold mt-4 flex items-center justify-center border-none hover:opacity-90"
                        >
                            ĐĂNG KÝ NGAY
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default FormInput;
