import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { verifyTokenAsync, userLogoutAsync } from "./../asyncActions/authAsyncActions";
import { userLogout, verifyTokenEnd } from "./../actions/authActions";

import { setAuthToken } from './../services/auth';
import { getUserListService } from './../services/user';

function Dashboard() {

  const dispatch = useDispatch();
  const authObj = useSelector(state => state.auth);

  const { user, token, expiredAt } = authObj;
  const [userList, setUserList] = useState([]);

  // handle click event of the logout button
  const handleLogout = () => {
    dispatch(userLogoutAsync());
  }

  // get user list
  const getUserList = async () => {
    const result = await getUserListService();
    if (result.error) {
      dispatch(verifyTokenEnd());
      if (result.response && [401, 403].includes(result.response.status))
        dispatch(userLogout());
      return;
    }
    setUserList(result.data);
  }

  // set timer to renew token
  useEffect(() => {
    setAuthToken(token);
    const verifyTokenTimer = setTimeout(() => {
      dispatch(verifyTokenAsync(true));
    }, moment(expiredAt).diff() - 10 * 1000);
    return () => {
      clearTimeout(verifyTokenTimer);
    }
  }, [expiredAt, token])

  // get user list on page load
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div>
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" /><br /><br />
      <input type="button" onClick={getUserList} value="Get Data" /><br /><br />
      <b>User List:</b>
      <pre>{JSON.stringify(userList, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;