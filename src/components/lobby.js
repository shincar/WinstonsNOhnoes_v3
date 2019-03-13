import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import request from 'superagent';

class AvailableGames extends React.Component {
  onGameSelected(e, gameID) {
    e.stopPropagation()
    this.props.onGameSelected(gameID);
  }
  
  renderGame(item) {
    var actionKey = '#' + item.gameID
    var discription = 'Winstons & Ohnoes Game (' + item.players[0].name + ', ' + (item.players[1].name ? item.players[1].name : 'empty') + ')';
    return <ListGroup.Item key={item.gameID} action href={actionKey} onClick={(e) => this.onGameSelected(e, item.gameID)}>
            {discription}
           </ListGroup.Item>
  }
  
  render() {
    const gameListTitle = this.props.availableGameInstances.length > 0 ? 'Available Games' : 'No available games'
    
    return(
            <div>
              <Card.Title>{gameListTitle}</Card.Title>
              <ListGroup defaultActiveKey="#">
                {this.props.availableGameInstances.map(item => this.renderGame(item))}
              </ListGroup>
            </div>
          )
  }
}

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    // this.availableGamesElement = React.createRef();
    this.state = {
      server: 'https://shincar-dev.appspot.com',
      gameID: '',
      playerID: '0',
      playerName: '',
      availableGameInstances: [],
      players: {
        '0': {
          name: 'Player 1',
          credentials: 'credentials',
        },
        '1': {
          name: 'Player 2',
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
    
    console.log([...gameinfo.body.gameInstances.filter(gameInstance => (gameInstance.players[1].name === undefined))]);
    this.setState({ availableGameInstances: [...gameinfo.body.gameInstances.filter(gameInstance => (gameInstance.players[1].name === undefined))] });
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
  
  async onCreateGame() {
    if(this.state.playerName === '') {
      console.log('Please input player name');
      return;
    }
    const gameName = 'WinstonsNOhnoes';
    const server = this.state.server;

    const newGame = await request
      .post(`${server}/games/${gameName}/create`)
      .send({ numPlayers: 2 });

    const gameID = newGame.body.gameID;

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
    
    const gameInstance = {
      gameID: gameID,
      playerID: '0',
      playerName: this.state.playerName,
      players: {
        '0': {
          name: this.state.playerName,
          credentials: playerCredentials[0],
        },
        '1': {
          name: 'Player 2',
          credentials: 'unknown',
        },
      },
    }
    
    this.props.onTabChange('playground', gameInstance);
  }
  
  async onJoin() {
    if(this.state.playerName === '') {
      console.log('Please input player name');
      return;
    }
    if(this.state.gameID === '') {
      console.log('Please select a game');
      return;
    }
    
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
    
    const gameInstance = {
      gameID: gameID,
      playerID: '1',
      playerName: this.state.playerName,
      players: {
        '0': {
          name: 'Player 1',
          credentials: 'unknown',
        },
        '1': {
          name: this.state.playerName,
          credentials: playerCredentials[0],
        },
      },
    }
    this.props.onTabChange('playground', gameInstance);
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
        <Button style={{ margin: "5px", borderColor:"#5DC928" ,background: "#40A310", color:"white"}} onClick={() => this.onCreateGame()}>Create Game</Button>
        <Button style={{ margin: "5px", borderColor:"#5DC928" ,background: "#40A310", color:"white"}} onClick={() => this.refreshGameInfo()}>Refresh Game</Button>
        <Button style={{ margin: "5px", borderColor:"#5DC928" ,background: "#40A310", color:"white"}} onClick={() => this.onJoin()}>Join Game
        </Button>
        
        <AvailableGames availableGameInstances={this.state.availableGameInstances} onGameSelected={this.onSelectGame.bind(this)}/>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default Lobby;