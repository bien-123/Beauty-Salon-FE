import { Link } from 'react-router-dom';
import config from '../../../config';

const HomeLayoutAdmin = () => {
    return (
        <>
            <>Đây là trang Admin</>
            <Link to={config.routes.home}>Trở về trang chủ</Link>
        </>
    );
};

export default HomeLayoutAdmin;
