import React, { useMemo } from 'react';

import { Div, Img, H6 } from 'components';

const MAX_COUNT = 3;

const ListImagesThumbnails = ({ images, onClick }) => {
  const count = images.length;
  const displayedCount = count >= MAX_COUNT ? MAX_COUNT : images.length;
  const rest = count - displayedCount;
  const renderedImages = useMemo(() => images.slice(0, displayedCount), [
    displayedCount,
    images,
  ]);
  return (
    <Div title="Add images" display="flex">
      {renderedImages.map((i, idx) => (
        <Img src={i.url} width={100} height={100} mr={1} key={idx} />
      ))}
      {displayedCount > 0 ? (
        <H6 alignSelf="center" cursor="pointer" onClick={onClick}>
          Show {rest > 0 && rest} more
        </H6>
      ) : (
        <H6>No Images</H6>
      )}
    </Div>
  );
};

ListImagesThumbnails.defaultProps = {
  images: [],
};

export default ListImagesThumbnails;
