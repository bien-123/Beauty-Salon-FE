import { Button, Form, Input, Select } from 'antd'; // Thêm Select từ antd
import TextArea from 'antd/es/input/TextArea';
import { useState, useEffect } from 'react'; // Thêm useEffect
import { toaster } from 'evergreen-ui';
import DepartmentServer from '../../../services/department';
import StaffServer from '../../../services/staff';

const { Option } = Select;

const DepartmentForm = ({ formType, setFormType, updateData, fetchData }) => {
    // Lưu danh sách toàn bộ nhân viên lấy từ hệ thống về để chọn
    const [staffList, setStaffList] = useState([]);

    const [formData, setFormData] = useState({
        departmentCode: updateData?.departmentCode || '',
        departmentName: updateData?.departmentName || '',
        description: updateData?.description || '',
        // Đổi manager thành mảng để xử lý trường hợp chọn nhiều trưởng phòng
        manager: updateData?.manager
            ? Array.isArray(updateData.manager)
                ? updateData.manager.map((m) => (typeof m === 'object' ? m._id : m))
                : [typeof updateData.manager === 'object' ? updateData.manager.hoTen : updateData.manager]
            : [],
        status: updateData?.status || 'Active', // Mặc định là Active
    });

    // Gọi API lấy danh sách nhân viên khi mở Form lên
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                // Thay URL này bằng API lấy danh sách nhân viên thực tế của bạn
                const res = await StaffServer.getStaff();
                if (res.data) {
                    setStaffList(res.data);
                }
            } catch (err) {
                console.error('Lỗi khi lấy danh sách nhân viên:', err);
            }
        };
        fetchStaff();
    }, []);

    const handleChangeForm = (key, value) => {
        // Đồng bộ chuẩn tên thuộc tính truyền vào
        let correctKey = key;
        if (key === 'name') correctKey = 'departmentName';

        setFormData((prevState) => ({
            ...prevState,
            [correctKey]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { departmentCode, departmentName, description, status } = formData;

        if (!departmentCode) {
            toaster.warning('Vui lòng nhập mã khoa!');
        } else if (!departmentName) {
            toaster.warning('Vui lòng nhập tên khoa!');
        } else if (!description) {
            toaster.warning('Vui lòng nhập mô tả khoa!');
        } else if (!status) {
            toaster.warning('Vui lòng nhập trạng thái');
        } else if (formType.type === 'created' && updateData === null) {
            try {
                const res = await DepartmentServer.addDepartment({ ...formData });
                // Sửa lại kiểm tra theo logic API thực tế của bạn
                if (res) {
                    toaster.success('Thêm thông tin khoa thành công!');
                    setFormType({ ...formType, open: false });
                    fetchData();
                }
            } catch (err) {
                console.log('Error:', err);
                toaster.danger('Mã khoa đã tồn tại hoặc xảy ra lỗi hệ thống!');
            }
        } else if (formType.type === 'updated') {
            try {
                const res = await DepartmentServer.updateDepartment(updateData?._id, formData);
                if (res) {
                    toaster.success('Cập nhật dữ liệu thành công');
                    setFormType({ ...formType, open: false });
                    fetchData();
                }
            } catch (err) {
                console.log('Error:', err);
            }
        }
    };

    const handleClose = () => {
        setFormType({ ...formType, open: false });
    };

    return (
        <div className="bg-white p-[3.75rem]" style={{ padding: 60 }}>
            <Form name="wrap" labelCol={{ flex: '300px' }} labelAlign="left">
                <div className="grid px-4 pt-15">
                    {/* Mã Khoa */}
                    <Form.Item name="departmentCode" label="Mã khoa" initialValue={formData.departmentCode}>
                        <Input
                            allowClear
                            placeholder="Nhập mã khoa"
                            onChange={(e) => handleChangeForm('departmentCode', e.target.value)}
                        />
                    </Form.Item>

                    {/* Tên Khoa */}
                    <Form.Item name="departmentName" label="Tên khoa" initialValue={formData.departmentName}>
                        <Input
                            allowClear
                            placeholder="Nhập tên khoa"
                            onChange={(e) => handleChangeForm('name', e.target.value)}
                        />
                    </Form.Item>

                    {/* Mô tả Khoa */}
                    <Form.Item name="description" label="Mô tả" initialValue={formData.description}>
                        <TextArea
                            placeholder="Mô tả khoa"
                            className="w-full h-[80px]"
                            onChange={(e) => handleChangeForm('description', e.target.value)}
                        />
                    </Form.Item>

                    {/* Ô CHỌN TRƯỞNG PHÒNG (Tích hợp Select Multiple của Ant Design) */}
                    <Form.Item name="manager" label="Trưởng khoa / Quản lý" initialValue={formData.manager}>
                        <Select
                            mode="multiple" // Bật tính năng cho phép chọn nhiều người
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Chọn (các) trưởng phòng phụ trách"
                            value={formData?.manager}
                            onChange={(value) => handleChangeForm('manager', value)}
                            optionFilterProp="children" // Cho phép gõ chữ để tìm kiếm nhân viên nhanh
                        >
                            {staffList.map((staff) => (
                                <Option key={staff._id} value={staff._id}>
                                    {staff.hoTen} ({staff.maNV})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Trạng thái Khoa */}
                    <Form.Item name="status" label="Trạng thái" initialValue={formData.status}>
                        <Select
                            placeholder="Chọn trạng thái hoạt động"
                            value={formData.status}
                            onChange={(value) => handleChangeForm('status', value)}
                        >
                            <Option value="Active">Hoạt động</Option>
                            <Option value="Inactive">Ngừng hoạt động</Option>
                        </Select>
                    </Form.Item>
                </div>
            </Form>

            <div className="flex justify-end px-4 pb-2 gap-5">
                <Button key="back" onClick={handleClose} className="flex btn-delete items-center gap-3">
                    Hủy
                </Button>
                <Button className="flex btn-save bg-blue-500 text-white" onClick={handleSubmit}>
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default DepartmentForm;
