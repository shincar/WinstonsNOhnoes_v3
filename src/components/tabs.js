import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SinglePlayer from './SinglePlayer';
import P1 from './P1';
import P2 from './P2';
import Lobby from './lobby';
import Console from './console'

class MenuTabs extends React.Component {
   constructor(props) {
    super(props);
    
    this.state = {
      activeKey: 'single',
      allGames: [],
      activeGame: {
        gameID: 'unknown',
        playerID: '0',
        playerName: 'Player 1',
        players: {
          '0': {
            name: 'Player 1',
            credentials: 'unknown',
          },
          '1': {
            name: 'Player 2',
            credentials: 'unknown',
          },
        },
      },
    }
  }
  
  onTabChange = (key, gameInstance) => {
    this.setState({
      activeGame: gameInstance,
    });
    this.handleSelect(key);
  }
  
  handleSelect(key) {
    this.setState({
      activeKey: key,
    });
  }

  renderTabs() {
    return (
      <div>
      <Tab eventKey="lobby" title="Lobby">
        <Lobby onTabChange={(key, gameInstance) => this.onTabChange(key, gameInstance)}/>
      </Tab>
      <Tab eventKey="playground" title="Console">
        <Console activeGame={this.state.activeGame}/>
      </Tab>
      <Tab eventKey="p1" title="Player1">
        <P1 />
      </Tab>
      <Tab eventKey="p2" title="Player2">
        <P2 />
      </Tab>
      </div>
    )
  }
  
  render() {
    return (
      <div>
        <Tabs activeKey={this.state.activeKey} id="winston-n-ohnoes-tabs" onSelect={this.handleSelect.bind(this)} >
          <Tab eventKey="single" title="Single">
            <SinglePlayer />
          </Tab>
          <Tab eventKey="lobby" title="Lobby">
            <Lobby onTabChange={(key, gameInstance) => this.onTabChange(key, gameInstance)}/>
          </Tab>
          <Tab eventKey="playground" title="Console">
            <Console activeGame={this.state.activeGame}/>
          </Tab>
        </Tabs>
      </div>)
  }
}

export default MenuTabs;