import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {
  const location = useLocation();
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route exact path="/pokedex-react" component={Home} />
          <Route exact path="" component="" />
        </Switch>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default App;
