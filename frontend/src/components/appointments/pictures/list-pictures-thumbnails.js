import React, { useMemo } from 'react';

import { Div, Img, H6 } from 'components';

const MAX_COUNT = 3;

const ListPicturesThumbnails = ({ pictures, onClick }) => {
  const count = pictures.length;
  const displayedCount = count >= MAX_COUNT ? MAX_COUNT : pictures.length;
  const rest = count - displayedCount;
  const renderedPictures = useMemo(() => pictures.slice(0, displayedCount), [
    displayedCount,
    pictures,
  ]);
  return (
    <Div title="Add pictures" display="flex">
      {renderedPictures.map((i, idx) => (
        <Img src={i.url} width={100} height={100} mr={1} key={idx} />
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
