import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';

const AddressAutocomplete = (props) => {
  const styles = {
    input: {
      padding:'2px',
      width:'100%',
    }
  }
  return (
    <div>
      <Row type="flex" justify="center" align="middle">
        <Col xs={6} md={6} lg={6}>
          <Row>
            <PlacesAutocomplete
              inputProps={props.inputProps}
              styles={styles}/>
          </Row>
          <Row>
            <PlacesAutocomplete
              inputProps={props.inputProps}
              styles={styles}/>
          </Row>
        </Col>
        <Col xs={{ span: 2, offset: 1 }} md={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 1 }}>
          <Button type="primary"><Icon type="search" /></Button>
        </Col>
      </Row>

      <p />
    </div>
  );
}

export default AddressAutocomplete;
