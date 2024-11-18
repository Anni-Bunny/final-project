import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';

export default function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [location]);

    return null;
};

