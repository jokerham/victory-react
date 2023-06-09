import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import { AuthenticationHelper } from '../../utils/firebase';
import { toggleClass } from '../../utils/helpers/uihelpers';
import { useAddEventListeners } from '../../utils/helpers/hookHelpers';

export default function LayoutHeader(props) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    if (userInfo != null) {
      setAvatar();
    }
    // Update avatar image
    function setAvatar() {
      const headerAvatar = document.querySelector('.header__avatar');
      if (headerAvatar != null) {
        headerAvatar.style.backgroundImage = `url(${userInfo.imgurl})`;
        headerAvatar.style.border = 0;
      }
    }
  }, [userInfo])

  useAddEventListeners([
    { class: '#logout', event: 'click', handler: logoutHandler },
    { class: '.header__avatar', event: 'click', handler: userDropdownHandler },
  ]);


  // Logout button
  async function logoutHandler(e) {
    await AuthenticationHelper.authSignOut();
    navigate('/');
  }

  // User avatar dropdown functionality
  function userDropdownHandler(e) {
    toggleClass(
      document.querySelector('.header__avatar > .dropdown'),
      'dropdown--active',
    );
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