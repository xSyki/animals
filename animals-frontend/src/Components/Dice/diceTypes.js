import rabbitImage from '../../assets/images/animals/rabbit.png';
import sheepImage from '../../assets/images/animals/sheep.png';
import pigImage from '../../assets/images/animals/pig.png';
import cowImage from '../../assets/images/animals/cow.png';
import horseImage from '../../assets/images/animals/horse.png';
import novImage from "../../assets/images/animals/fox.png";
import wolfImage from "../../assets/images/animals/wolf.png";

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