import React, { useState, useEffect } from 'react';
import { authFetch } from "./../../auth"
import BASE_URL from '../../helpers/api_base'
import jwt from 'jwt-decode'
import noimg from '../../noimg.jpg';
import { useParams } from 'react-router';


function UserAccountView() {

  const { id } = useParams();
  const [userAccount, setUserAccount] = useState({});
  const [userProfile, setUserProfile] = useState({});

  const fetchUserProfile = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setUserProfile(json)
    } catch (error) {
      //console.log("error", error);
    }
  };

  useEffect(() => {
    const urlUserName = `${BASE_URL}api/users/${id}`
    const urlUserImg = `${BASE_URL}api/user_profile/${id}`

    const fetchUserAccount = async () => {
      try {
        const response = await fetch(urlUserName);
        const json = await response.json();
        setUserAccount(json[0].user)
      } catch (error) {
        //console.log("error", error);
      }
    };

    fetchUserAccount();
    fetchUserProfile(urlUserImg);
  }, []);

  return (
    <>
      <div className="row m-3"><h1>User Account View</h1></div>
      <div className="row m-3"> 
      <div className="container d-flex justify-content-center">
        <div className="card p-3 py-4">
          <div className="text-center"> <img src={userProfile.img? userProfile.img : noimg} width="100" className="rounded-circle" alt="img of user profile" />
            <h3 className="mt-2">{userProfile.full_name?userProfile.full_name:'set name'}</h3> <span className="mt-1 clearfix">{userAccount.email?userAccount.email:'set email'}</span>
            <div className="row mt-3 mb-3">
              <div className="col-md-6">
                <h5>{userAccount.username?userAccount.username:'set username'}</h5> <span className="num">username</span>
              </div>
              <div className="col-md-6">
                <h5>{userAccount.roles?userAccount.roles:'not role??'}</h5> <span className="num">role</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
export default UserAccountView