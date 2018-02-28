import React from 'react';
import { Card, Rate } from 'antd';

const AgencyDetail = (props) => {
  return (
    <div className={'agency-detail-container'}>
      {props.agency['id'] ?
      (<Card style={{ height: 150, backgroundColor: 'inherit' }}>
          {props.agency['name'] ? <p>{props.agency['name']}</p> : ''}
          {props.agency['rating'] ? <Rate allowHalf defaultValue={props.agency['rating']} /> : ''}
          {props.agency['vicinity'] ? <p>{props.agency['vicinity']}</p> : ''}
          {props.agency['id'] ? <p>{props.agency.getDistance().toFixed(2)} miles</p> : ''}
        </Card>
      ) : (
        <Card style={{ height: 150, backgroundColor: 'inherit', textAlign:'center' }}><img
          src="https://webassets.amne.co/3.0/AmneLogo.png"
          alt="Amne Logo"  style={{width:325}}/>
        </Card>
      )}
    </div>

  );
}

export default AgencyDetail;
