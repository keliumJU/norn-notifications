import React, { useState, useEffect } from 'react';
import BASE_URL from '../../helpers/api_base'
import jwt from 'jwt-decode'
import noimg from '../../noimg.jpg';
import { useParams } from 'react-router';


function UserProfileView() {

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
      <div className="container">
        <div className="main-body">

          <div className="row gutters-sm justify-content-center">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={userProfile.img ? userProfile.img : noimg} alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{userAccount.username}</h4>
                      <p className="mb-1"><strong>{userAccount.roles}</strong></p>
                      <p className="font-size-sm">{userProfile.address ? userProfile.address : 'Bay Area, San Francisco, CA'}</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span className="text-secondary">{userProfile.web_site ? userProfile.web_site : 'https://bootdey.com'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                    <span className="text-secondary">{userProfile.github ? userProfile.github : 'bootdey'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span className="text-secondary">{userProfile.twitter ? userProfile.twitter : '@bootdey'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span className="text-secondary">{userProfile.facebook ? userProfile.facebook : 'bootdey'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card mb-3">
                <div className="card-body mt-5">
                  <div className="row">
                    <div className="col-sm-12">
                      <h5 className="mb-5">Personal Information</h5>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9">
                      {userProfile.full_name ? userProfile.full_name : 'Kenneth Valdez'}
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9">
                      {userAccount.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9">
                      {userProfile.phone ? userProfile.phone : '(239) 816-9029'}
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9">
                      {userProfile.mobile ? userProfile.mobile : '(320) 380-4539'}
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9">
                      {userProfile.address ? userProfile.address : 'Bay Area, San Francisco, CA'}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default UserProfileView