import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {Row, Col} from 'antd';
import {Button, Icon} from 'antd';

const AddressAutocomplete = (props) => {
  const styles = {
    input: {
      padding: '2px',
      width: '100%',
      border: '1px solid #e8e8e8',
      borderRadius: '4px'
    },
    autocompleteContainer: {
      position: 'absolute',
      top: '100%',
      backgroundColor: 'white',
      border: '1px solid #555555',
      width: '100%',
      zIndex: '1'
    },
    autocompleteItem: {
      backgroundColor: '#ffffff',
      padding: '5px',
      color: '#555555',
      cursor: 'pointer'
    }
  };

  const renderSuggestion = (
    { suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>
  );

  const inputs = ['A', 'B'].map((inputName) =>
  <div key={inputName}>
    <Row align="middle">
      <Col span={20}>
        <PlacesAutocomplete inputProps={props.inputProps[inputName]}
          styles={styles} renderSuggestion={renderSuggestion}/>
      </Col>
      <Col span={1} style={{
          marginLeft: 2
        }}>
        <Button style={{
            height: 26,
            textAlign: 'center'
          }}
          onClick={(e) => props.handleClearInput(e, inputName)}
          ><Icon type="close"/></Button>
      </Col>
    </Row>
    {
      true ? '' :
      <span style={{color: '#f5222d'}}>Only accept Austin address</span>
    }
    </div>
  );
  const addresses = {
    A: props.inputProps.A.value,
    B: props.inputProps.B.value
  }
  return (<div>
    <Row type="flex" justify="center" align="middle" style={{
        marginBottom: 10
      }}>
      <Col xs={4} md={6} lg={8}>
        {inputs}
      </Col>
      <Col>
        <Button disabled={ !addresses.A || !addresses.B } type="primary" onClick={(e) => props.handleAgencySearch(e)}><Icon type="search"/></Button>
      </Col>
    </Row>
  </div>);
}

export default AddressAutocomplete;
