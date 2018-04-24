function Graph() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
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

Graph.prototype.setStart = function (actor) {
    this.start = this.graph[actor];
    return this.start;
}

Graph.prototype.setEnd = function (actor) {
    this.end = this.graph[actor];
    return this.end;
}

Graph.prototype.reset = function () {
    for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].searched = false;
        this.nodes[i].parent = null;
    }
};
