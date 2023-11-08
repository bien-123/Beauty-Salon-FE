import BannerHome from '../../assets/images/hinh-anh-nang-mui.png';
import BannerHome1 from '../../assets/images/image-lieu-phap.png';
const Content = () => {
    return (
        <div className="w-full">
            <img src={BannerHome} alt="Banner Home" className="w-full"></img>
            <div className="w-full m-auto">
                <img src={BannerHome1} alt="Banner Lieu Phap" className="w-full"></img>
            </div>
        </div>
    );
};

export default Content;
