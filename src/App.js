import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';

function App() {
  const location = useLocation();
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <div className="bg-wallpaper-lilas bg-cover">
          <Switch location={location} key={location.key}>
            <Route exact path="/pokedex-react" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/pokemon/:id" component={Details} />
            <Route exact path="*" component={Home} />
          </Switch>
        </div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default App;
