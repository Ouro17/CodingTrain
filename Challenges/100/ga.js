const nextGeneration = () => {

    // add always the last best bird?
    calculateFitness();

    for (let i = 0; i < TOTAL; ++i) {
        birds[i] = pickOne();
    }

    savedBirds = [];

    console.log('Next Generation');
}


const calculateFitness = () => {
    const sum = savedBirds.reduce((acc, bird) => acc + bird.score, 0);
    savedBirds.forEach(bird => bird.fitness = bird.score / sum);
}

const pickOne = () => {

    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - savedBirds[index].fitness;
        ++index;
    }

    --index;

    let bird =  savedBirds[index];
    let child = new Bird(bird.brain);
    child.mutate(mutation);

    return child;
}

const mutation = val => val + randomGaussian(0, 0.1);