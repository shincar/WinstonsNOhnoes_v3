const Server = require('boardgame.io/server').Server;
import WinstonsNOhnoes from './components/game';
var port = process.env.PORT || 8000;

console.log('WinstonsNOhnoes.name: ' + WinstonsNOhnoes.name);
const server = Server({ games: [WinstonsNOhnoes] });
server.run(port);