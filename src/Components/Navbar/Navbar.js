import React, { useContext } from "react";
import { Link as LinkR } from "react-router-dom";
import { Link } from "react-router-dom";
import firebaseConfig from '../../Config/fire'
import axios from "axios";
import './Navbar.css';
import { AuthContext } from "../../Config/auth";
import { Redirect } from "react-router";

export default function Navbar(props) {

    const { currentUser } = useContext(AuthContext);
    
    if (!currentUser) {
        
      return <Redirect to="/" />;
    }
                
return(
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand text-white" >Himod Admin</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nvbCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item pl-1">
                        <Link class="nav-link" to="/post"><i class="fa fa-home fa-fw mr-1"></i>Post</Link>
                    </li>   
                    <li class="nav-item pl-1">
                        <Link class="nav-link" to="/lostandfound"><i class="fa fa-th-list fa-fw mr-1"></i>LostandFound</Link>
                    </li>
                    <li class="nav-item pl-1">
                        <Link class="nav-link" to="/activity"><i class="fa fa-info-circle fa-fw mr-1"></i>Activity</Link>
                    </li>
                    <li class="nav-item pl-1">
                        <Link class="nav-link" to="reportpost"><i class="fa fa-phone fa-fw fa-rotate-180 mr-1"></i>Report</Link>
                    </li>
                    
                    <li class="nav-item pl-1">
                        <Link class="nav-link" to="/" onClick={() => firebaseConfig.auth().signOut()}><i class="fa fa-sign-in fa-fw mr-1"></i>Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>



)
}