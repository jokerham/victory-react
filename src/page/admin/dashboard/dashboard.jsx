import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BiSitemap } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';

export default function Dashboard() {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [ userName, setUserName ] = useState("");
  
  useEffect(() => {
    if (userInfo != null) {
      setUserName(userInfo.name);
    }
  }, [userInfo]);

  const MainHeader = () => {
    const today = new Date();
    return (
      <div className="main-header">
        <div className="main-header__intro-wrapper">
          <div className="main-header__welcome">
            <div className="main-header__welcome-title text-light"><strong>{userName}</strong>님 안녕하세요.</div>
            <div className="main-header__welcome-subtitle text-light">오늘은 {today.getFullYear()}년 {today.getMonth()+1}월 {today.getDate()}일 입니다.</div>
          </div>
          <div className="quickview">
            <div className="quickview__item">
              <div className="quickview__item-total">{0}</div>
              <div className="quickview__item-description">
                <i className="far fa-calendar-alt"></i>
                <span className="text-light">조직수</span>
              </div>
            </div>
            <div className="quickview__item">
              <div className="quickview__item-total">{0}</div>
              <div className="quickview__item-description">
                <i className="far fa-calendar-alt"></i>
                <span className="text-light">회원수</span>
              </div>
            </div>
            <div className="quickview__item">
              <div className="quickview__item-total">{0}</div>
              <div className="quickview__item-description">
                <i className="far fa-calendar-alt"></i>
                <span className="text-light">대회수</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MainOverview = () => {
    return (
      <div className="main-overview">
        <div className="overviewCard">
          <div className="overviewCard-icon overviewCard-icon--document">
            <FaUser />
          </div>
          <div className="overviewCard-description">
            <h3 className="overviewCard-title text-light">승인 대기 <strong>회원수</strong></h3>
            <p className="overviewCard-subtitle">{ 0 } 명</p>
          </div>
        </div>
        <div className="overviewCard">
          <div className="overviewCard-icon overviewCard-icon--calendar">
            <BiSitemap />
          </div>
          <div className="overviewCard-description">
            <h3 className="overviewCard-title text-light">대전 설정 대기 <strong>대회수</strong></h3>
            <p className="overviewCard-subtitle">{ 0 } 개</p>
          </div>
        </div>
      </div> 
    );
  }

  const MainCards = () => {
    return (
      <div className="main__cards">
        <div className="card">
          <div className="card__header">
            <div className="card__header-title text-light">
              Your <strong>Events</strong>&nbsp;
              <span className="card__header-link text-bold hyperlink">View All</span>
            </div>
            <div className="settings">
              <div className="settings__block"><i className="fas fa-edit"></i></div>
              <div className="settings__block"><i className="fas fa-cog"></i></div>
            </div>
          </div>
          <div className="card__main">
            <div className="card__row">
              <div className="card__icon"><i className="fas fa-gift"></i></div>
              <div className="card__time">
                <div>today</div>
              </div>
              <div className="card__detail">
                <div className="card__source text-bold">Jonathan G</div>
                <div className="card__description">Going away party at 8:30pm. Bring a friend!</div>
                <div className="card__note">1404 Gibson St</div>
              </div>
            </div>
            <div className="card__row">
              <div className="card__icon"><i className="fas fa-plane"></i></div>
              <div className="card__time">
                <div>Tuesday</div>
              </div>
              <div className="card__detail">
                <div className="card__source text-bold">Matthew H</div>
                <div className="card__description">Flying to Bora Bora at 4:30pm</div>
                <div className="card__note">Delta, Gate 27B</div>
              </div>
            </div>
            <div className="card__row">
              <div className="card__icon"><i className="fas fa-book"></i></div>
              <div className="card__time">
                <div>Thursday</div>
              </div>
              <div className="card__detail">
                <div className="card__source text-bold">National Institute of Science</div>
                <div className="card__description">Join the institute for an in-depth look at Stephen Hawking</div>
                <div className="card__note">7:30pm, Carnegie Center for Science</div>
              </div>
            </div>
            <div className="card__row">
              <div className="card__icon"><i className="fas fa-heart"></i></div>
              <div className="card__time">
                <div>Friday</div>
              </div>
              <div className="card__detail">
                <div className="card__source text-bold">24th Annual Heart Ball</div>
                <div className="card__description">Join us and contribute to your favorite local charity.</div>
                <div className="card__note">6:45pm, Austin Convention Ctr</div>
              </div>
            </div>
            <div className="card__row">
              <div className="card__icon"><i className="fas fa-heart"></i></div>
              <div className="card__time">
                <div>Saturday</div>
              </div>
              <div className="card__detail">
                <div className="card__source text-bold">Little Rock Air Show</div>
                <div className="card__description">See the Blue Angels fly with roaring thunder</div>
                <div className="card__note">11:00pm, Jacksonville Airforce Base</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
            <div className="card__header-title text-light">
              Recent <strong>Documents</strong>&nbsp;
              <span className="card__header-link text-bold hyperlink">View All</span>
            </div>
            <div className="settings">
              <div className="settings__block"><i className="fas fa-edit"></i></div>
              <div className="settings__block"><i className="fas fa-cog"></i></div>
            </div>
          </div>
          <div className="card">
            <div className="documents">
              <div className="document">
                <div className="document__img"></div>
                <div className="document__title">tesla-patents</div>
                <div className="document__date">07/16/2018</div>
              </div>
              <div className="document">
                <div className="document__img"></div>
                <div className="document__title">yearly-budget</div>
                <div className="document__date">09/04/2018</div>
              </div>
              <div className="document">
                <div className="document__img"></div>
                <div className="document__title">top-movies</div>
                <div className="document__date">10/10/2018</div>
              </div>
              <div className="document">
                <div className="document__img"></div>
                <div className="document__title">trip-itinerary</div>
                <div className="document__date">11/01/2018</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card card--finance">
          <div className="card__header">
            <div className="card__header-title text-light">
              Monthly <strong>Spending</strong>&nbsp;
              <span className="card__header-link text-bold hyperlink">View All</span>
            </div>
            <div className="settings">
              <div className="settings__block"><i className="fas fa-edit"></i></div>
              <div className="settings__block"><i className="fas fa-cog"></i></div>
            </div>
          </div>
          <div id="chartdiv"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="main">
      <MainHeader />
      <MainOverview />
      <MainCards />
    </main>
  );
}
