const FormInput = () => {
    return (
        <div className="flex justify-center mt-4">
            <div className="bg-[#f2f2f2] p-5 rounded-md w-[350px]">
                <div className="text-[#01babd] font-bold text-xl text-center">ĐĂNG KÝ NHẬN TƯ VẤN</div>
                <form action="">
                    <div className="flex flex-col text-start">
                        <label htmlFor="fname" className="mb-2 font-bold">
                            Họ và tên:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ví dụ: Trần Thị Thoa"
                            className="w-full p-3 rounded-md mb-2"
                        />
                    </div>
                    <div className="flex flex-col text-start">
                        <label htmlFor="fphone" className="mb-2 font-bold">
                            Số điện thoại:
                        </label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Ví dụ: 0987654321"
                            className="w-full p-3 rounded-md mb-2"
                        />
                    </div>
                    <div className="flex flex-col text-start">
                        <label htmlFor="faddress" className="mb-2 font-bold">
                            Địa chỉ:
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Ví dụ: Số 243A, Đê La Thành, Đống Đa, Hà Nội"
                            className="w-full p-3 rounded-md mb-2 border-none"
                        />
                    </div>
                    <div className="flex flex-col text-start">
                        <label htmlFor="fstatus" className="mb-2 font-bold">
                            Tình trạng hiện tại:
                        </label>
                        <textarea
                            type="text"
                            id="status"
                            name="status"
                            placeholder="Ví dụ: Da mặt bị thâm, nám hoặc tàn nhang"
                            className="w-full p-3 rounded-md mb-2 border-none"
                        />
                    </div>

                    <input
                        type="submit"
                        value="ĐĂNG KÝ NGAY"
                        className="bg-[#01babd] w-full p-3 rounded-md text-[#fff] text-base font-bold mt-2 btn-register"
                    />
                </form>
            </div>
        </div>
    );
};

export default FormInput;
