import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './game';
import WinstonsNOhnoesBoard from './board';
import WinstonsNOhnoesLoading from './loading';
import PropTypes from 'prop-types';
import request from 'superagent';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

const WinstonsNOhnoesClient = Client({
  game: WinstonsNOhnoes,
  board: WinstonsNOhnoesBoard,
  loading: WinstonsNOhnoesLoading,
  debug: false,
  multiplayer: { server: 'http://localhost:8002' },
});

class GameConsole extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.activeGame.gameID === 'unknown') {
      return (  
        <div>
          <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>
            <Card.Title>No Active Game</Card.Title>
          </Card.Body>
          </Card>
        </div>
      )
    } else {
      return (
        <AuthenticatedInstance 
          gameID={this.props.activeGame.gameID} 
          playerID={this.props.activeGame.playerID} 
          playerName={this.props.activeGame.playerName} 
          players={this.props.activeGame.players}
        />
      )
    }
  }
}

class AuthenticatedInstance extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    playerID: PropTypes.string,
    playerName: PropTypes.string,
    players: PropTypes.any,
  };
  
  render() {
    return (
      <div>
        <div className="runner">
          <div className="run">
            <WinstonsNOhnoesClient
              gameID={this.props.gameID}
              playerID={this.props.playerID}
              playerName={this.props.players[this.props.playerID].name}
              players={this.props.players}
              credentials={this.props.players[this.props.playerID].credentials}
            />
            <ListGroup style={{ margin: 5 }}>
              <ListGroup.Item variant="success">
                Game ID: {this.props.gameID}
              </ListGroup.Item>
              <ListGroup.Item variant="success">
                Player Credential: {this.props.players[this.props.playerID].credentials}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default GameConsole;