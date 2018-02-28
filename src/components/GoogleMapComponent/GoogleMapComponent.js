import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import AgencyList from '../AgencyList/AgencyList';
import AgencyDetail from '../AgencyDetail/AgencyDetail';
import './GoogleMapComponent.css';

// center austin 30.3116157,-97.7398554
// distance: 27km

const MapWithAMarker = withGoogleMap((props) => {
  const addrPos = {...props.addrPos};
  console.log(props);
  console.log(addrPos);
  console.log(props.sortedAgencyList);
  const agencies = props.sortedAgencyList.map((agencyItem, index) =>
      <Marker
        key={agencyItem.id}
        position={{ lat: agencyItem.location.lat, lng: agencyItem.location.lng }}
        label={`${index + 1}`}
        onClick={(e) => {console.log(e)}}
      />
  );

  return (
    <GoogleMap
      defaultZoom={10}
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
    {agencies}
    </GoogleMap>
  );
});

class GoogleMapComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      agency:{}
    }
  }

  // componentDidMount() {
  //   this.delayedShowMarker()
  // }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 3000)
  // }
  //
  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  handleAgencySelect = (e, agency) => {
    e.preventDefault();
    console.log('get agency' + agency);
    this.setState({agency});
  }

  render() {
    let list = [];

    return (
      <div>
        <Row  type="flex" justify="center" className="animate-pop-in">
            <Col xs={10} md={10} lg={10}>
              <MapWithAMarker
                addrPos={this.props.addrPos}
                sortedAgencyList={this.props.sortedAgencyList}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col xs={7} md={7} lg={7} style={{marginLeft: 5}}>
              <Row>
                <AgencyDetail
                  agency={this.state.agency}/>
              </Row>
              <Row >
                <AgencyList
                  sortedAgencyList={this.props.sortedAgencyList}
                  handleAgencySelect={this.handleAgencySelect}/>
              </Row>
            </Col>
        </Row>

      </div>

    )
  }
}

GoogleMapComponent.propTypes = {
  addrPos: PropTypes.object,
  agencyList: PropTypes.array,
}

export default GoogleMapComponent;
