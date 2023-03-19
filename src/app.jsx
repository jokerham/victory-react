import { Route, Routes, useNavigate} from "react-router-dom";
import { LandingPage } from './page/landing';
import { Layout } from './page/layout';
import { Dashboard } from './page/admin/dashboard';
import { InstituteList, InstituteDetail } from './page/admin/institute';
import { MemberList } from "./page/admin/member";
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
        <Route path="institute/new" element={<InstituteDetail />} />
        <Route path="institute/edit" element={<InstituteDetail />} />
        <Route path="institute" element={<InstituteList />} />
        <Route path="member/*">
          <Route path="approved" element={<MemberList approved={true} key={1}/>} />
          <Route path="unapproved" element={<MemberList approved={false} key={2}/>} />
          <Route path="*" element={<ErrorPage statusCode='404'/>} />
        </Route>
        <Route path="*" element={<ErrorPage statusCode='404'/>} />
      </Route>
      <Route path="/unauthorized" element={<ErrorPage statusCode='401'/>} />
      <Route path="*" element={<ErrorPage statusCode='404'/>} />
    </Routes>
  );
}

export default App;

// Reference
// - https://www.robinwieruch.de/react-router-private-routes/