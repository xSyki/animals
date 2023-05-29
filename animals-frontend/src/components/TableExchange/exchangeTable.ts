import bigDogImage from '../../assets/images/animals/big-dog.png'
import cowImage from '../../assets/images/animals/cow.png'
import horseImage from '../../assets/images/animals/horse.png'
import pigImage from '../../assets/images/animals/pig.png'
import rabbitImage from '../../assets/images/animals/rabbit.png'
import sheepImage from '../../assets/images/animals/sheep.png'
import smallDogImage from '../../assets/images/animals/small-dog.png'

type AnimalType =
    | 'rabbit'
    | 'sheep'
    | 'pig'
    | 'cow'
    | 'horse'
    | 'smallDog'
    | 'bigDog'

export interface AnimalInterface {
    animal: AnimalType
    image: string
    amount: number
}

const exchangeTable: AnimalInterface[][] = [
    [
        {
            animal: 'rabbit',
            image: rabbitImage,
            amount: 6,
        },
        {
            animal: 'sheep',
            image: sheepImage,
            amount: 1,
        },
    ],
    [
        {
            animal: 'pig',
            image: pigImage,
            amount: 1,
        },
        {
            animal: 'sheep',
            image: sheepImage,
            amount: 2,
        },
    ],
    [
        {
            animal: 'cow',
            image: cowImage,
            amount: 1,
        },
        {
            animal: 'pig',
            image: pigImage,
            amount: 3,
        },
    ],
    [
        {
            animal: 'horse',
            image: horseImage,
            amount: 1,
        },
        {
            animal: 'cow',
            image: cowImage,
            amount: 2,
        },
    ],
    [
        {
            animal: 'smallDog',
            image: smallDogImage,
            amount: 1,
        },
        {
            animal: 'sheep',
            image: sheepImage,
            amount: 1,
        },
    ],
    [
        {
            animal: 'bigDog',
            image: bigDogImage,
            amount: 1,
        },
        {
            animal: 'cow',
            image: cowImage,
            amount: 1,
        },
    ],
]

export default exchangeTable
