import Header from '../../../layouts/component/Header/HeaderLayout';
import Content from './Content.js';
import FormInput from '../../../layouts/component/FormInput';
import Footer from '../../../layouts/component/FooterLayout';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Result = () => {
    return (
        <>
            <Header />
            <Content />
            <FormInput />
            <Footer />
        </>
    );
};

export default Result;
