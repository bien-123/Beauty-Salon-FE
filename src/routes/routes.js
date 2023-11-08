import config from '../config';

// file này dùng để định nghĩa các Router trong pages
import Home from '../pages/HomeLayout/HomeLayout.js';
import Contact from '../pages/Contact';
import Introduce from '../pages/Introduce';
import Result from '../pages/Result';
import Service from '../pages/Service';

// dùng cho Router ko cần đăng nhập vẫn xem đc
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.contact, component: Contact },

    // { path: '/profile', component: Profile },
    { path: config.routes.introduce, component: Introduce },

    // { path: '/upload', component: Upload, layout: null },
    { path: config.routes.result, component: Result },

    { path: config.routes.service, component: Service },
];

// dùng cho Router phải đăng nhập mới vào đc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
