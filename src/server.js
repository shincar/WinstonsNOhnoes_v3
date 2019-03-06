const Server = require('boardgame.io/server').Server;
import WinstonsNOhnoes from './game';

console.log('WinstonsNOhnoes.name: ' + WinstonsNOhnoes.name);
const server = Server({ games: [WinstonsNOhnoes] });
server.run(8000);