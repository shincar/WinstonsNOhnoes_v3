import React from 'react';
import Card from 'react-bootstrap/Card';

class WinstonsNOhnoesLoading extends React.Component {
  render() {
    return (
      <div>
        <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>Loading...</Card.Body>
        </Card>
      </div>
    );
  }
}

export default WinstonsNOhnoesLoading;