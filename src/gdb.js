'use strict';
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { Datastore } from '@google-cloud/datastore';
 
/**
 * Google data storage.
 */
class GoogleDatastore {
  /**
   * Creates a new GoogleDatastore storage.
   */
  constructor() {
    this.datastore = new Datastore();
    // this.games = new Map();
  }
  
  // Translates from Datastore's entity format to
// the format expected by the application.
//
// Datastore format:
//   {
//     key: [kind, id],
//     data: {
//       property: value
//     }
//   }
//
// Application format:
//   {
//     id: id,
//     property: value
//   }
  fromDatastore(obj) {
    obj.id = obj[Datastore.KEY].id;
    return obj;
  }

// Translates from the application's format to the datastore's
// extended entity property format. It also handles marking any
// specified properties as non-indexed. Does not translate the key.
//
// Application format:
//   {
//     id: id,
//     property: value,
//     unindexedProperty: value
//   }
//
// Datastore extended format:
//   [
//     {
//       name: property,
//       value: value
//     },
//     {
//       name: unindexedProperty,
//       value: value,
//       excludeFromIndexes: true
//     }
//   ]
  toDatastore(obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach(k => {
      if (obj[k] === undefined) {
        return;
      }
      results.push({
        name: k,
        value: obj[k],
        excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
      });
    });
    return results;
  }
  
  toDatastore(obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach(k => {
      if (obj[k] === undefined) {
        return;
      }
      results.push({
        name: k,
        value: obj[k],
        excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
      });
    });
    return results;
  }

  /**
   * Connect.
   * No-op for the GoogleDatastore instance.
   */
  async connect() {
    return;
  }

  /**
   * Write the game state to the GoogleDatastore object.
   * @param {string} id - The game id.
   * @param {object} store - A game state to persist.
   */
  async set(id, state) {
    console.log('gdb::set(' + id + ')');
    let key = this.datastore.key(['Game', id]);
    return await this.datastore.save({
      key: key,
      data: state,
    });
  }

  /**
   * Read the game state from the GoogleDatastore object.
   * @param {string} id - The game id.
   * @returns {object} - A game state, or undefined
   *                     if no game is found with this id.
   */
  async get(id) {
    console.log('gdb::get(' + id + ')');
    let key = this.datastore.key(['Game', id]);
    return await this.datastore.get(key);
  }

  /**
   * Check if a particular game id exists.
   * @param {string} id - The game id.
   * @returns {boolean} - True if a game with this id exists.
   */
  async has(id) {
    console.log('gdb::has()');
    let key = this.datastore.key(['Game', id]);
    return await this.datastore.has(key);
  }

  /**
   * Remove the game state from the GoogleDatastore object.
   * @param {string} id - The game id.
   */
  async remove(id) {
    console.log('gdb::remove()');
    const key = this.datastore.key(['Game', id]);
    if (!(await this.datastore.has(key))) return;
    this.datastore.delete(key);
  }

  /**
   * Return all keys.
   * @returns {array} - Array of keys (strings)
   */
  async list() {
    console.log('gdb::list()');
    const query = this.datastore.createQuery(['Game']);
    console.log('try to get gameID list of gameInstances++');
    
    let [gameInstances] = await this.datastore.runQuery(query);
    let keys = [];
    console.log(gameInstances);
    
    gameInstances.forEach(gameInstance => {
      console.log('game: ' + gameInstance);
      // keys.push(gameInstance.key)
    });
    console.log('try to get gameID list of gameInstances--');
    
    return [...new Map().keys()];
  }
}

export default GoogleDatastore;