import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable  } from 'components';


function ListImages({ images, onEdit }) {
  const data = [
    {
      id: "1",
      imageName:"sss",
    },
    {
      id: "1",
      imageName:"xxx",
    }

  ]
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={data}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Image Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="imageName" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn >
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
            {data => <Icon icon="edit"  onClick={() => onEdit(data)} style={{fontSize:17, padding:5 ,borderRadius:"5px", backgroundColor:"rgb(224, 224, 222)"}}> Edit</Icon>}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn >
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => <Icon icon="trash" onClick={() => onEdit(data)} style={{fontSize:17 , padding:5, borderRadius:5, backgroundColor:"rgb(224, 224, 222)" }} > Delete</Icon>}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          
        </CRTable>
      </CRCard>
    </>
  );
}



export default ListImages;
