import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ loggedInUser, setLoggedInUser }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        setLoggedInUser(null);
        navigate('/login');
    };

    return (
        // Using Tailwind to fill the full viewport height and apply some basic styling
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome!</h1>
            <p className="text-lg text-gray-600 mb-8">This is the home page.</p>
            <div className="space-y-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onLogout}
                >
                    Log out
                </button>
                {loggedInUser && (
                    <div className="text-md text-gray-600 mt-4">
                        Your email address is: <span className="font-semibold">{loggedInUser.email}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
