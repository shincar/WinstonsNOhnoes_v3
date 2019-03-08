import React from 'react';
import { Client } from 'boardgame.io/react';
import WinstonsNOhnoes from './game';
import WinstonsNOhnoesBoard from './board';
import WinstonsNOhnoesLoading from './loading';

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
