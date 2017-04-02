let data;
let graph;
let dropdown;

function preload() {
    data = loadJSON('kevinbacon.json');
}

function setup() {
    graph = new Graph();
    dropdown = createSelect();
    dropdown.changed(bfs);

    noCanvas();

    const movies = data.movies;

    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i].title;
        const cast = movies[i].cast;
        const movieNode = new Node(movie);
        graph.addNode(movieNode);

        for (let j = 0; j < cast.length; j++) {
            const actor = cast[j];
            let actorNode = graph.getNode(actor);

            if (actorNode == undefined) {
                actorNode = new Node(actor);
                dropdown.option(actor);
            }

            graph.addNode(actorNode);
            movieNode.addEdge(actorNode);
        }
    }



}

function bfs() {
    graph.reset();
    
    const start = graph.setStart(dropdown.value());
    // const start = graph.setStart("Kevin Bacon");
    const end = graph.setEnd("Kevin Bacon");

    const queue = [];

    start.searched = true;
    queue.push(start);
    let current;
    let neighbor;
    let found = false;

    while (!found && queue.length > 0) {
        current = queue.shift();
        found = current == end;

        if (!found) {
            const edges = current.edges;
            for (let i = 0; i < edges.length; ++i) {
                neighbor = edges[i];
                if (!neighbor.searched) {
                    neighbor.searched = true;
                    neighbor.parent = current;
                    queue.push(neighbor);
                }
            }
        }
    }

    const path = [];
    path.push(end);
    let next = end.parent;

    while (next != null) {
        path.push(next);
        next = next.parent;
    }

    let text = '';
    for (let i = path.length - 1; i >= 0; i--) {
        let n = path[i];
        text += n.value;

        if (i != 0) {
            text += ' --> ';
        }
    }

    createP(text);
}
