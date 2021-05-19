import './App.css';
<<<<<<< HEAD

import ScreenRoadPlanner from './screens/ScreenRoadPlanner';
=======
import './Home.css';
import Nav from './components/Nav'
>>>>>>> 226429b1e3bf26e583289198810faba17ff09bff

//REACT ROUTER
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import ScreenHome from './screens/ScreenHome';
<<<<<<< HEAD
import SearchModal from './components/SearchModal';
function App() {
  return (
    
    
    
    // <SearchPage></SearchPage>
=======

//REDUX
import region from './reducers/region.reducer';
import activities from './reducers/activities.reducer';
import { Provider } from 'react-redux';
import { createStore, combineReducers }  from 'redux';

const store = createStore(combineReducers({ region, activities }));

function App() {
  return (
    <Provider store={ store }>
>>>>>>> 226429b1e3bf26e583289198810faba17ff09bff
      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <Route component={ScreenRoadPlanner} path="/roadPlanner"  />
          {/* <Route component={ScreenConnexion} path="/connexion"  />
          <Route component={ScreenSearch} path="/recherche"  />                    
          <Route component={ScreenInfo} path="/info"  />
          <Route component={ScreenPartner} path="/partenaire"  />
          <Route component={ScreenRoadPlanner} path="/roadPlanner"  />
          <Route component={ScreenTrips} path="/voyages"  />
          <Route component={ScreenProfil} path="/profil"  />
          <Route component={ScreenBasket} path="/panier"  />
          <Route component={ScreenSuggestion} path="/suggestion"  /> */}
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;