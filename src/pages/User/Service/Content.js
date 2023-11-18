import { useRef, useState } from 'react';
import ServicesServer from '../../../services/services';
import { useEffect } from 'react';

const Content = () => {
    const headerTableTitle = ['Tên Dịch Vụ', 'Mô tả', 'Giá Dịch vụ', 'Thời gian'];
    const [search, setSearch] = useState('');
    const [success, setSuccess] = useState(true);
    const [duLieu, setDuLieu] = useState([]);
    const typingTimeoutRef = useRef(null);

    const changData = async (e) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setSearch(e.target.value);
        }, 100);

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

    // console.log('aaaaaaaaaaaaaaaaaaaaaaaa', search);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const service = await ServicesServer.getServices();
    //             if (service) {
    //                 setDuLieu(service?.data);
    //                 setSuccess(true);
    //             }
    //         } catch (err) {
    //             setSuccess(false);
    //             console.log(err);
    //         }
    //     };

    //     fetchData();
    // }, []);
    return (
        <div className="mt-10">
            <div>
                <input
                    placeholder="Nhập giá trị tìm kiếm"
                    className="px-3 py-2 bg-[#f7f7f7] w-[500px]"
                    onChange={(e) => changData(e)}
                ></input>
                <button type="submit" className="p-2 bg-[#FC553D] text-white font-bold">
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
                    <div className="font-bold text-2xl">Chưa có dịch vụ nào</div>
                )}
            </table>
        </div>
    );
};

export default Content;
