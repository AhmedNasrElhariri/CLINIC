import React, { useEffect, useMemo } from 'react';

import { Div, Img, H6 } from 'components';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { Icon } from 'rsuite';

const filePath = './uploads';
const MAX_COUNT = 3;
let image11 = '';
const ListPicturesThumbnails = ({ pictures, onClick, onDelete }) => {
  const count = pictures.length;
  const displayedCount = count >= MAX_COUNT ? MAX_COUNT : pictures.length;
  image11 = pictures[0]?.url;
  const rest = count - displayedCount;
  const renderedPictures = useMemo(
    () => pictures.slice(0, displayedCount),
    [displayedCount, pictures]
  );

  return (
    <Div title="Add pictures" display="flex">
      {renderedPictures.map((i, idx) => (
        <>
          <div style={{ position: 'relative' }}>
            <Img src={i.url} width={100} height={100} mr={1} key={idx} />
            <Icon
              icon="trash"
              style={{ position: 'absolute', bottom: '0px', left: '40px' }}
              onClick={() => onDelete(i)}
            ></Icon>
          </div>
        </>
      ))}
      {displayedCount > 0 ? (
        <H6 alignSelf="center" cursor="pointer" onClick={onClick}>
          Show {rest > 0 && rest} more
        </H6>
      ) : (
        <H6>No Pictures</H6>
      )}
    </Div>
  );
};

ListPicturesThumbnails.defaultProps = {
  pictures: [],
};

export default ListPicturesThumbnails;
