import React, { useState, useRef, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import { Div } from 'components';
import ListImagesThumbnails from './list-images-thumbnails';

const AppointmentGallery = ({ images }) => {
  const [galleryVisibility, setGalleryVisibility] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.fullScreen();
    }
  }, [galleryVisibility]);

  return (
    <Div>
      <ListImagesThumbnails
        images={images}
        onClick={() => setGalleryVisibility(true)}
      />
      {galleryVisibility && (
        <ImageGallery
          items={images}
          ref={ref}
          useBrowserFullscreen={false}
          showPlayButton={false}
          showBullets={true}
          showThumbnails={false}
          renderItem={a => (
            <Div>
              <img className="image-gallery-image" src={a.url} alt="" />
              <span className="image-gallery-description">
                <h6>{a.caption}</h6>
                <h6>{a.description}</h6>
              </span>
            </Div>
          )}
          onScreenChange={isFull => {
            if (!isFull) {
              setGalleryVisibility(false);
            }
          }}
        />
      )}
    </Div>
  );
};

export default AppointmentGallery;
