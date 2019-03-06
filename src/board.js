import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function getTokenSize(token) {
  return 35 + token.size * 15;
}

function getCellTokenSize(token) {
  return 45 + token.size * 20;
}

class WinstonsNOhnoesBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    isPreview: PropTypes.bool,
  };
  
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
    }
  }

  onClickTokenInCell(player_id, token_id) {
    // console.log(this.props.ctx.currentPlayer + ' onClickTokenInCell(' + player_id + ', ' + token_id + ')');
    if( this.props.ctx.currentPlayer === player_id) {
      // console.log('selectToken()');
      this.props.moves.selectToken(token_id);
    } else {
      // console.log('player id not matched');
    }
  }

  isActive(id) {
    if (this.props.G.cells[id].length > 0 && this.props.G.cells[id][this.props.G.cells[id].length-1].size >= this.props.G.selected_token.size) return false;

    if (!this.props.isActive) return false;

    return true;
  }

  onReset() {
    this.props.reset();
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <Card.Title id="winner">Winner: {this.props.G.players[this.props.ctx.gameover.winner].name}</Card.Title>
        ) : (
          <Card.Title id="winner">Draw!</Card.Title>
        );
    }

    const cellStyle = {
      border: '2px solid white',
      width: '100px',
      height: '100px',
      lineHeight: '50px',
      textAlign: 'center',
      padding: '0px',
      margin: '0px',
    };

    const cellSelectedStyle = {
      border: '5px solid #5DC928',
      width: '100px',
      height: '100px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '0px',
      margin: '0px',
    };

    const tokenStyle = {
      border: 'none',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    const tokenSelectedStyle = {
      border: '5px solid #5DC928',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      fontWeight: 'bold',
      textAlign: 'center',
    };

    let current_player_name = this.props.G.players[this.props.ctx.currentPlayer].name;

    // Calculate current tokens that never used for a player
    let tokens_tbody = [];
    let tokens = [];

    for( let i = 0; i < 6; i++) {
      if(!this.props.G.player_tokens[this.props.ctx.currentPlayer][i].isUsed) {
        var token_size = getTokenSize(this.props.G.player_tokens[this.props.ctx.currentPlayer][i]);
        if(this.props.G.selected_token != null && this.props.G.selected_token.id === i) {
          tokens.push(
            <td style={tokenSelectedStyle} key={i} onClick={() => this.props.moves.unselectToken(i)}>
              <Image src={this.props.G.players[this.props.ctx.currentPlayer].token_image} width={token_size}/>
            </td>
          );
        } else {
          tokens.push(
            <td style={tokenStyle} key={i} onClick={() => this.props.moves.selectToken(i)}>
              <Image src={this.props.G.players[this.props.ctx.currentPlayer].token_image} width={token_size}/>
            </td>
          );
        }
      } else {
        tokens.push(
          <td style={tokenStyle} key={i}></td>
        );
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
            token_size = getCellTokenSize(top_token);
            if(top_token.owner === this.props.G.selected_token.owner &&
               top_token.id === this.props.G.selected_token.id) {
              cells.push(
                <td style={cellSelectedStyle} key={id} onClick={() => this.props.moves.unselectToken(top_token.id)}>
                  <Image src={this.props.G.players[top_token.owner].token_image} width={token_size}/>
                </td>
              );
            } else {
              cells.push(
                <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
                  <Image src={this.props.G.players[top_token.owner].token_image} width={token_size}/>
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
            token_size = getCellTokenSize(top_token);
            if(top_token.owner === this.props.ctx.currentPlayer) {
              cells.push(
                <td style={cellStyle} key={id} onClick={() => this.props.moves.selectToken(top_token.id)}>
                  <Image src={this.props.G.players[top_token.owner].token_image} width={token_size}/>
                </td>
              );
            } else {
              cells.push(
                <td style={cellStyle} key={id}>
                  <Image src={this.props.G.players[top_token.owner].token_image} width={token_size}/>
                </td>
              );
            }
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
        <ButtonToolbar style={{ margin: 5 }}>
          <Button style={{ borderColor:"#5DC928" ,background: "#40A310", color:"white"}} size="lg" onClick={() => this.onReset()}>Restart</Button>
        </ButtonToolbar>
        <Card style={{ margin: 5, background: "#3A7934", color: "white", borderColor:"#5DC928" }}>
          <Card.Body>
            <Card.Title>Current player:</Card.Title>
            <Card.Text>
            {current_player_name}
            </Card.Text>
            <Card.Title>Available tokens:</Card.Title>
            <Card.Body>
              <table id="tokens" height="100">
                <tbody>{tokens_tbody}</tbody>
              </table>
            </Card.Body>
            {winner}
            <Card.Title>
            Board:
            </Card.Title>
            <Card.Body>
            <table id="board">
              <tbody>{board_tbody}</tbody>
            </table>
            </Card.Body>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default WinstonsNOhnoesBoard;