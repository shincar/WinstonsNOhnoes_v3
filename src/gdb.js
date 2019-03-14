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
    let key = this.datastore.key(['Game', id]);
    let result = await this.datastore.get(key);

    return result[0];
  }

  /**
   * Check if a particular game id exists.
   * @param {string} id - The game id.
   * @returns {boolean} - True if a game with this id exists.
   */
  async has(id) {
    let key = this.datastore.key(['Game', id]);
    return await this.datastore.has(key);
  }

  /**
   * Remove the game state from the GoogleDatastore object.
   * @param {string} id - The game id.
   */
  async remove(id) {
    const key = this.datastore.key(['Game', id]);
    if (!(await this.datastore.has(key))) return;
    this.datastore.delete(key);
  }

  /**
   * Return all keys.
   * @returns {array} - Array of keys (strings)
   */
  async list() {
    const query = this.datastore.createQuery(['Game']);
    
    let results = await this.datastore.runQuery(query);
    const symbolKey = this.datastore.KEY;
    var keys = results[0].map(function(entity) {
      return entity[symbolKey].name;
    });

    return [...keys];
  }
}

export default GoogleDatastore;