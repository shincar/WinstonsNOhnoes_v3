import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SinglePlayer from './SinglePlayer';
import P1 from './P1';
import P2 from './P2';
import Lobby from './lobby';

class MenuTabs extends React.Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="profile" id="winston-n-ohnoes-tabs">
          <Tab eventKey="single" title="Single">
            <SinglePlayer />
          </Tab>
          <Tab eventKey="lobby" title="Lobby">
            <Lobby />
          </Tab>
          <Tab eventKey="p1" title="Player1">
            <P1 />
          </Tab>
          <Tab eventKey="p2" title="Player2">
            <P2 />
          </Tab>
        </Tabs>
      </div>)
  }
}

export default MenuTabs;