import rabbitImage from "../../assets/images/animals/rabbit.png";
import sheepImage from "../../assets/images/animals/sheep.png";
import pigImage from "../../assets/images/animals/pig.png";
import cowImage from "../../assets/images/animals/cow.png";
import horseImage from "../../assets/images/animals/horse.png";
import novImage from "../../assets/images/animals/fox.png";
import wolfImage from "../../assets/images/animals/wolf.png";

const rabbit = {
  name: "rabbit",
  image: rabbitImage,
};

const sheep = {
  name: "sheep",
  image: sheepImage,
};

const pig = {
  name: "pig",
  image: pigImage,
};

const cow = {
  name: "cow",
  image: cowImage,
};

const horse = {
  name: "horse",
  image: horseImage,
};

const nov = {
  name: "nov",
  image: novImage,
};

const wolf = {
  name: "wolf",
  image: wolfImage,
};

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
  wolf,
];

export const secondDiceType = [
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
  nov,
];
