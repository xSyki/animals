const rabbit = "https://syki.pl/wp-content/uploads/2022/03/rabbit.png";
const sheep = "https://syki.pl/wp-content/uploads/2022/03/sheep.png";
const pig = "https://syki.pl/wp-content/uploads/2022/03/pig.png";
const cow = "https://syki.pl/wp-content/uploads/2022/03/4e0ce113d3898c4.png";
const horse = "https://syki.pl/wp-content/uploads/2022/03/271cf234747654b.png";
const smallDog = "https://syki.pl/wp-content/uploads/2022/03/piq_58417_400x400.png"
const bigDog = "https://syki.pl/wp-content/uploads/2022/03/bigDog.png";

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