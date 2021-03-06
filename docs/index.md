<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

# constructor

[index.js:14-20](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L14-L20 "Source code on GitHub")

Create a new vertex

**Parameters**

-   `opts` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {})** 
    -   `opts.value` **any** the value to store in the trie
    -   `opts.edges` **[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)** the edges that this vertex has stored a `Map` edge name => `Vertex`
    -   `opts.store` **Store** the store that this vertex will use

# toBuffer

[index.js:25-27](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L25-L27 "Source code on GitHub")

Returns **[Buffer](https://nodejs.org/api/buffer.html)** the serialized Vertex

# hash

[index.js:40-42](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L40-L42 "Source code on GitHub")

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the hash of this vertex

# isEmpty

[index.js:68-70](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L68-L70 "Source code on GitHub")

**Properties**

-   `Returns` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** truthy on whether the vertexs is empty

# isLeaf

[index.js:75-77](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L75-L77 "Source code on GitHub")

**Properties**

-   `isLeaf` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** wether or not the current vertex is a leaf

# set

[index.js:84-94](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L84-L94 "Source code on GitHub")

Set an edge on a given path to the given vertex

**Parameters**

-   `path` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 
-   `vertex` **Vertex** 
-   `newVertex`  

# del

[index.js:101-103](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L101-L103 "Source code on GitHub")

deletes an Edge at the end of given path

**Parameters**

-   `path` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not anything was deleted

# get

[index.js:110-132](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L110-L132 "Source code on GitHub")

get a vertex given a path

**Parameters**

-   `path` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# update

[index.js:144-171](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L144-L171 "Source code on GitHub")

Updates an edge on a given path . If the path does not already exist this
will extend the path. If no value is returned then the vertex that did exist will be deleted

**Parameters**

-   `path` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 

**Examples**

```javascript
rootVertex.update(path).then(([vertex, resolve]) => {
  resolve(new Vertex({value: 'some new value'}))
})
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** the promise resolves a vertex and a callback funtion that is used to update the vertex

# flush

[index.js:177-179](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L177-L179 "Source code on GitHub")

flush the cache of saved operation to the store

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# copy

[index.js:186-194](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L186-L194 "Source code on GitHub")

creates a copy of the merkle trie. Work done on this copy will not affect
the original.

Returns **Vertex** 

# fromBuffer

[index.js:53-63](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/index.js#L53-L63 "Source code on GitHub")

unserialize a Vertex

**Parameters**

-   `data` **[Buffer](https://nodejs.org/api/buffer.html)** 

Returns **Vertex** 

# constructor

[link.js:6-8](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/link.js#L6-L8 "Source code on GitHub")

a merkle link

**Parameters**

-   `hash` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the hash of the merkle link

# constructor

[store.js:14-17](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/store.js#L14-L17 "Source code on GitHub")

Store for merkle tries

**Parameters**

-   `db` **\[Levelup](default new Levelup('', {db: memdown}))** a levelup instance used to store the store
-   `resolvers` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {'cbor': Vertex.fromBuffer, null: Vertex})** a map of multiformat perfixes to unserializtion function

# set

[store.js:24-31](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/store.js#L24-L31 "Source code on GitHub")

Stores a vertex in the db, returning its merkle link

**Parameters**

-   `Vertex`  
-   `vertex`  

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# get

[store.js:39-44](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/store.js#L39-L44 "Source code on GitHub")

Fetches a Vertex from the db

**Parameters**

-   `rootVertex` **Vertex** the vertex to start fetching from
-   `path` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** the path to fetch

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# getLink

[store.js:68-81](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/store.js#L68-L81 "Source code on GitHub")

resolves a merkle link to a Vertex

**Parameters**

-   `link` **Link** 

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# batch

[store.js:88-136](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/store.js#L88-L136 "Source code on GitHub")

flush a cache trie to the db returning a promise that resolves to a merkle link

**Parameters**

-   `Cache`  
-   `cache`  

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# createReadStream

[store.js:143-145](https://github.com/wanderer/merkle-trie/blob/81b4b32c4f489f478952c9bb6ac8cf4e69d52195/store.js#L143-L145 "Source code on GitHub")

Creates a read stream returning all the Vertices in a trie given a root merkle link

**Parameters**

-   `link` **Link** 

Returns **ReadStream** 
