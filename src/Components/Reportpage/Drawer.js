import React, { useContext, useState,useEffect } from "react";

import { Drawer } from "devextreme-react/drawer";
import "./Drawer.css";
import { AuthContext } from "../../Config/auth";
import { Link ,Redirect,Route} from "react-router-dom";
import firebaseConfig from '../../Config/fire'
import { useHistory } from "react-router";
import { FaHome,FaList,FaInfoCircle } from "react-icons/fa";


export default function AdminDrawerNav() {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    const history = useHistory();
   
    
    return (
        <div>
        
        <Drawer
          opened="true"
          openedStateMode="shrink"
          
          render={() => (
            <div className="drawernav-container-menu">
              <div className="menu-head">Report</div>
              <hr
                style={{
                  marginRight: "1.5em",
                  marginLeft: "0.5em",
                  border: "solid 0.5px",
                }}
              />
              <div className="menu">
                <Link to="/reportpost" style={{ textDecoration: "none" }}>
                  <div className="menu-content">
                    <FaHome
                      
                      size="25px"
                      style={{ marginRight: "0.5em" }}
                    />
                    Post 
                  </div>
                </Link>
              </div>
              
              
  
              <div className="menu">
                <Link to="/reportlost" style={{ textDecoration: "none" }}>
                  <div className="menu-content">
                    <FaList
                      
                      size="25px"
                      style={{ marginRight: "0.5em" }}
                    />
                    Lostandfound
                  </div>
                </Link>
              </div>
              <div className="menu">
                <Link to="/reportact" style={{ textDecoration: "none" }}>
                  <div className="menu-content">
                    <FaInfoCircle
                      
                      size="25px"
                      style={{ marginRight: "0.5em" }}
                    />
                    Activity
                  </div>
                </Link>
              </div>
  
             
            </div>
          )}
        >
         
        </Drawer>
       </div>
    );
  }
