

function setup() {
    noCanvas();

    const values = [];
    for (let i = 0; i < 30; i++) {
        values[i] = random(0, 100);
    }

    const shape = [2, 5, 3];
    const data = tf.tensor(values, shape, 'int32');

    // const data = tf.tensor([0, 0, 127, 255, 10, 10, 27, 25], [2, 2, 2], 'int32');

    data.print();
}