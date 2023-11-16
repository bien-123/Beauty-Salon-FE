const Content = () => {
    const headerTableTitle = ['Tên Dịch Vụ', 'Mô tả', 'Gía Dịch vụ', 'Thời gian thực hiện'];
    return (
        <div className="mt-5">
            <table className="max-w-[1280px] m-auto">
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
                    <tr>
                        <td>Căng da toàn phần</td>
                        <td>
                            Dịch vụ căng da mặt tại Mega Gangnam sẽ giúp cho bạn có làn da tràn đầy sức sống. Các công
                            nghệ căng da mặt bằng chỉ Collagen, Mega Fiber, Hifu… đều là những công nghệ tiên tiến nhất
                            trong lĩnh vực căng da mặt.
                        </td>
                        <td>Từ 24,999 triệu</td>
                        <td>Khoảng 2 tiếng</td>
                    </tr>
                    <tr>
                        <td>Căng da trán</td>
                        <td>
                            Dịch vụ căng da mặt tại Mega Gangnam sẽ giúp cho bạn có làn da tràn đầy sức sống. Các công
                            nghệ căng da mặt bằng chỉ Collagen, Mega Fiber, Hifu… đều là những công nghệ tiên tiến nhất
                            trong lĩnh vực căng da mặt.
                        </td>
                        <td>Từ 20 – 40 triệu</td>
                        <td>Khoảng 2 tiếng</td>
                    </tr>
                    <tr>
                        <td>Căng da vùng cổ</td>
                        <td>
                            Dịch vụ căng da mặt tại Mega Gangnam sẽ giúp cho bạn có làn da tràn đầy sức sống. Các công
                            nghệ căng da mặt bằng chỉ Collagen, Mega Fiber, Hifu… đều là những công nghệ tiên tiến nhất
                            trong lĩnh vực căng da mặt.
                        </td>
                        <td>Khoảng 20 – 40 triệu</td>
                        <td>Khoảng 2 tiếng</td>
                    </tr>
                    <tr>
                        <td>Căng da vùng thái dương</td>
                        <td>
                            Dịch vụ căng da mặt tại Mega Gangnam sẽ giúp cho bạn có làn da tràn đầy sức sống. Các công
                            nghệ căng da mặt bằng chỉ Collagen, Mega Fiber, Hifu… đều là những công nghệ tiên tiến nhất
                            trong lĩnh vực căng da mặt.
                        </td>
                        <td>Khoảng 20 – 30 triệu</td>
                        <td>Khoảng 2 tiếng</td>
                    </tr>
                    <tr>
                        <td>Căng da mặt bán phần</td>
                        <td>
                            Dịch vụ căng da mặt tại Mega Gangnam sẽ giúp cho bạn có làn da tràn đầy sức sống. Các công
                            nghệ căng da mặt bằng chỉ Collagen, Mega Fiber, Hifu… đều là những công nghệ tiên tiến nhất
                            trong lĩnh vực căng da mặt.
                        </td>
                        <td>Khoảng 20 – 40 triệu</td>
                        <td>Khoảng 2 tiếng</td>
                    </tr>
                    <tr>
                        <td>Nâng cơ mặt căng da, nâng mũi</td>
                        <td>
                            Dịch vụ căng da mặt tại Mega Gangnam sẽ giúp cho bạn có làn da tràn đầy sức sống. Các công
                            nghệ căng da mặt bằng chỉ Collagen, Mega Fiber, Hifu… đều là những công nghệ tiên tiến nhất
                            trong lĩnh vực căng da mặt.
                        </td>
                        <td>Từ 19,999 triệu</td>
                        <td>Khoảng 2 tiếng</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Content;
