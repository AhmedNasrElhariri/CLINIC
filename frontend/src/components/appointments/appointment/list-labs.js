import React, { useState, useEffect, useMemo } from 'react';
import { FlexboxGrid, List } from 'rsuite';
import { H4 } from 'components';
const ListLabs = ({ data }) => {
  const [add, setAdd] = useState(false);

  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
  };

  const btnAdd = {
    fontSize: '1rem',
    color: '#fff',
    borderRadius: '5px',
  };

  const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 500,
  };
  /*  const handelAdd = (idx)=>{
    if(id === idx){
      setAdd(!add)
    }
  } */
  const ToggleableImage = () => {
    const [isVisible, setVisibility] = useState(false);

    const toggleVisibility = () => {
      console.log('add');
      setVisibility(!isVisible);
    };

    return isVisible ? (
      <button onClick={toggleVisibility} style={btnAdd}>
        Added
      </button>
    ) : (
      <button
        onClick={toggleVisibility}
        style={{ ...btnAdd, background: 'rgb(81 198 243)' }}
      >
        Add
      </button>
    );
  };
  return (
    <List>
      {data.map((item, index) => (
        <List.Item key={item} index={item.id}>
          <FlexboxGrid>
            {/*base info*/}
            <FlexboxGrid.Item
              colspan={20}
              style={{
                ...styleCenter,
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden',
              }}
            >
              <H4 style={titleStyle}>{item.title}</H4>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item
              colspan={4}
              style={{
                ...styleCenter,
                justifyContent: 'flex-end',
              }}
            >
              {ToggleableImage()}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );
};
export default ListLabs;
