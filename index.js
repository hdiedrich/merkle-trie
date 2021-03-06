const ipld = require('ipld')
const multicodec = require('multicodec')
const CacheVertex = require('./cache.js')
const Link = require('./link.js')

module.exports = class Vertex {
  /**
   * Create a new vertex
   * @param {Object} opts
   * @param {*} opts.value the value to store in the trie
   * @param {Map} opts.edges the edges that this vertex has stored a `Map` edge name => `Vertex`
   * @param {Store} opts.store the store that this vertex will use
   */
  constructor (opts = {}) {
    this.value = opts.value
    this.edges = opts.edges || new Map()
    this._store = opts.store
    this._cache = opts.cache || new CacheVertex()
    this._cache.vertex = this
  }

  /**
   * @return {Buffer} the serialized Vertex
   */
  toBuffer () {
    return Vertex.toBuffer(this)
  }

  static toBuffer (vertex) {
    const edges = [...vertex.edges].map(item => {
      item[1] = item[1].toBuffer()
      return item
    })
    return multicodec.addPrefix('cbor', ipld.marshal({value: vertex.value, edges: edges}))
  }

  /**
   * @return {String} the hash of this vertex
   */
  hash () {
    return Vertex.toBuffer(this)
  }

  static hash (data) {
    return ipld.multihash(data)
  }

  /**
   * unserialize a Vertex
   * @param {Buffer} data
   * @return {Vertex}
   */
  static fromBuffer (data) {
    // to do handle externtions
    let {value, edges} = ipld.unmarshal(multicodec.rmPrefix(data))
    edges = edges.map(([name, link]) => {
      return [name, new Link(link)]
    })
    return new Vertex({
      value: value,
      edges: new Map(edges)
    })
  }

  /**
   * @property {boolean} Returns truthy on whether the vertexs is empty
   */
  get isEmpty () {
    return !this.edges.size && (this.value === undefined || this.value === null)
  }

  /**
   * @property {boolean} isLeaf wether or not the current vertex is a leaf
   */
  get isLeaf () {
    return this.edges.size === 0
  }

  /**
   * Set an edge on a given path to the given vertex
   * @param {Array} path
   * @param {Vertex} vertex
   */
  set (path, newVertex) {
    this._cache.update(path, vertex => {
      vertex.value = {
        op: 'set',
        vertex: newVertex
      }

      newVertex._cache = vertex
      return vertex
    })
  }

  /**
   * deletes an Edge at the end of given path
   * @param {Array} path
   * @return {Boolean} Whether or not anything was deleted
   */
  del (path) {
    this._cache.del(path)
  }

  /**
   * get a vertex given a path
   * @param {Array} path
   * @return {Promise}
   */
  get (path) {
    return new Promise((resolve, reject) => {
      // check the cache first
      const cachedVertex = this._cache.get(path)
      if (!cachedVertex || cachedVertex.isEmpty) {
        // get the value from the store
        this._store.get(this, path).then(resolve, reject)
      } else if (cachedVertex.op === 'del') {
        // the value is marked for deletion
        if (cachedVertex.isLeaf) {
          reject('no vertex was found')
        } else {
          // the value was deleted but then another value was saved along this path
          cachedVertex.vertex = new Vertex()
          resolve(cachedVertex.vertex)
        }
      } else {
        // return the cached value
        const vertex = cachedVertex.vertex
        resolve(vertex)
      }
    })
  }

  /**
   * Updates an edge on a given path . If the path does not already exist this
   * will extend the path. If no value is returned then the vertex that did exist will be deleted
   * @param {Array} path
   * @return {Promise}  the promise resolves a vertex and a callback funtion that is used to update the vertex
   * @example
   * rootVertex.update(path).then(([vertex, resolve]) => {
   *   resolve(new Vertex({value: 'some new value'}))
   * })
   */
  update (path) {
    return new Promise(resolve => {
      // checks the cache first
      this._cache.updateAsync(path, (cachedVertex, updateCacheFn) => {
        let vertex = cachedVertex.vertex
        if (cachedVertex.op === 'del') {
          vertex = new Vertex({store: this._store})
        }

        if (vertex) {
          onVertexFound(vertex)
        } else {
          // if there is no vertex found in the cache
          this._store.get(this, path)
            .then(onVertexFound)
            .catch(() => {
              onVertexFound(new Vertex({store: this._store}))
            })
        }

        function onVertexFound (vertex) {
          resolve([vertex, updatedVertex => {
            updateCacheFn(updatedVertex._cache)
          }])
        }
      })
    })
  }

  /**
   * flush the cache of saved operation to the store
   * @return {Promise}
   */
  flush () {
    return this._store.batch(this._cache)
  }

  /**
   * creates a copy of the merkle trie. Work done on this copy will not affect
   * the original.
   * @return {Vertex}
   */
  copy () {
    const cache = this._cache.copy()
    return new Vertex({
      value: this.value,
      edges: this.edges,
      store: this._store,
      cache: cache
    })
  }
}
