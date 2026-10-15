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
console.log("ok")
