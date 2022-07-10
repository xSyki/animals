import animals from "../../animalsImages";

function Animals(props) {

    const { playerHerd } = props;

    return (
        <div className='animals player__animals'>
            {Object.keys(animals).map((animalName) => {
                return (<div className='animals__animal' key={animalName}>
                    <img className='animals__photo' src={animals[animalName]} alt={animalName} />
                    <p className='animals__name'>{playerHerd ? playerHerd[animalName] : 0}</p>
                </div>)
            })}
        </div>

    );
}

export default Animals;