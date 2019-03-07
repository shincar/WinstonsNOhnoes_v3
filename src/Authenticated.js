import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './components/game';
import WinstonsNOhnoesBoard from './components/board';
import WinstonsNOhnoesLoading from './components/loading';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import request from 'superagent';

const WinstonsNOhnoesClient = Client({
  game: WinstonsNOhnoes,
  board: WinstonsNOhnoesBoard,
  loading: WinstonsNOhnoesLoading,
  debug: false,
  multiplayer: { server: 'localhost:8000' },
});

class AuthenticatedClient extends React.Component {
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
  
  async componentDidMount() {
    const gameName = 'WinstonsNOhnoes';
    const PORT = 8000;

    const newGame = await request
      .post(`http://localhost:${PORT}/games/${gameName}/create`)
      .send({ numPlayers: 2 });

    const gameID = newGame.body.gameID;

    let playerCredentials = [];

    for (let playerID of [0, 1]) {
      const player = await request
        .post(`http://localhost:${PORT}/games/${gameName}/${gameID}/join`)
        .send({
          gameName,
          playerID,
          playerName: playerID.toString(),
        });

      playerCredentials.push(player.body.playerCredentials);
    }

    this.setState({
      gameID,
      players: {
        '0': {
          credentials: playerCredentials[0],
        },
        '1': {
          credentials: playerCredentials[1],
        },
      },
    });
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
  
  render() {
    return (
      <div>
        <h1>Authenticated</h1>

        <p>
          Change the credentials of a player, and you will notice that the
          server no longer accepts moves from that client.
        </p>
        <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>
          <h1>Winstons & Ohnoes</h1>
          <p>
            A advance Tic-Tak-Toe game
          </p>
          </Card.Body>
        </Card>
        <div className="runner">
          <div className="run">
            <WinstonsNOhnoesClient
              gameID={this.props.gameID}
              playerID="0"
              credentials={this.props.players['0'].credentials}
            />
            <input
              type="text"
              value={this.props.players['0'].credentials}
              onChange={event =>
                this.props.onPlayerCredentialsChange('0', event.target.value)
              }
            />
          </div>
          <div className="run">
            <WinstonsNOhnoesClient
              gameID={this.props.gameID}
              playerID="1"
              credentials={this.props.players['1'].credentials}
            />
            <input
              type="text"
              value={this.props.players['1'].credentials}
              onChange={event =>
                this.props.onPlayerCredentialsChange('1', event.target.value)
              }
            />
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
export default AuthenticatedClient;