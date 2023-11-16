import config from '../config';

// file này dùng để định nghĩa các Router trong pages
import Home from '../pages/User/HomeLayout/HomeLayout.js';
import Contact from '../pages/User/Contact';
import Introduce from '../pages/User/Introduce';
import Result from '../pages/User/Result';
import Service from '../pages/User/Service';
import Payment from '../pages/User/Policy/Payment.js';
import Privacy from '../pages/User/Policy/Privacy.js';
import Login from '../pages/Login.js';
import HomeLayoutAdmin from '../pages/System/HomeLayoutAdmin/HomeLayoutAdmin.js';
import CustomerAdmin from '../pages/System/Customer/CustomerAdmin.js';
import ServiceAdmin from '../pages/System/ServiceAdmin/ServiceAdmin.js';
import AppointmentAdmin from '../pages/System/Appoiment/AppoimentAdmin.js';
import BillAdmin from '../pages/System/Bill/BillAdmin.js';

// dùng cho Router ko cần đăng nhập vẫn xem đc
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.contact, component: Contact },

    // { path: '/profile', component: Profile },
    { path: config.routes.introduce, component: Introduce },

    // { path: '/upload', component: Upload, layout: null },
    { path: config.routes.result, component: Result },
    { path: config.routes.service, component: Service },
    { path: config.routes.payment, component: Payment },
    { path: config.routes.privacy, component: Privacy },
    { path: config.routes.login, component: Login },
    { path: config.routes.admin, component: HomeLayoutAdmin },
    { path: config.routes.admincustomer, component: CustomerAdmin },
    { path: config.routes.adminservices, component: ServiceAdmin },
    { path: config.routes.adminappointment, component: AppointmentAdmin },
    { path: config.routes.adminbill, component: BillAdmin },
];

// dùng cho Router phải đăng nhập mới vào đc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
