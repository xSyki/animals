import animals from "../../animalsImages";

import novImage from "../../assets/images/animals/fox.png";
import wolfImage from "../../assets/images/animals/wolf.png";

// const rabbitImage = animals.rabbit;
// const sheepImage = animals.sheep;
// const pigImage = animals.pig;
// const cowImage = animals.cow;
// const horseImage = animals.horse;

const { rabbit: rabbitImage, sheep: sheepImage, pig: pigImage, cow: cowImage, horse: horseImage } = animals;

const rabbit = {
    animal: "rabbit",
    image: rabbitImage
}

const sheep = {
    animal: "sheep",
    image: sheepImage
}

const pig = {
    animal: "pig",
    image: pigImage
}

const cow = {
    animal: "cow",
    image: cowImage
}

const horse = {
    animal: "horse",
    image: horseImage
}

const nov = {
    animal: "nov",
    image: novImage
}

const wolf = {
    animal: "wolf",
    image: wolfImage
}



export const firstDiceType = [
    rabbit,
    sheep,
    rabbit,
    pig,
    rabbit,
    sheep,
    rabbit,
    rabbit,
    rabbit,
    sheep,
    cow,
    wolf
]

export const secoundDiceType = [
    rabbit,
    sheep,
    rabbit,
    pig,
    rabbit,
    sheep,
    rabbit,
    rabbit,
    rabbit,
    pig,
    horse,
    nov
]