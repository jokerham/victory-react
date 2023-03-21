import { useEffect, useState } from 'react';
import { FcInspection } from 'react-icons/fc';
import { FirestoreHelper } from '../../../utils/firebase';
import { DataTableComponent } from '../../../components/datatableComponent';

export default function InstituteList() {
  const [retrievedFlag, setRetrievedFlag] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [pending, setPending] = useState(true);

  const DbInstitutes = new FirestoreHelper.Institutes();

  useEffect(() => {
    async function retrieveData() {
      try {
        setRetrievedFlag(true);
        const instituteList = await DbInstitutes.selectAll();
        setInstitutes(instituteList);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    }
    
    if (retrievedFlag === false) retrieveData();
  }, [retrievedFlag])

  const columns = [
    { name: 'id', selector: row => row.id, omit: true },
    { name: '단체명', selector: row => row.title, sortable: true, grow: 1 },
    { name: '대표자', selector: row => row.user?.name, sortable: true, grow: 1 },
    { name: '등록일', selector: row => row.date, sortable: true, grow: 1 },
    { name: '주소', selector: row => row.location, sortable: true, grow: 4 },
  ];

  const onDelete = async (values) => {
    await DbInstitutes.delete(values.id);
    setRetrievedFlag(false);
  }

  const buttons = {
    add: '/admin/institute/new',
    edit: '/admin/institute/edit',
    delete: onDelete,
  }

  const valueOnSelectedRow = (selectedRow) => {
    return {
      id: selectedRow.id,
      title: selectedRow.title,
      location: selectedRow.location,
      userId: selectedRow.userId,
      name: selectedRow.user?.name,
    }
  }

  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          단체 관리
        </div>
      </div>
      <DataTableComponent 
        title='단체 목록'
        columns={columns}
        data={institutes}
        pending={pending}
        buttons={buttons}
        valueOnSelectedRow={valueOnSelectedRow}
      />
    </main>
  );
}
