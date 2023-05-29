import { useState } from 'react'
import { FaArrowRight, FaPlus, FaTable } from 'react-icons/fa'

import exchangeTable from './exchangeTable'

function TableExchange() {
    const [isTableExchange, setIsTableExchange] = useState(false)

    return isTableExchange ? (
        <div className="table">
            <button
                type="submit"
                title="Close table"
                className="table__close-btn"
                onClick={() => setIsTableExchange(false)}
            >
                <FaPlus className="table__close-icon" />
            </button>
            <div className="table__offers">
                {exchangeTable.map((offer) => (
                    <div className="table__offer" key={offer[0].animal}>
                        <div className="table__what">
                            {offer[0].amount}
                            <img
                                src={offer[0].image}
                                className="table__img"
                                alt={offer[0].animal}
                            />
                        </div>
                        <FaArrowRight className="table__arrow" />
                        <div className="table__for">
                            {offer[1].amount}
                            <img
                                src={offer[1].image}
                                className="table__img"
                                alt={offer[1].animal}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <button
            type="submit"
            title="Open table"
            className="table__show-btn"
            onClick={() => setIsTableExchange(true)}
        >
            <FaTable />
        </button>
    )
}

export default TableExchange
