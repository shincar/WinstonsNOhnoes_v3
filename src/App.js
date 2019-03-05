import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import React from 'react';

function IsVictory(cells) {
  var lines = [ [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]];
  var bFound = false;
  let winner;
  lines.forEach(line => {
    if( cells[line[0]].length > 0 && 
        cells[line[1]].length > 0 && 
        cells[line[2]].length > 0) {
      let top_token_1 = cells[line[0]][cells[line[0]].length-1];
      let top_token_2 = cells[line[1]][cells[line[1]].length-1];
      let top_token_3 = cells[line[2]][cells[line[2]].length-1];
      if( top_token_1.owner === top_token_2.owner &&
          top_token_1.owner === top_token_3.owner ) {
        winner = top_token_1.owner;
        bFound = true;
      }
    }
  });
  
  return { result : bFound, winner: winner }
}

function IsDraw(cells) {
  return false;
}

const WinstonsNOhnoes = Game({
  setup: () => ({ 
    cells: [ [], [], [],
             [], [], [],
             [], [], [] ],
             
    player_tokens: [ 
      [{ id: 0, owner: "0", size: 0, isUsed: false, grid_id: 0},
       { id: 1, owner: "0", size: 0, isUsed: false, grid_id: 0},
       { id: 2, owner: "0", size: 1, isUsed: false, grid_id: 0},
       { id: 3, owner: "0", size: 1, isUsed: false, grid_id: 0},
       { id: 4, owner: "0", size: 2, isUsed: false, grid_id: 0},
       { id: 5, owner: "0", size: 2, isUsed: false, grid_id: 0}],
      [{ id: 0, owner: "1", size: 0, isUsed: false, grid_id: 0},
       { id: 1, owner: "1", size: 0, isUsed: false, grid_id: 0},
       { id: 2, owner: "1", size: 1, isUsed: false, grid_id: 0},
       { id: 3, owner: "1", size: 1, isUsed: false, grid_id: 0},
       { id: 4, owner: "1", size: 2, isUsed: false, grid_id: 0},
       { id: 5, owner: "1", size: 2, isUsed: false, grid_id: 0},],
      ],
    selected_token: null,
  }),

  moves: {
    clickCell(G, ctx, id) {
      G.player_tokens[ctx.currentPlayer][G.selected_token.id].isUsed = true;
      G.player_tokens[ctx.currentPlayer][G.selected_token.id].grid_id = id;
      G.cells[id].push(G.player_tokens[ctx.currentPlayer][G.selected_token.id]);
      if(G.selected_token.isUsed) {
        G.cells[G.selected_token.grid_id].pop();
      }
      
      G.selected_token = null;
    },
    selectToken(G, ctx, id) {
      if(G.selected_token != null && G.selected_token.id === id) {
        console.log('Player ' + ctx.currentPlayer + ' unselect token[' + id + '] size: ' + G.player_tokens[ctx.currentPlayer][id].size);
        G.selected_token = null;
      } else {
        console.log('Player ' + ctx.currentPlayer + ' select token[' + id + '] size: ' + G.player_tokens[ctx.currentPlayer][id].size);
        G.selected_token = G.player_tokens[ctx.currentPlayer][id];
      }
    },
  },
  
  flow: {
    endGameIf: (G, ctx) => {
      let ret = IsVictory(G.cells);
      if (ret.result) {
        return { winner: ret.winner };
      }
      if (IsDraw(G.cells)) {
        return { draw: true };
      }
    },
  },
});

class WinstonsNOhnoesBoard extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }
  
  onTokenClick(id) {
    this.props.moves.selectToken(id);
  }
  
  onClickTokenInCell(player_id, token_id) {
    console.log(this.props.ctx.currentPlayer + ' onClickTokenInCell(' + player_id + ', ' + token_id + ')');
    if( this.props.ctx.currentPlayer === player_id) {
      console.log('selectToken()');
      this.props.moves.selectToken(token_id);
    } else {
      console.log('player id not matched');
    }
  }

  isActive(id) {
    if (this.props.G.cells[id].length > 0 && this.props.G.cells[id][this.props.G.cells[id].length-1].size >= this.props.G.selected_token.size) return false;
    
    if (!this.props.isActive) return false;

    return true;
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };
    
    const cellSelectedStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
    };
    
    const tokenStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };
    
    const tokenSelectedStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
    };
    
    let tokens_tbody = [];
    let tokens = [];
    for( let i = 0; i < 6; i++) {
      if(!this.props.G.player_tokens[this.props.ctx.currentPlayer][i].isUsed) {
        if(this.props.G.selected_token != null && this.props.G.selected_token.id === i) {
          tokens.push(
            <td style={tokenSelectedStyle} key={i} onClick={() => this.onTokenClick(i)}>
              {this.props.G.player_tokens[this.props.ctx.currentPlayer][i].size}
            </td>
          );
        } else {
          tokens.push(
            <td style={tokenStyle} key={i} onClick={() => this.onTokenClick(i)}>
              {this.props.G.player_tokens[this.props.ctx.currentPlayer][i].size}
            </td>
          );
        }
      }
    }
    if(tokens.length > 0) {
      tokens_tbody.push(<tr key={this.props.ctx.currentPlayer}>{tokens}</tr>);
    }

    let board_tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        
        if(this.props.G.selected_token) {
          if(this.props.G.cells[id].length > 0) {
            let top_token = this.props.G.cells[id][this.props.G.cells[id].length-1];
            if(top_token.owner === this.props.G.selected_token.owner &&
               top_token.id === this.props.G.selected_token.id) {
              cells.push(
                <td style={cellSelectedStyle} key={id} onClick={() => this.onClick(id)}>
                  ({top_token.owner},{top_token.size})
                </td>
              );
            } else {
              cells.push(
                <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
                  ({top_token.owner},{top_token.size})
                </td>
              );
            }            
          } else {
            cells.push(
              <td style={cellStyle} key={id} onClick={() => this.onClick(id)}></td>
            );
          }
        } else {
          if(this.props.G.cells[id].length > 0) {
            let top_token = this.props.G.cells[id][this.props.G.cells[id].length-1];
            cells.push(
              <td style={cellStyle} key={id} onClick={() => this.onClickTokenInCell(top_token.owner, top_token.id)}>
                ({top_token.owner},{top_token.size})
              </td>
            );
          } else {
            cells.push(
              <td style={cellStyle} key={id}></td>
            );
          }
        }
      }
      board_tbody.push(<tr key={i}>{cells}</tr>);
    }
    
    

    return (
      <div>
        <h3>Winstons & Ohnoes</h3>
        <div>
        Current player: {this.props.ctx.currentPlayer}
        </div>
        <div>
        Available tokens:
        </div>
        <table id="tokens">
          <tbody>{tokens_tbody}</tbody>
        </table>
        <div>
        Board:
        </div>
        <table id="board">
          <tbody>{board_tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

const App = Client({ 
  game: WinstonsNOhnoes,
  board: WinstonsNOhnoesBoard,
  debug: false,
});

export default App;
