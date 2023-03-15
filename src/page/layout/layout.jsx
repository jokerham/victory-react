import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutHeader, LayoutSidenav, LayoutFooter} from '.';

export default function Layout({children}) {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo != null) {
      if (userInfo.type !== 'admin') {
        navigate('/unauthorized');
      }
    } else {
      navigate('/unauthorized');
    }
  });

  return (
    <div className="dashboard-container">
      <div className="grid">
        <LayoutHeader />          
        <LayoutSidenav />
        <Outlet />
        <LayoutFooter />
      </div>
    </div>
  );
}

// Thanks to Matt H : https://www.linkedin.com/in/matt-holland/