import React from 'react';
import Card from 'react-bootstrap/Card';

class Footer extends React.Component {
  render() {
    const LinkStyle = {
    color: 'white',
    textDecoration: "none",
  };
    
    return (
        <div>
          <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
            <Card.Body>
            <strong>Copyright @ <a style={LinkStyle} href="https://shincar.github.io/blogs/">Adam & Alvin's Fun Lab</a></strong>
            </Card.Body>
          </Card>
        </div>)
  }
}

export default Footer;