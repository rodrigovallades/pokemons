import React from 'react'

import './PokemonCard.css'

export default props => (
  <div key={props.index} className="card pokemons__pokemon" onClick={props.onClick}>
    <div className="card-body">
      <h5 className="card-title">{props.name}</h5>
    </div>
  </div>
)
