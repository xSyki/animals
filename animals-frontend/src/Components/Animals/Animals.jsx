import animals from "../../animalImages";

function Animals(props) {

    return (
        <div className='animals player__animals'>
            {animals.map((animal) => {
                return (<div className='animals__animal' key={animal.name}>
                    <img className='animals__photo' src={animal.image} />
                    <p className='animals__name'>{props.animals[animal.name]}</p>
                </div>)
            })}
        </div>

    );
}

export default Animals;
