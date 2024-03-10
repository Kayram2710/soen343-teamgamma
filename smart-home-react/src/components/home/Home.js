import React from 'react'
import { Route, useNavigate } from 'react-router-dom';

const Home = (props) => {
    const { loggedInUser, setLoggedInUser } = props
    const navigate = useNavigate()

    const onLogout = () => {
        setLoggedInUser(null);
    }

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
            </div>
            <p>This is the home page.</p>
            <div className={'buttonContainer'}>
                <input
                    className={'authBtn'}
                    type="button"
                    onClick={onLogout}
                    value={'Log out'}
                />
                {loggedInUser ? <div>Your email address is {loggedInUser.email}</div> : <div />}
            </div>
        </div>
    )
}

export default Home;
