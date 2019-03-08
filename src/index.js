import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Main from './main';
import SinglePlayer from './components/SinglePlayer';
import MultiPlayer from './MultiPlayers';
import Authenticated from './Authenticated';
import P1 from './components/P1';
import P2 from './components/P2';
import('./index.css')

ReactDOM.render(
<BrowserRouter>
  <div>
    <Route path='/' exact component={Main} />
    <Route path='/single' exact component={SinglePlayer} />
    <Route path='/multi' component={MultiPlayer} />
    <Route path='/authenticated' component={Authenticated} />
    <Route path='/p1' component={P1} />
    <Route path='/p2' component={P2} />
  </div>
</BrowserRouter>
, document.getElementById('root'));