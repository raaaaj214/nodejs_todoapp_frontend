import { useContext, useEffect} from 'react';
import axios from 'axios';
import { context } from '../index';
import "../styles/Profile.css"
import { useNavigate } from 'react-router-dom';


function Profile() {
    const {setIsAuthenticated, setUser, User, isAuthenticated} = useContext(context);
    const nav = useNavigate()

  useEffect(() => {
    if(isAuthenticated === false)
    {
      nav("/login")
    }
  })

    useEffect(() => {
        axios
        .get("https://nodejs-todoapp-9lze.onrender.com/users/me", {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.user);
          if (res.data.success === false) setIsAuthenticated(false);
          else setIsAuthenticated(true);
        })
        .catch((err) => {
          setUser({});
          setIsAuthenticated(false);
        });
    }, []);

  return isAuthenticated === true ? 
    <div className='Profile'>
      <div className="profile-div">
        <div className="name">
            NAME : &nbsp;
            {User ? User.name : "username not found"}
        </div>
        <div className="email">
            EMAIL : &nbsp;
            {User ? User.email: "email not found"}
        </div>
      </div>
    </div> :
    <h1>Login First</h1>
  
}

export default Profile
