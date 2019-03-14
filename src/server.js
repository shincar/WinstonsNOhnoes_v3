const Server = require('boardgame.io/server').Server;
import WinstonsNOhnoes from './components/game';
import GoogleDatastore from './gdb';
var port = process.env.PORT || 8000;

console.log('WinstonsNOhnoes.name: ' + WinstonsNOhnoes.name);

const db = new GoogleDatastore();
const server = Server({ games: [WinstonsNOhnoes], db: db });
server.run(port, () => {
    console.log('Game server on port ' + port);
});