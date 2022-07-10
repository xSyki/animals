import rabbitImage from '../../assets/images/animals/rabbit.png';
import sheepImage from '../../assets/images/animals/sheep.png';
import pigImage from '../../assets/images/animals/pig.png';
import cowImage from '../../assets/images/animals/cow.png';
import horseImage from '../../assets/images/animals/horse.png';
import smallDogImage from '../../assets/images/animals/small-dog.png';
import bigDogImage from '../../assets/images/animals/big-dog.png';

export interface animalInterface {
    animal: animalType,
    image: string,
    amount: number
}

type animalType = "rabbit" | "sheep" | "pig" | "cow" | "horse" | "smallDog" | "bigDog";

const exchangeTable: animalInterface[][] = [
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