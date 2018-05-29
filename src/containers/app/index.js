import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Pokemons from '../pokemons';
import Details from '../details';

import './app.css';

const App = () => (
  <div>
    <main>
      <Switch>
        <Route exact path="/pokemons" component={Pokemons} />
        <Route path="/:pokemon/details" component={Details}/>
        <Redirect from="/" to="/pokemons"/>
      </Switch>
    </main>
  </div>
);

export default App;
