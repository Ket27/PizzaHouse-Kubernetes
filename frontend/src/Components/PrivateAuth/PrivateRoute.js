import React from 'react';
import { useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';

const PrivateRoute = (props) => {
  const {Component} = props;
  const navigate = useNavigate();

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");

    if(!userInfo){
      navigate("/");
    }

    else{
      const { message } = JSON.parse(userInfo);
      if(message !== "user logged in"){
        navigate("/");
      }
    }
  }, )
  return (
    <div>
      <Component/>
    </div>
  );
};

export default PrivateRoute;