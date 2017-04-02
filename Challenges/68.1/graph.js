function Graph() {
    this.nodes = [];
    this.graph = {};
}

Graph.prototype.addNode = function (node) {
    // Node into array
    this.nodes.push(node);
    let title = node.value;
    //Node into "hash"
    this.graph[title] = node;
}

Graph.prototype.getNode = function (item) {
    return this.graph[item];
}
