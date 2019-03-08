import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './game';
import WinstonsNOhnoesBoard from './board';
import WinstonsNOhnoesLoading from './loading';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import request from 'superagent';

const WinstonsNOhnoesClient = Client({
  game: WinstonsNOhnoes,
  board: WinstonsNOhnoesBoard,
  loading: WinstonsNOhnoesLoading,
  debug: false,
  multiplayer: { server: 'https://shincar-dev.appspot.com' },
});

class AvailableGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: 'https://shincar-dev.appspot.com',
      playerID: '1',
      playerName: '1',
      gameInstances: [],
      selectedGameID: "",
      gameListTitle: "No available games",
    };
  }
  
  componentDidMount() {
    console.log('AvailableGames mounted');
  }
  
  updateGameInstances = (gameInstances) => {
    console.log('Got game list in AvailableGames');
    if( gameInstances.length > 0) {
      const availableGameInstances = gameInstances.filter(gameInstance => gameInstance.players[1].name === undefined);
      this.setState({
        gameListTitle: "Available Games",
        gameInstances: availableGameInstances,
      })
    } else {
      this.setState({
        gameListTitle: "No available games",
      })
    }
  }
  
  onGameSelected(e, gameID) {
    e.stopPropagation()
    this.props.onGameSelected(gameID);
  }
  
  renderGame(item) {
    var actionKey = '#' + item.gameID
    var discription = 'Winstons & Ohnoes Game by ' + item.players[0].name
    return <ListGroup.Item key={item.gameID} action href={actionKey} onClick={(e) => this.onGameSelected(e, item.gameID)}>{discription}</ListGroup.Item>
  }
  
  render() {
    return(
            <div>
              <Card.Title>{this.state.gameListTitle}</Card.Title>
              <ListGroup defaultActiveKey="#">
                {this.state.gameInstances.map(item => this.renderGame(item))}
              </ListGroup>
            </div>
          )
  }
}

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.availableGamesElement = React.createRef();
    this.state = {
      server: 'https://shincar-dev.appspot.com',
      gameID: 'gameID',
      playerID: '0',
      playerName: '0',
      gameInstances: [],
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
  
  async refreshGameInfo() {
    const gameName = 'WinstonsNOhnoes';
    const server = this.state.server;
    
    const gameinfo = await request
      .get(`${server}/games/${gameName}`)
      .send()
    
    console.log('Lobby::Get GameInstances: ' + gameinfo.body.gameInstances.length);
    this.setState({ gameInstances: gameinfo.body.gameInstances });
    this.availableGamesElement.current.updateGameInstances(this.state.gameInstances);
  }
  
  async componentDidMount() {
    this.refreshGameInfo();
  }
  
  onSelectGame(gameID) {
    console.log('Lobby receive player click game id ' + gameID);
    this.setState({
      gameID: gameID,
      playerID: '1',
    })
  }
  
  async onCreate() {
    console.log(this.state.playerName + 'try to create a game');
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
        playerName: this.state.playerName,
      });
    
    playerCredentials.push(player.body.playerCredentials);
    
    this.refreshGameInfo();
    
    this.setState({
      gameID,
      playerID: '0',
      players: {
        '0': {
          credentials: playerCredentials[0],
        },
        '1': {
          credentials: 'unknown',
        },
      },
    });
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
        playerName: this.state.playerName,
      });

    playerCredentials.push(player.body.playerCredentials);
    
    this.setState({
      gameID,
      playerID: '1',
      players: {
        '0': {
          credentials: 'unknown',
        },
        '1': {
          credentials: playerCredentials[0],
        },
      },
    });
  }
  
  onPlayerNameChanged(e) {
    this.setState({
      playerName: e.target.value,
    });
  }
  
  render() {
    return (
      <div>
      <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
        <Card.Body>
        <AvailableGames ref={this.availableGamesElement} onGameSelected={this.onSelectGame.bind(this)}/>
        <InputGroup className="mb-3">
            <FormControl
              controlid="playerName"
              placeholder="Player name"
              aria-label="Player name: "
              aria-describedby="basic-addon2"
              type="text"
              onChange={e => this.onPlayerNameChanged(e)}
            />
        </InputGroup>
        <Button style={{ margin: "5px", borderColor:"#5DC928" ,background: "#40A310", color:"white"}} onClick={() => this.onCreate()}>Create Game</Button>
        <WinstonsNOhnoesClient
              gameID={this.state.gameID}
              playerID={this.state.playerID}
              credentials={this.state.players[this.state.playerID].credentials}
            />
        <ListGroup style={{ margin: 5 }}>
              <ListGroup.Item variant="success">Game ID: {this.state.gameID}</ListGroup.Item>
              <ListGroup.Item variant="success">Player Credential: {this.state.players[this.state.playerID].credentials}</ListGroup.Item>
        </ListGroup>
        
        
        <Button style={{ margin: "5px", borderColor:"#5DC928" ,background: "#40A310", color:"white"}} onClick={() => this.refreshGameInfo()}>Refresh Game</Button>
        <Button style={{ margin: "5px", borderColor:"#5DC928" ,background: "#40A310", color:"white"}} onClick={() => this.onJoin()}>Join Game</Button>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default Lobby;