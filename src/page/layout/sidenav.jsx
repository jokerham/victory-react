import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTimes, FaUser, FaAward } from 'react-icons/fa';
import { FiUsers } from "react-icons/fi";
import { TbTournament } from "react-icons/tb";
import { toggleClass } from '../../utils/helpers/uihelpers';
import { useAddEventListeners } from '../../utils/helpers/hookHelpers';

export default function LayoutSidenav(props) {
  const SIDENAV_ACTIVE_CLASS = 'sidenav--active';
  const GRID_NO_SCROLL_CLASS = 'grid--noscroll';
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [ userName, setUserName ] = useState("");

  useAddEventListeners([
    { class: '.navList__subheading', event: 'click', handler: sidenavClickHandler },
    { class: window, event: 'resize', handler: resizeHandler },
    { class: '.header__menu', event: 'click', handler: menuClickHandler },
    { class: '.sidenav__brand-close', event: 'click', handler: sidenavCloseHandler },
  ]);

  useEffect(() => {
    if (userInfo != null) {
      setAvatarImage();
      setUserName(userInfo.name);
    }

    function setAvatarImage() {
      const profileAvatar = document.querySelector('.sidenav__profile-avatar');
      if (profileAvatar != null) {
        profileAvatar.style.backgroundImage = `url(${userInfo.imgurl})`;
      }
    }
  }, [userInfo]);

  // Sidenav list sliding functionality
  function sidenavClickHandler(e) {
    let target = e.target
    while (target.tagName !== 'DIV') target = target.parentNode;
    toggleClass(target, 'navList__subheading--open');
    toggleClass(target.nextSibling, 'subList--hidden');
  }

  // If user opens the menu and then expands the viewport from mobile size without closing the menu,
  // make sure scrolling is enabled again and that sidenav active class is removed
  function resizeHandler(e) {
    const sidenavEl = document.querySelector('.sidenav');
    const gridEl = document.querySelector('.grid');
    if (window.innerWidth > 750) {
      if (sidenavEl != null) sidenavEl.classList.remove(SIDENAV_ACTIVE_CLASS);
      if (gridEl != null) gridEl.classList.remove(GRID_NO_SCROLL_CLASS);
    }
  };

  // Menu open sidenav icon, shown only on mobile
  function menuClickHandler(e) {
    const sidenavEl = document.querySelector('.sidenav');
    const gridEl = document.querySelector('.grid');
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  }

  // Sidenav close icon
  function sidenavCloseHandler() {
    const sidenavEl = document.querySelector('.sidenav');
    const gridEl = document.querySelector('.grid');
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  }

  return (
    <aside className="sidenav">
      <div className="sidenav__brand">
        <i className="sidenav__brand-icon-victory"></i>
        <span className="text-light brand-text hyperlink" src="/admin/dashboard">Victory</span>
        <FaTimes className="sidenav__brand-close" />
      </div>
      <div className="sidenav__profile">
        <div className="sidenav__profile-avatar"></div>
        <div className="sidenav__profile-title text-light">{userName}</div>
      </div>
      <div className="row row--align-v-center row--align-h-center">
        <ul className="navList">
          <li className="navList__heading">관리자 메뉴</li>
            <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><FiUsers /></span>
              <span className="navList__subheading-title">단체 관리</span>
            </div>
            <ul className="subList subList--hidden">
              <Link to="/admin/institute/new"><li className="subList__item">신규 단체 추가</li></Link>
              <Link to="/admin/institute"><li className="subList__item">단체 목록 조회</li></Link>
            </ul>
          </li>
          <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><FaUser /></span>
              <span className="navList__subheading-title">회원 관리</span>
            </div>
            <ul className="subList subList--hidden">
              <Link to="/admin/member/unapproved"><li className="subList__item">미승인 회원 목록 조회</li></Link>
              <Link to="/admin/member/approved"><li className="subList__item">승인 회원 목록 조회</li></Link>
            </ul>
          </li>
          <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><TbTournament /></span>
              <span className="navList__subheading-title">대회 관리</span>
            </div>
            <ul className="subList subList--hidden">
              <Link to="/admin/tournament/new"><li className="subList__item">신규 대회 등록</li></Link>
              <Link to="/admin/tournament"><li className="subList__item">대회 목록 조회</li></Link>
              <Link to="/admin/scheduleMatching"><li className="subList__item">대전 매칭</li></Link>
              <Link to="/admin/matches"><li className="subList__item">대전 목록 조회</li></Link>
              <Link to="/admin/matches/result"><li className="subList__item">대전 결과 기록</li></Link>
            </ul>
          </li>
          <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><FaAward /></span>
              <span className="navList__subheading-title">상장</span>
            </div>
            <ul className="subList subList--hidden">
              <Link to="/admin/awards/tournament"><li className="subList__item">대회별 상장</li></Link>
              <Link to="/admin/awards/member"><li className="subList__item">회원별 상장</li></Link>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}
