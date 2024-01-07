import { useEffect, useState } from 'react';
import { Form, Select } from 'antd';

import { isValidPhoneNumber } from '../../constans/shared';
import AppoimentServer from '../../services/appoiment';
import { toaster } from 'evergreen-ui';
import ServicesServer from '../../services/services';

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
            const res = await ServicesServer.getBill();
            if (res?.data?.arr) {
                setDataService(res.data.arr);
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
                <div className="bg-[#f2f2f2] p-5 rounded-md max-w-[700px] m-7">
                    <div className="text-[#01babd] font-bold text-xl text-center">ĐĂNG KÝ NHẬN TƯ VẤN</div>
                    <form action="">
                        <div className="flex flex-wrap gap-2">
                            <div className="w-full">
                                <div className="flex flex-col text-start">
                                    <label htmlFor="fname" className="mb-2 font-bold">
                                        Họ và tên (*):
                                    </label>
                                    <input
                                        type="text"
                                        value={addAppoiment?.tenKH}
                                        onChange={(e) => handleChangeOrder('tenKH', e.target.value)}
                                        placeholder="Ví dụ: Trần Thị Thoa"
                                        className="w-full p-3 rounded-md mb-2 h-[44px]"
                                    />
                                </div>
                                <div className="flex flex-col text-start">
                                    <label htmlFor="fphone" className="mb-2 font-bold">
                                        Số điện thoại (*):
                                    </label>
                                    <input
                                        type="number"
                                        value={addAppoiment?.sdt}
                                        onChange={(e) => handleChangeOrder('sdt', e.target.value)}
                                        placeholder="Ví dụ: 0987654321"
                                        className="w-full p-3 rounded-md mb-2 h-[44px]"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex flex-col text-start">
                                    <label htmlFor="fdate" className="mb-2 font-bold">
                                        Ngày hẹn (*):
                                    </label>
                                    <input
                                        type="date"
                                        value={addAppoiment?.ngayHen}
                                        onChange={(e) => handleChangeOrder('ngayHen', e.target.value)}
                                        className="w-full p-3 rounded-md mb-2 border-none h-[44px]"
                                    />
                                </div>
                                <div className="flex flex-col text-start">
                                    <label htmlFor="ftime" className="mb-2 font-bold">
                                        Giờ hẹn (từ 08:00 đến 17:30) (*):
                                    </label>
                                    <input
                                        type="time"
                                        value={addAppoiment?.gioHen}
                                        step="2"
                                        onChange={(e) => handleChangeOrder('gioHen', e.target.value)}
                                        className="w-full p-3 rounded-md mb-2 border-none h-[44px]"
                                    />
                                </div>

                                <Form name="wrap" form={form} onFinish={handleClickSend}>
                                    <div className="grid pt-15">
                                        <Form.Item
                                            name="tenDV"
                                            label="Tên dịch vụ (*)"
                                            labelCol={{ span: 24 }}
                                            className="font-bold"
                                        >
                                            <Select
                                                mode="multiple"
                                                placeholder="Chọn tên dịch vụ"
                                                onChange={(value) =>
                                                    setAddAppoiment((prevState) => ({ ...prevState, name: value }))
                                                }
                                                value={addAppoiment.name}
                                                className="min-h-[44px]"
                                            >
                                                {dataService.map((service) => (
                                                    <Option key={service._id} value={service.name}>
                                                        {service.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="flex flex-col text-start">
                            <label htmlFor="fstatus" className="mb-2 font-bold">
                                Ghi chú:
                            </label>
                            <textarea
                                type="text"
                                value={addAppoiment?.tinhTrangHienTai}
                                onChange={(e) => handleChangeOrder('tinhTrangHienTai', e.target.value)}
                                placeholder="Bạn có thể nhập tình trạng hiện tại của bạn hoặc thông tin bác sĩ muốn chỉ định"
                                className="w-full p-3 rounded-md mb-2 border-none h-[100px]"
                            />
                        </div>
                        <div className="text-[10px] text-[red] italic">Những trường có dấu (*) là trường bắt buộc</div>

                        <input
                            type="submit"
                            value="ĐĂNG KÝ NGAY"
                            className="bg-[#01babd] w-full p-3 rounded-md text-[#fff] text-base font-bold mt-2 btn-register"
                            onClick={(e) => handleClickSend(e)}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormInput;
