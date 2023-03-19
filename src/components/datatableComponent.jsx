import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const buttons = props.buttons;
  const valueOnSelectedRow = props.valueOnSelectedRow;

  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [rowValue, setRowValue] = useState({});

  const handleSelectedRowChange = (state) => {
    setEditButtonDisabled(state.selectedCount === 0);
    setRowValue(
      state.selectedCount === 0 ?
        '' : valueOnSelectedRow(state.selectedRows[0]));
  };

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
    let buttonComponents = [];

    const possiblePresetButtons = [
      { name: 'add', icon: <IoAdd />, label: '추가', toggleOnSelect: false},
      { name: 'edit', icon: <VscEdit />, label: '수정', toggleOnSelect: true},
      { name: 'delete', icon: <RiDeleteBinLine />, label: '삭제', toggleOnSelect: true},
    ];

    possiblePresetButtons.forEach((presetButton) => {
      if (buttons.hasOwnProperty(presetButton.name)) {
        if (typeof buttons[presetButton.name] === 'string') {
          const pathname = buttons[presetButton.name];
          const link = { pathname: pathname };
          const state = (editButtonDisabled) ? {} : rowValue;
          buttonComponents.push(
            <Link to={link} state={state} key={presetButton.name} >
              <Button 
                variant="contained" 
                startIcon={presetButton.icon} 
                disabled={presetButton.toggleOnSelect && editButtonDisabled}>
                {presetButton.label}
              </Button>
            </Link>
          );
        } else {
          const onClickEventHandler = (e) => {
            const callback = buttons[presetButton.name];
            callback(rowValue);
          }
          buttonComponents.push(
            <Button 
              key={presetButton.name} 
              variant="contained" 
              startIcon={presetButton.icon} 
              disabled={presetButton.toggleOnSelect && editButtonDisabled}
              onClick={onClickEventHandler}>
              {presetButton.label}
            </Button>
          );
        }
      }
    })

    return (
      <div className="page-body__card_buttons">
        {buttonComponents}
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
