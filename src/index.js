import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './index.css';
import SinglePlayer from './SinglePlayer';
import MultiPlayer from './MultiPlayers';
import Authenticated from './Authenticated';
import P1 from './P1';
import P2 from './P2';

ReactDOM.render(
<BrowserRouter>
  <div>
    <Route path='/' exact component={SinglePlayer} />
    <Route path='/multi' component={MultiPlayer} />
    <Route path='/authenticated' component={Authenticated} />
    <Route path='/p1' component={P1} />
    <Route path='/p2' component={P2} />
  </div>
</BrowserRouter>
, document.getElementById('root'));