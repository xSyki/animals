import rabbitImage from "../../assets/images/animals/rabbit.png";
import sheepImage from "../../assets/images/animals/sheep.png";
import pigImage from "../../assets/images/animals/pig.png";
import cowImage from "../../assets/images/animals/cow.png";
import horseImage from "../../assets/images/animals/horse.png";
import smallDogImage from "../../assets/images/animals/small-dog.png";
import bigDogImage from "../../assets/images/animals/big-dog.png";
import HerdInterface from "../../Interfaces/HerdInterface";

const animalsImages = {
  rabbit: rabbitImage,
  sheep: sheepImage,
  pig: pigImage,
  cow: cowImage,
  horse: horseImage,
  smallDog: smallDogImage,
  bigDog: bigDogImage,
};

interface AnimalsPropsInterface {
  animals: HerdInterface;
}

function Animals(props: AnimalsPropsInterface) {
  const { animals } = props;

  return (
    <div className="animals player__animals">
      {Object.keys(animalsImages).map((animalName, index) => (
        <div className="animals__animal" key={animalName}>
          <img
            className="animals__photo"
            src={Object.values(animalsImages)[index]}
            alt={animalName}
          />
          <p className="animals__name">
            {animals ? Object.values(animals)[index] : 0}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Animals;
