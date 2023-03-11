import { useState, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Checkbox } from '@mui/material';
import ReactLoading from 'react-loading';
import { IoAdd } from 'react-icons/io5';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBinLine } from 'react-icons/ri';

export const DataTableComponent = (props) => {
  const title = props.title
  const columns = props.columns;
  const data = props.data;
  const pending = props.pending;
  const addButtonClickHandler = props.addButtonClickHandler;
  const modifyButtonClickHandler = props.modifyButtonClickHandler;
  const deleteButtonClickHandler = props.deleteButtonClickHandler;

  const [editButtonDisabled, setEditButtonDisabled] = useState(true);

  const handleSelectedRowChange = useCallback((state) => {
    setEditButtonDisabled(state.selectedCount == 0);
  });

  const paginationComponentOptions = {
    rowsPerPageText: '페이지당 조회 갯수',
    rangeSeparatorText: '중',
    selectAllRowsItem: true,
    selectAllRowsItemText: '전체',
  }

  const NoData = () => {
    return (
      <div className='page-body__card_datatable_noData'>
        조회 할 데이터 없습니다.
      </div>
    );
  }
  
  const DataTableButtons = () => {
    let buttons = [];

    if (addButtonClickHandler != null) {
      buttons.push(
        <Button variant="contained" id="datatable_button_add" startIcon={<IoAdd />}>추가</Button>
      );
    }

    if (modifyButtonClickHandler != null) {
      buttons.push(
        <Button variant="contained" id="datatable_button_modify" startIcon={<VscEdit />} disabled={editButtonDisabled}>수정</Button>
      );
    }

    if (deleteButtonClickHandler != null) {
      buttons.push(
        <Button variant="contained" id="datatable_button_delete" startIcon={<RiDeleteBinLine />} disabled={editButtonDisabled}>삭제</Button>
      );
    }

    return (
      <div className="page-body__card_buttons">
        {buttons}
      </div>
    )
  }

  return (
    <div className="page-body">
      <div className="page-body__card">
        <div className="page-body__card_datatable">
          <DataTable
            title={title}
            noDataComponent={<NoData />}
            columns={columns}
            data={data}
            persistTableHead={true}
            noContextMenu={true}
            selectableRows={true}
            selectableRowsHighlight={true}
            selectableRowsComponent={Checkbox}
            selectableRowsSingle={true}
            onSelectedRowsChange={handleSelectedRowChange}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            progressPending={pending}
            progressComponent={
              <ReactLoading type="bubbles" color="#888888" />
            }
          />
        </div>
        <DataTableButtons />
      </div>
    </div>
  );
}

// Reference : 
// - https://react-data-table-component.netlify.app/
