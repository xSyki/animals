import animals from "./animalImages";

const rabbit = animals.find(animal => animal.name === "rabbit").image;
const sheep = animals.find(animal => animal.name === "sheep").image;
const pig = animals.find(animal => animal.name === "pig").image;
const cow = animals.find(animal => animal.name === "cow").image;
const horse = animals.find(animal => animal.name === "horse").image;
const nov = "/Images/Animals/fox-2.png";
const wolf = "/Images/Animals/wolf-2.png";

export const firstDiceType = [
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "pig",
        image: pig
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "cow",
        image: cow
    },
    {
        animal: "wolf",
        image: wolf
    }
]

export const secoundDiceType = [
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "pig",
        image: pig
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "pig",
        image: pig
    },
    {
        animal: "horse",
        image: horse
    },
    {
        animal: "nov",
        image: nov
    }
]