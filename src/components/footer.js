import React from 'react';
import Card from 'react-bootstrap/Card';

class Footer extends React.Component {
  render() {
    return (
        <div>
          <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
            <Card.Body>
            <strong>Copyright @ Adam & Alvin's Fun Lab</strong>
            </Card.Body>
          </Card>
        </div>)
  }
}

export default Footer;