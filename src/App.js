import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';
import Team from './pages/Team';
import Favorites from './pages/Favorites';
import Cards from './pages/Cards';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  const location = useLocation();
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <Provider store={ store }>
          <Switch location={location} key={location.key}>
            <Route exact path="/pokedex-react" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/cards" component={Cards} />
            <Route exact path="/pokemon/:id" component={Details} />
            <Route exact path="*" component={Home} />
          </Switch>
        </Provider>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default App;
