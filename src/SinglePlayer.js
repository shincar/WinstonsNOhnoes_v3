import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './components/game';
import WinstonsNOhnoesBoard from './components/board';
import WinstonsNOhnoesLoading from './components/loading';
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
        <WinstonsNOhnoesClient gameID="single"/>
      </div>
    </div>
  </div>
);

export default SinglePlayer;
