import { Route, Routes, useNavigate} from "react-router-dom";
import { LandingPage } from './page/landing';
import { Layout } from './page/layout';
import { Dashboard } from './page/admin/dashboard';
import { InstituteList, InstituteDetail } from './page/admin/institute';
import { MemberList, MemberDetail } from "./page/admin/member";
import { TournamentList, TournamentDetail, ApplicableMatchList, ApplicableMatchDetail, ScheduleMatching, Register } from "./page/admin/tournament";
import { Migration } from './page/Migration';
import { ErrorPage } from "./page/errorPage";
import { useAddEventListeners } from "./utils/helpers/hookHelpers";
import "./app.scss";

function App() {  
  const navigate = useNavigate();
  const handleHyperlinkClick = (event) => {
    const src = event.currentTarget.getAttribute('src');
    if (src) navigate(src);
  }

  useAddEventListeners([
    { class: '.hyperlink', event: 'click', handler: handleHyperlinkClick },
  ]);
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/*" element={<Layout />} >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="institute/new" element={<InstituteDetail key="new" />} />
        <Route path="institute/edit" element={<InstituteDetail key="edit" />} />
        <Route path="institute" element={<InstituteList />} />
        <Route path="member/*">
          <Route path="edit" element={<MemberDetail />} />
          <Route path="approved" element={<MemberList approved={true} key={1}/>} />
          <Route path="unapproved" element={<MemberList approved={false} key={2}/>} />
        </Route>
        <Route path='tournament/*'>
          <Route path='' element={<TournamentList />} />
          <Route path='new' element={<TournamentDetail key="new" />} />
          <Route path='edit' element={<TournamentDetail key="edit" />} />
          <Route path=':id/*'>
            <Route path='applicableMatches/*'>
              <Route path='' element={<ApplicableMatchList />} />
              <Route path='new' element={<ApplicableMatchDetail key="new"/>} />
              <Route path='edit' element={<ApplicableMatchDetail key="edit"/>} />
              <Route path='copy' element={<ApplicableMatchDetail key="copy"/>} />
            </Route>
            <Route path='register' element={<Register key="edit" />} />
          </Route>
        </Route>
        <Route path='scheduleMatching' element={<ScheduleMatching />} />
        <Route path='matches' element={<></>} />
        <Route path='matches/result' element={<></>} />
        <Route path="awards/*">
          <Route path="tournament" element={<></>} />
          <Route path="member" element={<></>} />
        </Route>
      </Route>
      <Route path="/migration" element={<Migration />} />
      <Route path="/unauthorized" element={<ErrorPage statusCode='401'/>} />
      <Route path="*" element={<ErrorPage statusCode='404'/>} />
    </Routes>
  );
}

export default App;

// Reference
// - https://www.robinwieruch.de/react-router-private-routes/