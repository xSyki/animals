import animals from "./animalImages";

const rabbit = animals.find(animal => animal.name === "rabbit").image;
const sheep = animals.find(animal => animal.name === "sheep").image;
const pig = animals.find(animal => animal.name === "pig").image;
const cow = animals.find(animal => animal.name === "cow").image;
const horse = animals.find(animal => animal.name === "horse").image;
const smallDog = animals.find(animal => animal.name === "smallDog").image;
const bigDog = animals.find(animal => animal.name === "bigDog").image;

const exchangeTable = [
    [
        {
            animal: "rabbit",
            image: rabbit,
            amount: 6
        },
        {
            animal: "sheep",
            image: sheep,
            amount: 1
        }
    ],
    [
        {
            animal: "pig",
            image: pig,
            amount: 1
        },
        {
            animal: "sheep",
            image: sheep,
            amount: 2
        }
    ],
    [
        {
            animal: "cow",
            image: cow,
            amount: 1
        },
        {
            animal: "pig",
            image: pig,
            amount: 3
        }
    ],
    [
        {
            animal: "horse",
            image: horse,
            amount: 1
        },
        {
            animal: "cow",
            image: cow,
            amount: 2
        }
    ],
    [
        {
            animal: "smallDog",
            image: smallDog,
            amount: 1
        },
        {
            animal: "sheep",
            image: sheep,
            amount: 1
        }
    ],
    [
        {
            animal: "bigDog",
            image: bigDog,
            amount: 1
        },
        {
            animal: "cow",
            image: cow,
            amount: 1
        }
    ]
]

export default exchangeTable;