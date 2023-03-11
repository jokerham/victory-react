import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import { authSignOut } from '../../utils/firebase';
import { toggleClass } from '../../utils/helpers/uihelpers';

export default function LayoutHeader(props) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    setUserDropdownListener();
    addLogoutListener();

    return (() => {
      unsetUserDropdownListener();
      removeLogoutListener();
    });
  }, []);

  useEffect(() => {
    if (userInfo != null) {
      setAvatar();
    }
  }, [userInfo])


  // Update avatar image
  function setAvatar() {
    const headerAvatar = document.querySelector('.header__avatar');
    if (headerAvatar != null) {
      headerAvatar.style.backgroundImage = `url(${userInfo.imgurl})`;
      headerAvatar.style.border = 0;
    }
  }

  // Logout button
  async function logoutHandler(e) {
    await authSignOut();
    navigate('/');
  }

  function addLogoutListener() {
    document.querySelector('#logout').addEventListener('click', logoutHandler);
  }

  function removeLogoutListener() {
    const el = document.querySelector('#logout');
    if (el != null) el.removeEventListener('click', logoutHandler);
  }

  // User avatar dropdown functionality
  function userDropdownHandler(e) {
    toggleClass(
      document.querySelector('.header__avatar > .dropdown'),
      'dropdown--active',
    );
  }

  function setUserDropdownListener() {
    document.querySelector('.header__avatar').addEventListener('click', userDropdownHandler);
  }

  function unsetUserDropdownListener() {
    const el = document.querySelector('.header__avatar');
    if (el != null) el.removeEventListener('click', userDropdownHandler);
  }

  return (
    <header className="header">
      <i className="fas fa-bars header__menu"></i>
      <div className="header__search">
        <input className="header__input" placeholder="Search..." />
      </div>
      <div className="header__avatar">
        <div className="dropdown">
          <ul className="dropdown__list">
            <li className="dropdown__list-item" id="logout">
              <span className="dropdown__icon"><FaSignOutAlt /></span>
              <span className="dropdown__title">log out</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}