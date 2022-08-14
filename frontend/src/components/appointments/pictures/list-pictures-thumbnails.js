import React, { useMemo } from 'react';
import { Div, Img, H6 } from 'components';
import { Icon } from 'rsuite';
import { Can } from 'components/user/can';

const MAX_COUNT = 3;

const ListPicturesThumbnails = ({ pictures, onClick, onDelete }) => {
  const count = pictures.length;
  const displayedCount = count >= MAX_COUNT ? MAX_COUNT : pictures.length;
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
            <Can I="DeleteImages" an="Patient">
              <Icon
                icon="trash"
                style={{ position: 'absolute', bottom: '0px', left: '40px' }}
                onClick={() => onDelete(i)}
              ></Icon>
            </Can>
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
