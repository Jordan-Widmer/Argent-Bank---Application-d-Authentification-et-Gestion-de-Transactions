import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                setIsLoading(false); // Move setIsLoading inside the setTimeout
            }, 1000);
        } else {
            setIsLoading(false); // Set loading to false immediately if already logged in
        }
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
