import animals from "./animalsImages";

const rabbitImage = animals.rabbit;
const sheepImage = animals.sheep;
const pigImage = animals.pig;
const cowImage = animals.cow;
const horseImage = animals.horse;
const smallDogImage = animals.smallDog;
const bigDogImage = animals.bigDog;

const exchangeTable = [
    [
        {
            animal: "rabbit",
            image: rabbitImage,
            amount: 6
        },
        {
            animal: "sheep",
            image: sheepImage,
            amount: 1
        }
    ],
    [
        {
            animal: "pig",
            image: pigImage,
            amount: 1
        },
        {
            animal: "sheep",
            image: sheepImage,
            amount: 2
        }
    ],
    [
        {
            animal: "cow",
            image: cowImage,
            amount: 1
        },
        {
            animal: "pig",
            image: pigImage,
            amount: 3
        }
    ],
    [
        {
            animal: "horse",
            image: horseImage,
            amount: 1
        },
        {
            animal: "cow",
            image: cowImage,
            amount: 2
        }
    ],
    [
        {
            animal: "smallDog",
            image: smallDogImage,
            amount: 1
        },
        {
            animal: "sheep",
            image: sheepImage,
            amount: 1
        }
    ],
    [
        {
            animal: "bigDog",
            image: bigDogImage,
            amount: 1
        },
        {
            animal: "cow",
            image: cowImage,
            amount: 1
        }
    ]
]

export default exchangeTable;