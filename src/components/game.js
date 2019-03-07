import { Game } from 'boardgame.io/core';

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
  name: 'WinstonsNOhnoes',
  setup: () => ({
    players: {
      '0': { name: 'Player 1', token_image: 'https://shincar.github.io/games/images/cs-winston.png', },
      '1': { name: 'Player 2', token_image: 'https://shincar.github.io/games/images/cs-ohnoes.png', },
    },

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
    switch_player: false,
  }),
  
  moves: {
    clickCell(G, ctx, id) {
      if(G.selected_token.isUsed && G.cells[G.selected_token.grid_id].length >= 2) {
        G.cells[G.selected_token.grid_id].pop();
        // Send the token back to players hand
        G.player_tokens[ctx.currentPlayer][G.selected_token.id].isUsed = false;
        G.player_tokens[ctx.currentPlayer][G.selected_token.id].grid_id = -1;
        
        var ret = IsVictory(G.cells);
        if(!ret.result) {
          // console.log('Player move its token and opponent does not win');
          G.cells[id].push(G.player_tokens[ctx.currentPlayer][G.selected_token.id]);
        } else {
          // Player move its token and make opponent wins!
          // console.log('Player move its token and make opponent wins!');
        }
      } else {
        G.player_tokens[ctx.currentPlayer][G.selected_token.id].isUsed = true;
        G.player_tokens[ctx.currentPlayer][G.selected_token.id].grid_id = id;
        if(G.selected_token.isUsed) {
          G.cells[G.selected_token.grid_id].pop();
        }
        // Put the token to the cell player clicked
        G.cells[id].push(G.player_tokens[ctx.currentPlayer][G.selected_token.id]);
      }
      G.selected_token = null;
      G.switch_player = true;
    },
    selectToken(G, ctx, id) {
      if(G.selected_token != null && G.selected_token.id === id) {
        // console.log('Player ' + ctx.currentPlayer + ' unselect token[' + id + '] size: ' + G.player_tokens[ctx.currentPlayer][id].size);
        G.selected_token = null;
      } else {
        // console.log('Player ' + ctx.currentPlayer + ' select token[' + id + '] size: ' + G.player_tokens[ctx.currentPlayer][id].size);
        G.selected_token = G.player_tokens[ctx.currentPlayer][id];
      }
    },
    unselectToken(G, ctx, id) {
      // console.log('Player ' + ctx.currentPlayer + ' unselect token[' + id + '] size: ' + G.player_tokens[ctx.currentPlayer][id].size);
      G.selected_token = null;
    }
  },

  flow: {
    startingPhase: 'phaseSelectToken',
    
    phases: {
      phaseSelectToken: {
        allowedMoves: ['selectToken'],
        endPhaseIf: G => G.selected_token != null,
        next: 'phaseClickCell',
        onPhaseBegin: (G, ctx) => {
          // console.log('phaseSelectToken phase begin');
        },
        onPhaseEnd: (G, ctx) => {
          // console.log('phaseSelectToken phase end');
        },
      },
      
      phaseClickCell: {
        allowedMoves: ['unselectToken', 'clickCell'],
        endPhaseIf: G => G.sekected_token == null,
        next: 'phaseSelectToken',
        onPhaseBegin: (G, ctx) => {
          // console.log('clickCell phase begin');
        },
        onPhaseEnd: (G, ctx) => {
          // console.log('clickCell phase end');
        },
      },
    },
    
    endTurnIf: (G, ctx) => {
      return G.switch_player === true;
    },
    
    onTurnBegin: (G, ctx) => {
      // console.log('Turn begin');
      G.switch_player = false;
    },
    
    onTurnEnd: (G, ctx) => {
      // console.log('Turn end');
    },
    
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

export default WinstonsNOhnoes;