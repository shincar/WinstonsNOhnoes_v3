import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './game';
import WinstonsNOhnoesBoard from './board';
import WinstonsNOhnoesLoading from './loading';
import Card from 'react-bootstrap/Card';

const WinstonsNOhnoesClient = Client({
  game: WinstonsNOhnoes,
  board: WinstonsNOhnoesBoard,
  loading: WinstonsNOhnoesLoading,
  debug: false,
  multiplayer: { local: true },
});

const MultiPlayer = () => (
  <div>
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
          <WinstonsNOhnoesClient gameID="multi" playerID="0" />
        </div>
        <div className="run">
          <WinstonsNOhnoesClient gameID="multi" playerID="1" />
        </div>
      </div>
    <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
      <Card.Body>
      <h1>Copyright @ Adam & Alvin's Fun Lab</h1>
      </Card.Body>
    </Card>
  </div>
);

export default MultiPlayer;