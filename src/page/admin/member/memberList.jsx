import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcInspection } from 'react-icons/fc';
import { getUserList } from '../../../utils/firebase';
import { DataTableComponent } from '../../../components/datatabeComponent';

export default function MemberList(props) {
  const [retrievedFlag, setRetrievedFlag] = useState(false);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const { approved } = props;

  useEffect(() => {
    if (retrievedFlag === false) retrieveData();
  }, [retrievedFlag])
  
  const modifyButtonClickHandler = ((e) => {
    navigate('/member/edit');
  });

  const deleteButtonClickHandler = ((e) => {

  });

  async function retrieveData() {
    try {
      const memberList = await getUserList(approved);
      setMembers(memberList);
      setRetrievedFlag(true);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    { name: 'uid', selector: row => row.uid, omit: true },
    { name: '이름', selector: row => row.name, sortable: true, grow: 1 },
    { name: '사용자구분', selector: row => row.type, sortable: true, grow: 1 },
    { name: '이메일', selector: row => row.email, sortable: true, grow: 1 },
    { name: '연락처', selector: row => row.contact, sortable: true, grow: 1 },
  ];

  const title = (approved) ? '승인 회원 목록' : '미승인 회원 목록';

  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          회원관리
        </div>
      </div>
      <DataTableComponent 
        title={title}
        columns={columns}
        data={members}
        modifyButtonClickHandler={modifyButtonClickHandler}
        deleteButtonClickHandler={deleteButtonClickHandler}
      />
    </main>
  );
}

// Refernece
// - https://react-data-table-component.netlify.app/?path=/docs/api-props--page