import React, { useCallback, useMemo, useState } from 'react';
import { Table, Button, SelectPicker } from 'rsuite';
import { nanoid } from 'nanoid';
import { CRModal } from 'components';
import {
  CHECK_FIELD_TYPE,
  FIELD_TYPES,
  NESTED_SELECTOR_FIELD_TYPE,
  RADIO_FIELD_TYPE,
  SELECTOR,
  SELECTOR_WITH_INPUT,
} from 'utils/constants';
import Choices from './choices';
import { useModal } from 'hooks';

const { Cell, Column, HeaderCell } = Table;

const generateCol = () => ({
  id: nanoid(),
  name: '',
  type: null,
  dynamic: false,
  choices: [],
});

export const TextEditCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === 'EDIT';
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={event => onChange(rowData.id, dataKey, event.target.value)}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

export const SelectEditCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === 'EDIT';
  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <SelectPicker
          data={FIELD_TYPES}
          style={{ width: 224 }}
          onChange={value => onChange(rowData.id, dataKey, value)}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

export const InfoCell = ({ rowData, dataKey, onClick, ...props }) => {
  const hasChoices = [
    RADIO_FIELD_TYPE,
    CHECK_FIELD_TYPE,
    NESTED_SELECTOR_FIELD_TYPE,
    SELECTOR_WITH_INPUT,
    SELECTOR,
  ].includes(rowData.type);

  return (
    <Cell {...props}>
      <Button
        appearance="link"
        onClick={() => onClick(rowData, props.rowIndex)}
      >
        {hasChoices ? 'Choices +' : ''}
      </Button>
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props}>
      <Button appearance="link" onClick={() => onClick(rowData.id)}>
        {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
      </Button>
    </Cell>
  );
};

function TableRows({ visible, onOk, onClose, value }) {
  const [data, setData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const { visible: choicesVisible, open, close } = useModal();

  const handleChange = useCallback((id, key, value) => {
    setData(data => {
      const nextData = Object.assign([], data);
      nextData.find(item => item.id === id)[key] = value;
      return nextData;
    });
  }, []);

  const handleEditState = useCallback(id => {
    setData(data => {
      const nextData = Object.assign([], data);
      const activeItem = nextData.find(item => item.id === id);
      activeItem.status = activeItem.status ? null : 'EDIT';
      return nextData;
    });
  }, []);

  const handleClickChoices = useCallback((_, index) => {
    setSelectedRowIndex(index);
    open();
  }, []);

  const handleAddCol = useCallback(() => {
    setData([...data, generateCol()]);
  }, [data]);

  const handleOnOk = useCallback(() => {}, [data, onOk]);

  const selectedRow = useMemo(
    () => data[selectedRowIndex],
    [data, selectedRowIndex]
  );

  const updateSelecedRow = useCallback(
    (prop, value) => {
      console.log(value);
      setData(data => {
        const nextData = data.map((row, index) =>
          index === selectedRowIndex ? { ...row, [prop]: value } : row
        );
        console.log(nextData);
        return nextData;
      });
    },
    [selectedRowIndex]
  );

  console.log(selectedRow);

  return (
    <>
      <CRModal
        show={visible}
        header="Choices"
        onOk={handleOnOk}
        onHide={onClose}
        onCancel={onClose}
        style={{ width: 900, marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Button onClick={handleAddCol}>Add</Button>
        <Table height={420} data={data}>
          <Column width={250}>
            <HeaderCell>Name</HeaderCell>
            <TextEditCell dataKey="name" onChange={handleChange} />
          </Column>

          <Column width={250}>
            <HeaderCell>Type</HeaderCell>
            <SelectEditCell dataKey="type" onChange={handleChange} />
          </Column>

          <Column width={150}>
            <HeaderCell>Info</HeaderCell>
            <InfoCell dataKey="info" onClick={handleClickChoices} />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Action</HeaderCell>
            <ActionCell dataKey="id" onClick={handleEditState} />
          </Column>
        </Table>
      </CRModal>
      {choicesVisible && (
        <Choices
          onOk={val => {
            updateSelecedRow('choices', val);
            close();
          }}
          onClose={close}
          dynamic={selectedRow.dynamic}
          onToggle={val => updateSelecedRow('dynamic', val)}
          choices={selectedRow.choices}
          visible
        />
      )}
    </>
  );
}

export default TableRows;
