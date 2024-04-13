import React, { useState, useEffect, useCallback } from 'react';
import ServicesServer from '../../../services/services';
import logo from '../../../assets/logo/index';
import { formatNumber } from '../../../constans/shared';
import Pagination from '../Pagiantion';

const Content = () => {
    const headerTableTitle = ['Mã Dịch Vụ', 'Tên Dịch Vụ', 'Mô tả', 'Giá Dịch vụ', 'Thời gian'];
    const [search, setSearch] = useState('');
    const [success, setSuccess] = useState(true);
    const [duLieu, setDuLieu] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 3;
    const fetchData = useCallback(
        async (page) => {
            try {
                const res = await ServicesServer.searchPagination(`?q=${search}&page=${page}&pageSize=${pageSize}`);
                if (res) {
                    setDuLieu(res.results);
                    setTotalPages(res.totalPages);
                    setSuccess(true);
                }
            } catch (error) {
                setSuccess(false);
                console.log(error);
            }
        },
        [search, pageSize],
    );

    const handleSearch = () => {
        fetchData(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchData(page);
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

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
                                    <td>{item?.maDV}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.description}</td>
                                    <td>{formatNumber(Number(item.price))} VNĐ</td>
                                    <td>{item?.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-2 py-5">
                        <img src={logo.LogoEmpty} alt="Logo" className="w-[200px]" />
                        <div className="font-bold text-2xl">Chưa có dịch vụ nào</div>
                    </div>
                )}
            </table>
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            )}
        </div>
    );
};

export default Content;
