import React,{useContext} from 'react';
import { useNavigate ,Link} from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
function Header() {

  const navigate=useNavigate()
const {user} =useContext(AuthContext)
const {firebase}=useContext(FirebaseContext)


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        {user ? (
        <span>{`Welcome ${user.displayName}`}</span>
      ) : (
        <Link to="/login" >Login  </Link>
      )}
      
          <hr />
          
          
        </div>
        { user && <span onClick={()=>{
          firebase.auth().signOut();
          navigate('/login')
        }}>Logout</span> }
        

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <Link to='/create'>SELL</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;