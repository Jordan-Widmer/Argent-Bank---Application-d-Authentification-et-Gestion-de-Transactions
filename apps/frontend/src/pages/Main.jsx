import {useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SignInPage from './SignInPage';
import UserProfilePage from './UserProfilePage';

function Main() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timer;
        if (!isLoggedIn) {
            timer = setTimeout(() => {
                navigate("/sign-in");
            }, 1000);
        }
        setIsLoading(false);
        return () => {
            clearTimeout(timer);
        };
    }, [isLoggedIn, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isLoggedIn ? <UserProfilePage /> : <SignInPage />}
        </>
    );
}

export default Main;
