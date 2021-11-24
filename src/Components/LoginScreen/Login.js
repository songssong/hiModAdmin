import React,{useState,useEffect} from 'react';
import logo from '../../images/iconapp.png'
import './Login.css'
import firebaseConfig from '../../Config/fire'
import { Link as LinkR } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../Config/auth';
import { Redirect } from 'react-router';



  
  
//             const[user,setUser] = useState('');
//             const[email,setEmail] = useState('');
//             const[password,setPassword] = useState('');
//             const[emailError,setEmailError] = useState('');
//             const[passwordError,setPasswordError]=useState('');
//             const[hasAccount,setHasAccount] = useState(false);

            
//             const clearInput = () =>{
//               setEmail('');
//               setPassword('');
//             }
          
//             const clearErrors = () =>{
//               setEmailError('');
//               setPasswordError('');
//             }
          
//             const handleLogin = () => {
//               clearErrors();
//               firebaseConfig.auth().signInWithEmailAndPassword(email,password).catch(err => {
//                 switch(err.code){
//                   case "auth/invalid-email":case "auth/user-disabled":case "auth/user-not-found":setEmailError(err.message);break;
//                   case "auth/wrong-password":setPasswordError(err.message);break;
          
//                 }
//               })
//             }
          
//             const handleLogout = () => {
//               firebaseConfig.auth().signOut();
//             };
          
            // const authListener = () => {
            //   firebaseConfig.auth().onAuthStateChanged((user) => {
            //     if(user){
            //       clearInput(); 
            //       setUser(user);
            //     }else{
            //       setUser("");
            //     };
            //   });
            // };
          
            // useEffect(() => {
            //   authListener();
            // },[]);
            // return (
            //   <div className="App">
            //     <Login
            //     email = {email}
            //     setEmail = {setEmail}
            //     password = {password}
            //     setPassword = {setPassword}
            //     handleLogin = {handleLogin}
            //     handleLogout = {handleLogout}
            //     hasAccount = {hasAccount}
            //     setHasAccount = {setHasAccount}
            //     emailError = {emailError}
            //     passwordError = {passwordError}
          
            //     />
                
            //   </div>
            // );
          export default function Login(props) {
              const [mail, setMail] = useState("");
              const [password, setPassword] = useState("");
              const [err,seterr] = useState("")
              const[hasAccount,setHasAccount] = useState(false);
              const[user,setUser] = useState('');
            
              const handleEmail = (e) => {
                const UserEmail = e.target.value;
                setMail(UserEmail);
              };
              const handlePassword = (e) => {
                const UserPassword = e.target.value;
                setPassword(UserPassword);
              };

              const handleLogin = () => {
               
                  try {
                    firebaseConfig.auth().signInWithEmailAndPassword(mail, password).catch((err)=>{
                      console.log(err)
                      if(err.code == "auth/user-disabled"){
                        seterr("The user account has been disabled")
                      }else{
                        seterr("No user found") 
                      }
                      
                    })
                  } catch (error) {
                    console.log(error)
                  }
                };
                const { currentUser } = useContext(AuthContext);
    
                if (currentUser) {
                    console.log("eiei")
                  return <Redirect to="/post" />;
                }
  
    return (
      <div className="bgcolor">
     
        <div class="card card-container">
       
        <p id="profile-name" class="profile-name-card">Admin hiMod</p>

            <img class="profile-img-card" src={logo} alt="" />
            <form class="form-signin"/>
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email"   onChange={handleEmail}
/>
                <br/>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password"  onChange={handlePassword}
 />
                
                <br/>
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={handleLogin}>Sign in</button>
            <center><p>{err}</p></center>
        </div>
    </div>


    )

    }

	