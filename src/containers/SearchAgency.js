import React from 'react'
import AddressAutocomplete from '../components/AddressAutocomplete/AddressAutocomplete';
import GoogleMapComponent from '../components/GoogleMapComponent/GoogleMapComponent';

class SearchAgency extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '', address_b: ''}
    this.onChange = (address) => {
      this.setState({ address })
    }
  }
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      type: 'search',
      placeholder: 'Search Places...',
    }
    return (
      <div>
        <AddressAutocomplete inputProps={inputProps}/>
        <GoogleMapComponent />
      </div>
    );
  }
}

export default SearchAgency
