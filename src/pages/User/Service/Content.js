import { useState } from 'react';
import ServicesServer from '../../../services/services';
import { useEffect } from 'react';

const Content = () => {
    const headerTableTitle = ['Tên Dịch Vụ', 'Mô tả', 'Gía Dịch vụ', 'Thời gian thực hiện'];
    const [duLieu, setDuLieu] = useState([]);
    const [success, setSuccess] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = await ServicesServer.getServices();
                if (service) {
                    setDuLieu(service?.data);
                    setSuccess(true);
                }
            } catch (err) {
                setSuccess(false);
                console.log(err);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="mt-5">
            <table className="max-w-[1280px] m-auto">
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
                            {duLieu.map((item, index) => (
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
