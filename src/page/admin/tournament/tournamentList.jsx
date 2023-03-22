import { useEffect, useState } from 'react';
import { FcInspection } from 'react-icons/fc';
import { FirestoreHelper } from '../../../utils/firebase';
import { DataTableComponent } from '../../../components/datatableComponent';

export default function TournamentList(props) {
  const [retrievedFlag, setRetrievedFlag] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [pending, setPending] = useState(true);
  const [dbTournaments] = useState(new FirestoreHelper.Tournaments());

  useEffect(() => {
    async function retrieveData() {
      try {
        setRetrievedFlag(true);
        const tournaments = await dbTournaments.selectAll();
        setTournaments(tournaments);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (retrievedFlag === false) retrieveData();
  }, [retrievedFlag, dbTournaments])
  
  const columns = [
    { name: 'id', selector: row => row.id, omit: true },
    { name: '대회명', selector: row => row.title, sortable: true, grow: 1 },
    { name: '일정', selector: row => row.date, sortable: true, grow: 1 },
    { name: '장소', selector: row => row.location, sortable: true, grow: 1 },
  ];

  const onDelete = async (values) => {
    await dbTournaments.delete(values.id);
    setRetrievedFlag(false);
  }

  const buttons = {
    edit: '/admin/member/edit',
    delete: onDelete
  }

  const valueOnSelectedRow = (selectedRow) => {
    return {
      id: selectedRow.id,
      title: selectedRow.title,
      date: selectedRow.date,
      location: selectedRow.location,
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
        title='대회 목록 조회'
        columns={columns}
        data={tournaments}
        pending={pending}
        buttons={buttons}
        valueOnSelectedRow={valueOnSelectedRow}
      />
    </main>
  );
}

// Refernece
// - https://react-data-table-component.netlify.app/?path=/docs/api-props--page