import { useState } from 'react';
import AppoimentServer from '../../services/appoiment';
import { toaster } from 'evergreen-ui';

const FormInput = () => {
    const [addAppoiment, setAddAppoiment] = useState({
        tenKH: '',
        sdt: '',
        tinhTrangHienTai: '',
        ngayHen: '',
        gioHen: '',
        status: 'Chưa xác nhận',
    });
    const utcDateTime = '2023-11-16T15:55:41.206+00:00';
    const localDateTime = new Date(utcDateTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    // console.log(localDateTime.split(' ').splice(0, 1).join(''));

    const resetForm = () => {
        setAddAppoiment({
            tenKH: '',
            sdt: '',
            tinhTrangHienTai: '',
            ngayHen: '',
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
        } else if (!addAppoiment.ngayHen) {
            toaster.warning('Vui lòng nhập ngày hẹn!');
        } else if (!addAppoiment.gioHen) {
            toaster.warning('Vui lòng nhập giờ hẹn!');
        } else {
            try {
                const res = await AppoimentServer.addAppoiment({ ...addAppoiment });
                if (res) {
                    toaster.success('Đặt lịch hẹn thành công!');
                    resetForm();
                }
            } catch (error) {
                console.error('Error:', error);
                toaster.warning('Đã xảy ra lỗi khi gửi!');
            }
        }
    };

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
                            </div>
                        </div>
                        <div className="flex flex-col text-start">
                            <label htmlFor="fstatus" className="mb-2 font-bold">
                                Tình trạng hiện tại:
                            </label>
                            <textarea
                                type="text"
                                value={addAppoiment?.tinhTrangHienTai}
                                onChange={(e) => handleChangeOrder('tinhTrangHienTai', e.target.value)}
                                placeholder="Ví dụ: Da mặt bị thâm, nám hoặc tàn nhang"
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
