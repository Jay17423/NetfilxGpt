import { getAuth,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { LOGO,PHOTO_URL } from "../utils/constant";


const Header = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleSignOut = () =>{
    const auth = getAuth();
    //SignOut Successfull
    signOut(auth).then(() => {

    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });

  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: PHOTO_URL,
          })
        );
        navigate("/browse")
        
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
      }
    });
    return () => unsubscribe() // This will remove the event listner from our browser to make it fast
  }, []);
  return (
    <div className='absolute px-8 w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between' >
       <img className='w-44' src={LOGO} alt='Logo'></img>
      { user &&  (<div className='flex flex-wrap '>
      <img src={ user.photoURL} className='h-10 w-10 m-4' alt='userIcon'></img>
        <button className='font-bold text-xl text-white' onClick={handleSignOut} >Sign Out</button>   
       </div>)}
    </div>

  )
}

export default Header