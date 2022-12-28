import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DetailsPokemon from './pages/DetailsPokemon';
import DetailsMove from './pages/DetailsMove';
import Search from './pages/Search';
import Team from './pages/Team';
import Favorites from './pages/Favorites';
import Cards from './pages/Cards';
import Alternatives from './pages/Alternatives';
import Moves from './pages/Moves';

function App() {
  const location = useLocation();
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
          <Switch location={location} key={location.key}>
            <Route exact path="/pokedex-react" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/alternatives" component={Alternatives} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/cards" component={Cards} />
            <Route exact path="/pokemon/:id" component={DetailsPokemon} />
            <Route exact path="/moves" component={Moves} />
            <Route exact path="/moves/:name" component={DetailsMove} />
            <Route exact path="*" component={Home} />
          </Switch>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default App;
