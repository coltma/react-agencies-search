import React from 'react'
import AddressAutocomplete from '../components/AddressAutocomplete/AddressAutocomplete';
import GoogleMapComponent from '../components/GoogleMapComponent/GoogleMapComponent';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import AgencyItem from '../classes/AgencyItem';
import { getDistance } from '../utils/GeoHelper.js';
import reqwest from 'reqwest';
import { message } from 'antd';

const MIN_RADIUS = 10; //MILES
class SearchAgency extends React.Component {
  constructor(props) {
    super(props)
    // addrPos = [A => {lat: 1, lng: 2}, B => {lat: 3, lng: 4}];
    this.state = {
      addrA: '',
      addrB: '',
      addrPos: {},
      agencyListA: [],
      agencyListB: [],
      sortedAgencyList: [],
    };
  }

  componentDidMount() {

  }

  onChangeAddrA = (addrA) => {
    this.setState({addrA})
  }

  onChangeAddrB = (addrB) => {
    this.setState({addrB})
  }

  // TODO: simplify
  handleAgencySearch = (e) => {
    e.preventDefault();
    message.loading('loading data', 1);
    const addrA = this.state.addrA;
    const addrB = this.state.addrB;
    this.prepareListData(addrA, 'A');
    this.prepareListData(addrB, 'B');
  }

  // who = 'A' or 'B'
  prepareListData = (addr, who) => {
    geocodeByAddress(addr)
    .then(results => {
      if (!results[0]) {
        message.warning('Could not find address of ' + who, 1.5);
        // this.clearAorBState(who);
      } else {
        let austin = -1;
        let texas = -1;
        results[0].address_components.map((obj) => {
          if (Object.values(obj).indexOf('Austin') !== -1) {
            austin = 1;
          }
          if (Object.values(obj).indexOf('Texas') !== -1) {
            texas = 1;
          }

        });
        if (austin === -1 || texas === -1) {
          message.error('Address of ' + who + ' should be within Austin, TX.', 1.5);
          this.clearAorBState(who);
        } else {
          return getLatLng(results[0]);
        }
      }
    })
    .then(latLng => {
      const addrPos = {
        ...this.state.addrPos
      };
      console.log('Success' + who + ':', latLng);
      if (latLng) {
        addrPos[who] = {
          lat: latLng.lat,
          lng: latLng.lng
        }
        this.setState({addrPos});
        this.getNearByPlaces('agencyList' + who, latLng);
      }
    }).catch(error => {
      console.error('Error:', error);
      message.error('Locate Address fail.', 1.25);
    });
  }

  clearAorBState = (who) => {
    this.setState((prevState) => {
      if (who === 'A') {
        const addrPos = { ...prevState.addrPos };
        addrPos['A'] = {};
        return  {
          addrA: '',
          agencyListA: [],
          sortedAgencyList: [],
        };
      } else if (who === 'B') {
        const addrPos = { ...prevState.addrPos };
        addrPos['B'] = {};
        return {
         addrB: '',
         agencyListB: [],
         sortedAgencyList: [],
       };
      }
    });
  }

  getNearByPlaces = (listName, latLng) => {
   const api = "http://cs571.us-east-1.elasticbeanstalk.com/googleplacenear?";
   let url = api + 'location=' + latLng.lat + ',' + latLng.lng;
   url += '&type=real_estate_agency&radius=16093.4';
   this.getData(url, (res) => {
     console.log(res);
     this.loadAgencyList(listName, res, latLng);
   })
  }

  getData = (url, callback) => {
    return reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res.results);
      },
      error: (err) => {
        console.log(err);
        message.error('Fet google places data fail.', 1.25);
      }
    });
  }

  loadAgencyList = (listName, data, orgLocation) => {
    let tmpList = [];
    data.map((item) => {
      let agencyItem = new AgencyItem(item);
      if (listName === 'agencyListA') {
        agencyItem.d2a = getDistance(agencyItem.location, orgLocation);
      } else if (listName === 'agencyListB') {
        agencyItem.d2b = getDistance(agencyItem.location, orgLocation);
      }
      tmpList.push(agencyItem);
    })
    console.log('loadAgencyList:' + listName + ',' + tmpList.length)
    this.setState((prevState) => {
      return {[listName]: tmpList};
    });
    const listA = this.state.agencyListA;
    const listB = this.state.agencyListB;
    // update
    const dedupedList = this.deduplicate(listA, listB);
    this.completementDistance(dedupedList);
    this.sortListByDistance(dedupedList);
    let finalList = this.withinDistance(dedupedList);
    this.setState((prevState) => {
        return {sortedAgencyList: finalList}
    });
  }

  withinDistance = (list) => {
    let res = [];
    list.filter(item => {
      return Number.parseFloat(item.getDistance()) <= Number.parseFloat(MIN_RADIUS)
    }).map(item => res.push(item));
    return res;
  }

  completementDistance = (list) => {
    const posA = this.state.addrPos.A;
    const posB = this.state.addrPos.B;
    if (posA) {
      // d2a
      for (const item in list) {
        if (item.d2a === 0) {
          item.d2a = getDistance(item.location, posA);
        }
      }
    }
    if (posB) {
      // d2b
      for (const item in list) {
        if (item.d2b === 0) {
          item.d2b = getDistance(item.location, posB);
        }
      }
    }
  }

  sortListByDistance = (list) => {
    // .getDistance() return sum of distance to a and b.
    list.sort((left, right) => {
      const dl = Number.parseFloat(left.getDistance());
      const dr = Number.parseFloat(right.getDistance());
      if (dl < dr) {
        return -1;
      }
      if (dl > dr) {
        return 1;
      }
      return 0;
    });
  }

  sortListById = (list) => {
    list.sort((left, right) => {
      if (left.id < right.id) {
        return -1;
      }
      if (left.id > right.id) {
        return 1;
      }
      return 0;
    });
  }

  deduplicate = (listA, listB) => {
      this.sortListById(listA);
      this.sortListById(listB);
      return this.mergeList(listA, listB);
  }

  mergeList = (listA, listB) => {
    let a = 0;
    let b = 0;
    let i = 0;
    let mergedList = []

    while (a < listA.length && b < listB.length) {
        if (listA[a].id === listB[b].id) {
          mergedList[i++] = listA[a];
          a++;
          b++;
        } else if (listA[a].id < listB[b].id) {
          mergedList[i++] = listA[a++];
        } else {
          mergedList[i++] = listB[b++];
        }
    }
    while (a < listA.length) {
      mergedList[i++] = listA[a++];
    }
    while (b < listB.length) {
      mergedList[i++] = listB[b++];
    }
    return mergedList;
  }

  handleClearInput = (e, who) => {
    e.preventDefault();
    if (who === 'A') {
      const addrPos = { ...this.state.addrPos }
      addrPos['A'] = '';
      this.setState({addrA: '', addrPos});
    } else if (who === 'B') {
      const addrPos = { ...this.state.addrPos }
      addrPos['B'] = '';
      this.setState({addrB: '', addrPos});
    }
  }

  render() {
    const inputProps = {
      A: {
        value: this.state.addrA,
        onChange: this.onChangeAddrA,
        type: 'search',
        placeholder: 'Type address A'
      },
      B: {
        value: this.state.addrB,
        onChange: this.onChangeAddrB,
        type: 'search',
        placeholder: 'Type address B'
      }
    };
    return (<div style={{paddingTop: 20}}>
      <form>
        <AddressAutocomplete
          inputProps={inputProps}
          handleAgencySearch={this.handleAgencySearch}
          handleClearInput={this.handleClearInput}/>
      </form>
      <GoogleMapComponent addrPos={this.state.addrPos}
        sortedAgencyList={this.state.sortedAgencyList}
      />
    </div>);
  }
}

export default SearchAgency;
