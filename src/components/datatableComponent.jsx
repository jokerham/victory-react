import { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Checkbox } from '@mui/material';
import ReactLoading from 'react-loading';
import { BsCheckCircle } from 'react-icons/bs';
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
  const selectableRowsSingle = props.selectableRowsSingle ?? true;
  const customButtons = props.customButtons ?? null;

  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [rowValue, setRowValue] = useState(null);

  const handleSelectedRowChange = (state) => {
    setEditButtonDisabled(state.selectedCount === 0);
    const rowValue = 
      state.selectedCount === 0 ? null :
      state.selectedCount === 1 ? valueOnSelectedRow(state.selectedRows[0]) : 
      state.selectedRows.map((row) => { return valueOnSelectedRow(row)});
    setRowValue(rowValue);
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
  
  const DataTableButtons = (props) => {
    const customButtons = props.customButtons;
    let buttonComponents = [];

    const possiblePresetButtons = [
      { name: 'add', icon: <IoAdd />, label: '추가', toggleOnSelect: false},
      { name: 'edit', icon: <VscEdit />, label: '수정', toggleOnSelect: true},
      { name: 'delete', icon: <RiDeleteBinLine />, label: '삭제', toggleOnSelect: true},
      { name: 'approve', icon: <BsCheckCircle />, label: '승인', toggleOnSelect: true},
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
            setEditButtonDisabled(true);
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

    if (customButtons != null) {
      customButtons.forEach((customButton) => {
        if (typeof customButton.onClickHandler === 'string') {
          const pathname = customButton.onClickHandler ;
          const link = { pathname: pathname };
          buttonComponents.push(
            <Link to={link} key={customButton.name} >
              <Button variant="contained" startIcon={customButton.icon}>
                {customButton.label}
              </Button>
            </Link>
          );
        } else {
          const onClickEventHandler = (e) => {
            const callback = customButton.onClickHandler;
            callback(rowValue);
            setEditButtonDisabled(true);
          }
          buttonComponents.push(
            <Button 
              key={customButton.name} 
              variant="contained" 
              startIcon={customButton.icon} 
              disabled={customButton.toggleOnSelect && editButtonDisabled}
              onClick={onClickEventHandler}>
              {customButton.label}
            </Button>
          );
        }
      });
    }

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
            selectableRowsSingle={selectableRowsSingle}
            onSelectedRowsChange={handleSelectedRowChange}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            progressPending={pending}
            progressComponent={
              <ReactLoading type="bubbles" color="#888888" />
            }
          />
        </div>
        <DataTableButtons customButtons={customButtons}/>
      </div>
    </div>
  );
}

// Reference : 
// - https://react-data-table-component.netlify.app/
