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
});

const SinglePlayer = () => (
  <div>
    <div className="runner">
      <div className="run">
        <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>
          <h1>Winstons & Ohnoes</h1>
          <p>
            A advance Tic-Tak-Toe game
          </p>
          </Card.Body>
        </Card>
        <WinstonsNOhnoesClient gameID="single"/>
        <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>
          <h1>Copyright @ Adam & Alvin's Fun Lab</h1>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
);

export default SinglePlayer;
