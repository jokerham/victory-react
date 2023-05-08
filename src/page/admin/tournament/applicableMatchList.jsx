import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreHelper } from '../../../utils/firebase';
import { DataTableComponent } from '../../../components/datatableComponent';
import { FcInspection } from 'react-icons/fc';
import { IoPersonAdd } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa';

export default function ApplicableMatcheList() {
  const [retrievedFlag, setRetrievedFlag] = useState(false);
  const [applicableMatches, setApplicableMatches] = useState([]);
  const [pending, setPending] = useState(true);
  const [tournamentTitle, setTournamentTitle] = useState("");
  const [dbTournaments] = useState(new FirestoreHelper.Tournaments());
  const [dbApplicableMatches] = useState(new FirestoreHelper.ApplicableMatches());
  const params = useParams();
  const tournamentId = params.id;

  useEffect(() => {
    async function getTournamentInfo() {
      try {
        const tournament = await dbTournaments.selectById(tournamentId);
        setTournamentTitle(tournament.title);
      } catch (error) {
        console.log(error);
      }
    }

    getTournamentInfo();
  }, [tournamentId, dbTournaments])

  useEffect(() => {
    async function retrieveData() {
      try {
        setRetrievedFlag(true);
        const applicableMatches = await dbApplicableMatches.selectAll(tournamentId);
        setApplicableMatches(applicableMatches);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (retrievedFlag === false) retrieveData();
  }, [retrievedFlag, tournamentId, dbApplicableMatches])
  
  const columns = [
    { name: 'id', selector: row => row.id, omit: true },
    { name: '구분', selector: row => row.matchType, sortable: true, grow: 1 },
    { name: '체급', selector: row => row.weight, sortable: true, grow: 1 },
    { name: '대전종류', selector: row => row.tournamentType, sortable: true, grow: 1 },
    { name: '경기시간', selector: row => row.duration, sortable: true, grow: 1 },
    { name: '라운드 수', selector: row => row.rounds, sortable: true, grow: 1 },
    { name: '참가자수', selector: row => row.users.length, sortable: true, grow: 1 },
  ];

  const onDelete = async (values) => {
    console.log(values)
    await dbApplicableMatches.delete(values.id);
    setRetrievedFlag(false);
  }

  const buttons = {
    add: '/admin/tournament/' + tournamentId + '/applicableMatches/new',
    edit: '/admin/tournament/' + tournamentId + '/applicableMatches/edit',
    copy: '/admin/tournament/' + tournamentId + '/applicableMatches/copy',
    delete: onDelete,
  }

  const valueOnSelectedRow = (selectedRow) => {
    const value = {
      id: selectedRow.id,
      matchType: selectedRow.matchType,
      weight: selectedRow.weight,
      tournamentType: selectedRow.tournamentType,
      rounds: selectedRow.rounds,
      duration: selectedRow.duration,
    }
    return value;
  }

  const registerUser = async (values) => {
  }

  const customButtons = [{
    name: 'register',
    label: '참가신청',
    icon: <IoPersonAdd />,
    toggleOnSelect: false,
    onClickHandler: registerUser
  },{
    name: 'cancel',
    label: '취소',
    icon: <FaUndoAlt />,
    toggleOnSelect: true,
    onClickHandler: '/admin/tournament'
  }];

  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          대회 관리 : { tournamentTitle }
        </div>
      </div>
      <DataTableComponent 
        title='대전 목록 조회'
        columns={columns}
        data={applicableMatches}
        pending={pending}
        buttons={buttons}
        customButtons={customButtons}
        valueOnSelectedRow={valueOnSelectedRow}
      />
    </main>
  );
}