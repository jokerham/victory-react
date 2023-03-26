import { useEffect, useState } from 'react';
import { FcInspection } from 'react-icons/fc';
import { FirestoreHelper } from '../../../utils/firebase';
import { DataTableComponent } from '../../../components/datatableComponent';

export default function MemberList(props) {
  const [retrievedFlag, setRetrievedFlag] = useState(false);
  const [members, setMembers] = useState([]);
  const [pending, setPending] = useState(true);
  const [dbUsers] = useState(new FirestoreHelper.Users());
  const { approved } = props;
  
  useEffect(() => {
    async function retrieveData() {
      try {
        setRetrievedFlag(true);
        const memberList = await dbUsers.selectByApproved(approved);
        setMembers(memberList);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (retrievedFlag === false) retrieveData();
  }, [retrievedFlag, approved, dbUsers])
  
  const columns = [
    { name: 'id', selector: row => row.id, omit: true },
    { name: '이름', selector: row => row.name, sortable: true, grow: 1 },
    { name: '단체', selector: row => row.institute?.title, sortable: true, grow: 1 },
    { name: '사용자구분', selector: row => row.type, sortable: true, grow: 1 },
    { name: '이메일', selector: row => row.email, sortable: true, grow: 1 },
    { name: '연락처', selector: row => row.contact, sortable: true, grow: 1 },
  ];

  const onDelete = async (values) => {
    await dbUsers.delete(values.id);
    setRetrievedFlag(false);
  }

  const onApprove = async (values) => {
    console.log(values);
    for (const value of values) {
      await dbUsers.approveUser(value.id);
    }
    setRetrievedFlag(false);
  }
  const title = (approved) ? '승인 회원 목록' : '미승인 회원 목록';

  const buttons = (approved) ? {
    edit: '/admin/member/edit',
    delete: onDelete
  } : {
    approve: onApprove
  }

  const valueOnSelectedRow = (selectedRow) => {
    return {
      id: selectedRow.id,
      name: selectedRow.name,
      institute: selectedRow.institute,
      type: selectedRow.type,
      email: selectedRow.email,
      contact: selectedRow.contact,
    }
  }

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
        pending={pending}
        buttons={buttons}
        selectableRowsSingle={approved}
        valueOnSelectedRow={valueOnSelectedRow}
      />
    </main>
  );
}

// Refernece
// - https://react-data-table-component.netlify.app/?path=/docs/api-props--page