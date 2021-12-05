import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import * as R from 'ramda';
import { Cascader } from 'rsuite';
import { SelectItem, ItemSelect, Item, ItemsBox, DeleteBtn } from './style';
import { getValue } from './util';

const CustomCascader = ({ choices, onChange, value, disabled, ...props }) => {
  const [selected, setSelected] = useState([]);

  const handleOnChange = useCallback(
    val => {
      const values = (value || []).filter(val => val).concat([val]);
      onChange(values);
    },
    [onChange, value]
  );

  const handleDelete = useCallback(
    idx => {
      const newSelected = R.remove(idx, 1)(value);
      onChange(newSelected);
    },
    [onChange, value]
  );

  const data = useMemo(() => R.clone(choices), [choices]);

  useEffect(() => {
    const selected = (value || []).map(val => getValue(val, data));
    setSelected(selected);
  }, [data, value]);

  return (
    <>
      {disabled ? (
        <ItemsBox>
          {selected.map((select, index) => (
            <SelectItem key={index}>
              <Item>
                {select &&
                  select.map(({ name }, i) => (
                    <ItemSelect key={i}>{name}</ItemSelect>
                  ))}
              </Item>
            </SelectItem>
          ))}
        </ItemsBox>
      ) : (
        <>
          <Cascader
            style={{ width: 300 }}
            data={data}
            value={null}
            onChange={handleOnChange}
            parentSelectable={false}
            childrenKey="choices"
            renderValue={(value, activePaths, activeItemLabel) => {}}
            {...props}
          />
          <ItemsBox>
            {selected.map((select, index) => (
              <SelectItem key={index}>
                <Item>
                  {select &&
                    select.map(({ name }, i) => (
                      <ItemSelect key={i}>{name}</ItemSelect>
                    ))}
                </Item>
                <DeleteBtn onClick={e => handleDelete(index)}>Delete</DeleteBtn>
              </SelectItem>
            ))}
          </ItemsBox>
        </>
      )}
    </>
  );
};
export default memo(CustomCascader);
