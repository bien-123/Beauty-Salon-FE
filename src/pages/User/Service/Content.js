import { useState, useEffect } from 'react';
import ServicesServer from '../../../services/services';
import logoEmpty from '../../../assets/logo/index';

const Content = () => {
    const headerTableTitle = ['Tên Dịch Vụ', 'Mô tả', 'Giá Dịch vụ', 'Thời gian'];
    const [search, setSearch] = useState('');
    const [success, setSuccess] = useState(true);
    const [duLieu, setDuLieu] = useState([]);

    const fetchData = async () => {
        try {
            const res = await ServicesServer.searchServices(`?q=${search}`);
            if (res) {
                setDuLieu(res);
                setSuccess(true);
            }
        } catch (error) {
            setSuccess(false);
            console.log(error);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="mt-10">
            <div>
                <input
                    placeholder="Nhập giá trị tìm kiếm (để trống sẽ tìm kiếm tất cả)"
                    className="px-3 py-2 bg-[#f7f7f7] w-[500px]"
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
                <button type="submit" className="p-2 bg-[#FC553D] text-white font-bold" onClick={handleSearch}>
                    Tìm kiếm
                </button>
            </div>
            <table className="max-w-[1280px] m-auto mt-5 w-full bd-table">
                {success ? (
                    <>
                        <thead>
                            <tr>
                                {headerTableTitle.map((item, index) => (
                                    <th key={index} className="bg-[#ff9800] p-[10px] text-[#fff] font-bold">
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {duLieu?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.name}</td>
                                    <td>{item?.description}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <div>
                        <img src={logoEmpty} alt="Logo" className="w-[200px]" />
                        <div className="font-bold text-2xl">Chưa có dịch vụ nào</div>
                    </div>
                )}
            </table>
        </div>
    );
};

export default Content;
