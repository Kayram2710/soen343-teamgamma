import React from 'react'
import { Route, useNavigate } from 'react-router-dom';

const Home = (props) => {
    const { loggedInUser, setLoggedInUser } = props
    const navigate = useNavigate()
    var now = new Date()
    var currentDateTime = now.toLocaleString(); 

    const onLogout = () => {
        setLoggedInUser(null);
    }

    const getDate = () => {
        var date = prompt("Please enter the date in the following format: (YYYY-MM-DD)");
        var Date = date.split("-")
        var Year = parseInt(Date[0])
        var Month = parseInt(Date[1]) - 1
        var Day = parseInt(Date[2])
        
        now.setFullYear(Year, Month, Day)
        currentDateTime = now.toLocaleString();
        document.getElementById("datetime").innerHTML = currentDateTime
    }

    const getTime = () => {
        var time = prompt("Please enter the Time in the Following Format: (HH:MM)");
        var Time = time.split(":") 
        var Hour = parseInt(Time[0])
        var Minute = parseInt(Time[1])
        
        now.setHours(Hour)
        now.setMinutes(Minute)
        now.setSeconds(0)
        currentDateTime = now.toLocaleString();
        document.getElementById("datetime").innerHTML = currentDateTime
    }
        

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
            </div>
            <div>This is the home page.</div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={getDate}
                    value={'Change Date'}
                />
            </div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={getTime}
                    value={'Change Time'}
                />
            </div>
            <div>This is the Simulation Time: </div>
            <div id="datetime">{currentDateTime}</div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
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
