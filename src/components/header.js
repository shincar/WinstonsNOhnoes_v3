import React from 'react';
import Card from 'react-bootstrap/Card';

class Header extends React.Component {
  render() {
    return (
    <div>
      <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>
          <h1>Winstons & Ohnoes</h1>
          <p>
            A advance Tic-Tak-Toe game
          </p>
          </Card.Body>
        </Card>
    </div>)
  }
}

export default Header;