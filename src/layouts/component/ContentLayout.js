import BannerHome from '../../assets/images/hinh-anh-nang-mui.png';
import BannerHome1 from '../../assets/images/image-lieu-phap.png';
const Content = () => {
    return (
        <div className="w-full">
            <img src={BannerHome} alt="Banner Home" className="w-full"></img>
            <div className="bg-infrastructure">
                <div className="max-w-[1280px] m-auto py-10">
                    <img src={BannerHome1} alt="Banner Lieu Phap" className="w-full"></img>
                </div>
            </div>
        </div>
    );
};

export default Content;
