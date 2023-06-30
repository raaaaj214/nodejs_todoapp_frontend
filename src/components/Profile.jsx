import { useContext, useEffect} from 'react';
import axios from 'axios';
import { context } from '../index';


function Profile() {
    const {setIsAuthenticated, setUser, User, isAuthenticated} = useContext(context);
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
    <div className='profile'>
      <div className="profile-div">
        hello world 
        <div className="name">
            NAME : 
            {User ? User.name : "username not found"}
        </div>
        <div className="email">
            EMAIL :
            {User ? User.email: "email not found"}
        </div>
      </div>
    </div> :
    <h1>Login First</h1>
  
}

export default Profile
