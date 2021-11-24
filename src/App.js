import Login from './Components/LoginScreen/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import { AuthPro } from './Config/auth';
import Post from './Components/Postpage/Post'
import Lost from './Components/LostandFoundpage/Lostandfound'
import Activity from './Components/Activitypage/Activity'
import Report from './Components/Reportpage/Report'
import Reportlost from './Components/Reportpage/reportlost'
import Reportact from './Components/Reportpage/reportact';



function App(){
  return(
    <AuthPro>
  <Router>
  <Route exact path="/" component={Login} />
  <Route exact path="/post" component={Post} />
  <Route exact path="/lostandfound" component={Lost} />
  <Route exact path="/activity" component={Activity} />
  <Route exact path="/reportpost" component={Report} />
  <Route exact path="/reportlost" component={Reportlost} />
  <Route exact path="/reportact" component={Reportact} />


  </Router>
  </AuthPro>
  )
}



export default App;
