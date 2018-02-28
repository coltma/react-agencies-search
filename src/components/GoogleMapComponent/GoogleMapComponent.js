import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import AgencyList from '../AgencyList/AgencyList';
import AgencyDetail from '../AgencyDetail/AgencyDetail';

// center austin 30.3116157,-97.7398554
// distance: 27km

const MapWithAMarker = withGoogleMap((props) => {
  const addrPos = {...props.addrPos};
  console.log(props);
  console.log(addrPos);
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 30.3116157, lng: -97.7398554}}
    >{addrPos.A ? <Marker
      position={{ lat: addrPos.A.lat, lng:  addrPos.A.lng }}
      label="A"
      onClick={(e) => {console.log(e)}}
    /> : ''}
    {addrPos.B ? <Marker
      position={{ lat: addrPos.B.lat, lng:  addrPos.B.lng }}
      label="B"
      onClick={(e) => {console.log(e)}}
    /> : ''}
    </GoogleMap>
  );
});

class GoogleMapComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
    }
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <div>
        <Row  type="flex" justify="center" >
            <Col xs={10} md={10} lg={10}>
              <MapWithAMarker
                addrPos={this.props.addrPos}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col xs={5} md={5} lg={5} style={{marginLeft: 5}}>
              <Row>
                <AgencyDetail/>
              </Row>
              <Row>
                <AgencyList />
              </Row>
            </Col>
        </Row>

      </div>

    )
  }
}

GoogleMapComponent.propTypes = {
  addrPos: PropTypes.object,
}

export default GoogleMapComponent;
