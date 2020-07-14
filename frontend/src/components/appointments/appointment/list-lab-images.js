import React from 'react';
import { Grid, Row, Col } from 'rsuite';

import { Img } from 'components';

function ListLabImages({ images }) {
  return (
    <Grid fluid>
      <Row className="show-grid">
        {images.map(img => (
          <Col xs={12} key={img.id}>
            <Img src={img.url} alt="" width="100%" />
          </Col>
        ))}
      </Row>
    </Grid>
  );
}

ListLabImages.defaultProps = {
  images: [],
};

export default ListLabImages;
