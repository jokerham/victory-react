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
    { name: '체급(최소)', selector: row => row.minWeight, omit: true },
    { name: '채급(최대)', selector: row => row.maxWeight, omit: true },
    { name: '체금 증감 차이', selector: row => row.diffWeight, omit: true },
    { name: '지원 가능 체급', selector: row => row.weight, omit: true },
    { name: '경기장 수', selector: row => row.rings, omit: true },
  ];

  const onDelete = async (values) => {
    await dbTournaments.delete(values.id);
    setRetrievedFlag(false);
  }

  const buttons = {
    add: '/admin/tournament/new',
    edit: '/admin/tournament/edit',
    delete: onDelete
  }

  const valueOnSelectedRow = (selectedRow) => {
    const value = {
      id: selectedRow.id,
      title: selectedRow.title,
      date: selectedRow.date,
      location: selectedRow.location,
      minWeight: selectedRow.minWeight,
      maxWeight: selectedRow.maxWeight,
      diffWeight: selectedRow.diffWeight,
      weight: selectedRow.weight,
      rings: selectedRow.rings,
    }
    return value;
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