import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcInspection } from 'react-icons/fc';
import { getInstituteList } from '../../../utils/firebase';
import { DataTableComponent } from '../../../components/datatableComponent';

export default function InstituteList() {
  const [retrievedFlag, setRetrievedFlag] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function retrieveData() {
      try {
        setRetrievedFlag(true);
        const instituteList = await getInstituteList();
        setInstitutes(instituteList);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    }
    
    if (retrievedFlag === false) {
       retrieveData(); 
    }
  }, [retrievedFlag])

  const addButtonClickHandler = ((e) => {
    navigate('/institute/new');
  });
  
  const modifyButtonClickHandler = ((e) => {
    navigate('/institute/edit');
  });

  const deleteButtonClickHandler = ((e) => {

  });


  const columns = [
    { name: 'id', selector: row => row.id, omit: true },
    { name: '단체명', selector: row => row.title, sortable: true, grow: 1 },
    { name: '대표자', selector: row => row.user?.name, sortable: true, grow: 1 },
    { name: '등록일', selector: row => row.date, sortable: true, grow: 1 },
    { name: '주소', selector: row => row.location, sortable: true, grow: 4 },
  ];

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
        addButtonClickHandler={addButtonClickHandler}
        modifyButtonClickHandler={modifyButtonClickHandler}
        deleteButtonClickHandler={deleteButtonClickHandler}
      />
    </main>
  );
}
