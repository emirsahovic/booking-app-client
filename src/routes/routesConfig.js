import AboutUs from "../pages/AboutUs";
import Accommodation from "../pages/Accommodation";
import Accommodations from "../pages/Accommodations";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import HotelRegistration from "../pages/HotelRegistration";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Reservation from "../pages/Reservation";
import Payment from "../pages/Payment";

export const routesConfig = {
    login: {
        path: '/sign-in',
        element: <Login />
    },
    register: {
        path: '/sign-up',
        element: <Register />
    },
    home: {
        path: '/',
        element: <Home />
    },
    singleAcc: {
        path: '/accommodation/:accommodationId',
        element: <Accommodation />
    },
    accommodations: {
        path: '/accommodations',
        element: <Accommodations />
    },
    contact: {
        path: '/contact',
        element: <ContactUs />
    },
    about: {
        path: '/about',
        element: <AboutUs />
    },
    reservation: {
        path: '/reservation/:accommodationId',
        element: <Reservation />
    },
    payment: {
        path: '/payment/:accommodationId',
        element: <Payment />
    },
    hotel: {
        path: '/hotel/registration',
        element: <HotelRegistration />
    }
}
