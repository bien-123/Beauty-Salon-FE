import { Modal, Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const ModalHeader = ({ open, handleClose }) => {
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className="!text-[#01babd] font-bold">VIỆN THẨM MỸ BEAUTY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col justify-center items-center">
                        <div className="mb-3">Để lại số Tổng đài để được Viện thẩm mỹ BEAUTY gọi lại ngay!</div>
                        <Input placeholder="Số điện thoại" />
                        <div className="flex gap-2 border-2 border-solid bg-[#01babd] w-[175px] rounded-[50px] !my-3">
                            <div className="flex px-3 py-2">
                                <div className="px-2 text-[#fff] font-bold">Yêu cầu gọi lại</div>
                            </div>
                        </div>
                        <div className="mb-3">Hoặc gọi ngay cho chúng tôi:</div>
                        <div>
                            <i>1800.1800</i>
                        </div>
                        <a
                            href="tel:0987654321"
                            className="flex gap-2 border-2 border-solid bg-[#FC553D] w-[175px] rounded-[50px] !my-3"
                        >
                            <div className="flex px-3 py-2">
                                <div className="px-2 text-[#fff] font-bold">Click để gọi ngay</div>
                            </div>
                        </a>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} appearance="primary">
                        Ok
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
};

export default ModalHeader;
