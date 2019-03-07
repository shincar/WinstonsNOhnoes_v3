import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './game';
import WinstonsNOhnoesBoard from './board';
import WinstonsNOhnoesLoading from './loading';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import request from 'superagent';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ListGroup from 'react-bootstrap/ListGroup';

const WinstonsNOhnoesClient = Client({
  game: WinstonsNOhnoes,
  board: WinstonsNOhnoesBoard,
  loading: WinstonsNOhnoesLoading,
  debug: false,
  multiplayer: { server: 'http://shincar-dev.appspot.com' },
});

class P1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: 'http://shincar-dev.appspot.com',
      gameID: 'gameID',
      players: {
        '0': {
          credentials: 'credentials',
        },
        '1': {
          credentials: 'credentials',
        },
      },
    };
  }
  
  async onNewGame() {
    const gameName = 'WinstonsNOhnoes';
    const server = this.state.server;

    const newGame = await request
      .post(`${server}/games/${gameName}/create`)
      .send({ numPlayers: 2 });

    const gameID = newGame.body.gameID;

    console.log('Create a new game, id: ' + gameID);
    let playerCredentials = [];

    let playerID = 0;
    const player = await request
      .post(`${server}/games/${gameName}/${gameID}/join`)
      .send({
        gameName,
        playerID,
        playerName: playerID.toString(),
      });
    
    playerCredentials.push(player.body.playerCredentials);
    
    this.setState({
      gameID,
      players: {
        '0': {
          credentials: playerCredentials[0],
        },
      },
    });
  }
  
  async componentDidMount() {
  }
  
  async onReset() {
    console.log('P1 want to restart a game');
  }
  
  onPlayerCredentialsChange(playerID, credentials) {
    console.log('P1::onPlayerCredentialsChange');
    this.setState({
      gameID: this.state.gameID,
      players: {
        ...this.state.players,
        [playerID]: {
          credentials,
        },
      },
    });
  }

  render() {
    return (
      <AuthenticatedInstance
        gameID={this.state.gameID}
        players={this.state.players}
        onPlayerCredentialsChange={this.onPlayerCredentialsChange.bind(this)}
        onNewGame={this.onNewGame.bind(this)}
      />
    );
  }
}

class AuthenticatedInstance extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    players: PropTypes.any,
    onPlayerCredentialsChange: PropTypes.func,
    onReset: PropTypes.func,
  };
  
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
        <ButtonToolbar style={{ margin: 5 }}>
          <Button style={{ margin: 5, borderColor:"#5DC928" ,background: "#40A310", color:"white"}} size="lg" onClick={() => this.props.onNewGame()}>New Game</Button>
        </ButtonToolbar>
        <div className="runner">
          <div className="run">
            <WinstonsNOhnoesClient
              gameID={this.props.gameID}
              playerID="0"
              credentials={this.props.players['0'].credentials}
            />
            <ListGroup style={{ margin: 5 }}>
              <ListGroup.Item variant="success">Game ID: {this.props.gameID}</ListGroup.Item>
              <ListGroup.Item variant="success">Player Credential: {this.props.players['0'].credentials}</ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>
          <h1>Copyright @ Adam & Alvin's Fun Lab</h1>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default P1;