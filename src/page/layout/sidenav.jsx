import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTimes, FaUser, FaAward } from 'react-icons/fa';
import { FiUsers } from "react-icons/fi";
import { TbTournament } from "react-icons/tb";
import { toggleClass } from '../../utils/helpers/uihelpers';

export default function LayoutSidenav(props) {
  const navigate = useNavigate();
  const SIDENAV_ACTIVE_CLASS = 'sidenav--active';
  const GRID_NO_SCROLL_CLASS = 'grid--noscroll';
  let sidenavEl = null;
  let gridEl = null;
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [ userName, setUserName ] = useState("");

  useEffect(() => {
    // Set constants and grab needed elements
    sidenavEl = document.querySelector('.sidenav');
    gridEl = document.querySelector('.grid');

    addEventListeners();

    return (() => {
      removeEventListeners();
    });
  });

  useEffect(() => {
    if (userInfo != null) {
      setAvatarImage();
      setUserName(userInfo.name);
    }
  }, [userInfo]);

  function setAvatarImage() {
    const profileAvatar = document.querySelector('.sidenav__profile-avatar');
    if (profileAvatar != null) {
      profileAvatar.style.backgroundImage = `url(${userInfo.imgurl})`;
    }
  }

  function addEventListeners() {
    addResizeListeners();
    setSidenavListeners();
    setMenuClickListener();
    setSidenavCloseListener();
    setSubListClickListener();
    // renderChart();
  }

  function removeEventListeners() {
    removeResizeListener();
    unsetSidenavListeners();
    unsetMenuClickListener();
    unsetSidenavCloseListener();
    unsetSubListClickListener();
  }

  // Sidenav list sliding functionality
  function sidenavClickHandler(e) {
    let target = e.target
    while (target.tagName !== 'DIV') target = target.parentNode;
    toggleClass(target, 'navList__subheading--open');
    toggleClass(target.nextSibling, 'subList--hidden');
  }

  function setSidenavListeners() {
    document.querySelectorAll('.navList__subheading').forEach((el) => {
      el.addEventListener('click', sidenavClickHandler);
    });
  }

  function unsetSidenavListeners() {
    document.querySelectorAll('.navList__subheading').forEach((el) => {
      el.removeEventListener('click', sidenavClickHandler);
    });
  }

  // If user opens the menu and then expands the viewport from mobile size without closing the menu,
  // make sure scrolling is enabled again and that sidenav active class is removed
  function resizeHandler(e) {
    if (window.innerWidth > 750) {
      if (sidenavEl != null) sidenavEl.classList.remove(SIDENAV_ACTIVE_CLASS);
      if (gridEl != null) gridEl.classList.remove(GRID_NO_SCROLL_CLASS);
    }
  };

  function addResizeListeners() {
    window.addEventListener('resize', resizeHandler);
  }

  function removeResizeListener() {
    window.removeEventListener('resize', resizeHandler);
  }

  // Menu open sidenav icon, shown only on mobile
  function menuClickHandler(e) {
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  }

  function setMenuClickListener() {
    document.querySelector('.header__menu').addEventListener('click', menuClickHandler);
  }

  function unsetMenuClickListener() {
    const el = document.querySelector('.header__menu')
    if(el != null) el.removeEventListener('click', menuClickHandler);
  }

  // Sidenav close icon
  function sidenavCloseHandler() {
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  }

  function setSidenavCloseListener() {
    document.querySelector('.sidenav__brand-close').addEventListener('click', sidenavCloseHandler);
  }

  function unsetSidenavCloseListener() {
    const el = document.querySelector('.sidenav__brand-close')
    if (el != null) el.removeEventListener('click', sidenavCloseHandler);
  }

  // Sublist click event
  function subListClickHandler(e) {
    const url = e.target.getAttribute("src");
    if (url!=null) navigate(url);
  }

  function setSubListClickListener() {
    const els = document.querySelectorAll('.hyperlink');
    els.forEach((el) => {
      el.addEventListener('click', subListClickHandler);
    });
  }

  function unsetSubListClickListener() {
    const els = document.querySelectorAll('.hyperlink');
    els.forEach((el) => {
      el.removeEventListener('click', subListClickHandler);
    })
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
          <li className="navList__heading">관리자메뉴</li>
            <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><FiUsers /></span>
              <span className="navList__subheading-title">조직관리</span>
            </div>
            <ul className="subList subList--hidden">
              <li className="subList__item hyperlink" src="/admin/institute/new">신규 조직 추가</li>
              <li className="subList__item hyperlink" src="/admin/institute">조직 목록 조회</li>
            </ul>
          </li>
          <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><FaUser /></span>
              <span className="navList__subheading-title">회원관리</span>
            </div>
            <ul className="subList subList--hidden">
              <li className="subList__item hyperlink" src="/admin/member/unapproved">미승인 회원 목록 조회</li>
              <li className="subList__item hyperlink" src="/admin/member/approved">승인 회원 목록 조회</li>
            </ul>
          </li>
          <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><TbTournament /></span>
              <span className="navList__subheading-title">대회관리</span>
            </div>
            <ul className="subList subList--hidden">
              <li className="subList__item">신규 대회 등록</li>
              <li className="subList__item">대회 목록 조회</li>
              <li className="subList__item">대전 매칭</li>
              <li className="subList__item">대전 목록 조회</li>
            </ul>
          </li>
          <li>
            <div className="navList__subheading row row--align-v-center">
              <span className="navList__subheading-icon"><FaAward /></span>
              <span className="navList__subheading-title">상장</span>
            </div>
            <ul className="subList subList--hidden">
              <li className="subList__item">대회별 상장</li>
              <li className="subList__item">회원별 상장</li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}
