import Header from '../component/HeaderLayout';
import FormInput from '../component/FormInput';
import Footer from '../component/FooterLayout';
const HomeLayoutUser = ({ children }) => {
    return (
        <>
            <Header />
            {/* <Content /> */}
            {children}
            <FormInput />
            <Footer />
        </>
    );
};

export default HomeLayoutUser;
