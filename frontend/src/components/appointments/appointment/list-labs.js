import React, { useState, useEffect, useMemo } from "react";
import { FlexboxGrid, List } from "rsuite";
import { H4 } from "components";
const ListLabs = ({ data }) => {
  const [add, setAdd] = useState(false);

  const styleCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
  };

  const btnAdd = {
    fontSize: "1rem",
    color: "#fff",
    borderRadius:"5px",
    
  };

  const titleStyle = {
    paddingBottom: 5,
    whiteSpace: "nowrap",
    fontWeight: 500,
  };
 /*  const handelAdd = (idx)=>{
    if(id === idx){
      setAdd(!add)
    }
  } */
  return (
    <List >
      {data.map((item, index) => (
        <List.Item key={item} index={index}>
          <FlexboxGrid>
            {/*base info*/}
            <FlexboxGrid.Item
              colspan={20}
              style={{
                ...styleCenter,
                flexDirection: "column",
                alignItems: "flex-start",
                overflow: "hidden",
              }}
            >
              <H4 style={titleStyle}>{item}</H4>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item
              colspan={4}
              style={{
                ...styleCenter,
                justifyContent: "flex-end",
              }}
            >
              {add ? (
                <button onClick={(e)=>setAdd(!add)} style={{...btnAdd,background: "rgb(81 198 243)"}}>Add</button>
              ) : (
                <button  onClick={(e)=>setAdd(!add)} style={btnAdd} >Added</button>
              )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );
};
export default ListLabs;
