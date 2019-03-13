import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './game';
import WinstonsNOhnoesBoard from './board';
import WinstonsNOhnoesLoading from './loading';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import request from 'superagent';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

const WinstonsNOhnoesClient = Client({
  game: WinstonsNOhnoes,
  board: WinstonsNOhnoesBoard,
  loading: WinstonsNOhnoesLoading,
  debug: false,
  multiplayer: { server: 'https://shincar-dev.appspot.com' },
});

class P2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  
  onPlayerCredentialsChange(playerID, credentials) {
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
      />
    );
  }
}

class AuthenticatedInstance extends React.Component {
  static propTypes = {
    gameID: PropTypes.string,
    players: PropTypes.any,
    onPlayerCredentialsChange: PropTypes.func,
  };
  
  constructor(props) {
    super(props)
    this.state = {
      server: 'https://shincar-dev.appspot.com',
      gameID: 'gameID',
      players: {
        '0': {
          credentials: 'credentials',
        },
        '1': {
          credentials: 'credentials',
        },
      },
    }
  }
  
  async componentDidMount() {
  }
    
  async onJoin() {
    console.log('Try to join game id: ' + this.state.gameID);
    const gameName = 'WinstonsNOhnoes';
    const server = this.state.server;

    let playerID = 1;
    let gameID = this.state.gameID;
    let playerCredentials = [];
    const player = await request
      .post(`${server}/games/${gameName}/${gameID}/join`)
      .send({
        gameName,
        playerID,
        playerName: playerID.toString(),
      });

    console.log('P2::Get player credential: ' + player.body.playerCredentials.length);
    playerCredentials.push(player.body.playerCredentials);
    
    this.setState({
      gameID,
      players: {
        '1': {
          credentials: playerCredentials[0],
        },
      },
    });
  }
  
  render() {
    return (
      <div>
        <div className="runner">
          <div className="run">
            <Card.Body>
            <InputGroup className="mb-3">
                <FormControl
                  controlid="gameID"
                  placeholder="Game ID"
                  aria-label="Game ID: "
                  aria-describedby="basic-addon2"
                  type="text"
                  onChange={
                    e => this.setState({gameID: e.target.value})
                  }
                />
                <InputGroup.Append>
                  <Button style={{ borderColor:"#5DC928" ,background: "#40A310", color:"white"}} onClick={() => this.onJoin()}>Join</Button>
                </InputGroup.Append>
            </InputGroup>
            </Card.Body>
            <WinstonsNOhnoesClient
              gameID={this.state.gameID}
              playerID="1"
              playerName="Player 2"
              credentials={this.state.players['1'].credentials}
            />
            <ListGroup style={{ margin: 5 }}>
              <ListGroup.Item variant="success">Game ID: {this.state.gameID}</ListGroup.Item>
              <ListGroup.Item variant="success">Player Credential: {this.state.players['1'].credentials}</ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default P2;