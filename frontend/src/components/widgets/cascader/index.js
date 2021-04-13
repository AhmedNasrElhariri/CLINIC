import React, { useState } from 'react';
import { Cascader } from 'rsuite';
import { SelectItem, ItemSelect, Item, ItemsBox, DeleteBtn } from './style';

const data = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            code: 752100,
          },
          {
            value: 'fgre',
            label: 'good help',
            code: 752100,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            code: 453400,
          },
        ],
      },
    ],
  },
  {
    value: 'ششش',
    label: 'Jiangsu',
    children: [
      {
        value: 'سس',
        label: 'Nanjing',
        children: [
          {
            value: 'ؤؤؤ',
            label: 'Zhong Hua Men',
            code: 453400,
          },
        ],
      },
    ],
  },
];
const CustomNestedSelect = ({ customItems }) => {
  const [activeItems, setActiveItems] = useState([]);
  const handelSelect = (item, activePaths, concat, event) => {
    setActiveItems(activePaths);
  };
  const handelClose = () => {
    customItems(activeItems);
  };

  return (
    <>
      <Cascader
        style={{ width: '300px' }}
        data={data}
        onSelect={handelSelect}
        onClose={handelClose}
      />
    </>
  );
};

const CustomizedCascader = () => {
  const [selected, setSelected] = useState([]);
  const customSelect = items => {
    setSelected([...selected, items]);
  };
  const handleDelete = idx => {
    setSelected(selected.filter((item, index) => index !== idx));
  };
  return (
    <>
      <CustomNestedSelect customItems={customSelect} />
      {selected.length > 0 && (
        <ItemsBox>
          {selected.map((select, index) => {
            return (
              <SelectItem>
                <Item key={index}>
                  {select &&
                    select.map(({ label, i }) => (
                      <ItemSelect key={i}>{label}</ItemSelect>
                    ))}
                </Item>
                <DeleteBtn onClick={e => handleDelete(index)}>Delete</DeleteBtn>
              </SelectItem>
            );
          })}
        </ItemsBox>
      )}
    </>
  );
};
export default CustomizedCascader;
