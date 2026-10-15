// Run: node Model.test.js
var assert = require("assert")
var M = require("./Model.js")

var n = function(id, pid) {
  return { id: id, ready: true, properties: { "application.process.id": pid, "application.name": "Chromium" } }
}
var g = M.groupStreams([n(1, 10), n(2, 20), n(3, 10), n(4, 0)])
assert.deepStrictEqual(g.map(function(x) { return x.nodes.length }), [2, 1, 1])
assert.strictEqual(g[2].key, "n4")

var labels = M.parseStreamLabels("10\tTeams For Linux\n20\t+system\nbad\n")
assert.strictEqual(M.streamLabel(n(1, 10), [], [], labels), "Teams For Linux")
assert.strictEqual(M.streamLabel(n(2, 20), [], [], labels), "Chromium · system")
assert.strictEqual(M.streamLabel(n(4, 0), [], [], labels), "Chromium")

// Nodes first appear without usable properties. Once ready, regroup and label
// the same objects; never read properties before binding has completed.
var ready = false
var late = function(id) {
  return {
    id: id,
    get ready() { return ready },
    get properties() {
      assert.ok(ready, "properties read before ready")
      return { "application.process.id": 10, "application.name": "Chromium" }
    }
  }
}
var nodes = [late(11), late(12)]
var before = M.groupStreams(nodes)
assert.strictEqual(before.length, 2)
assert.strictEqual(M.streamPid(nodes[0]), "")
ready = true
var after = M.groupStreams(nodes)
assert.strictEqual(after.length, 1)
assert.strictEqual(after[0].nodes.length, 2)
assert.notStrictEqual(M.groupsSignature(before), M.groupsSignature(after))
assert.strictEqual(M.streamLabel(nodes[0], [], nodes, labels), "Teams For Linux")
console.log("ok")
