import './App.css';

//REACT ROUTER
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import ScreenHome from './screens/ScreenHome';
import ScreenRoadPlanner from './screens/ScreenRoadPlanner';
import ScreenSuggestion from './screens/ScreenSuggestions';
import ScreenSearch from './screens/ScreenSearch'
import ScreenLogin from './screens/ScreenLogin'
//REDUX
import region from './reducers/region.reducer';
import activities from './reducers/activities.reducer';
import experiences from './reducers/experiences.reducer'
import { Provider } from 'react-redux';
import { createStore, combineReducers }  from 'redux';

const store = createStore(combineReducers({ region, activities, experiences }));

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route component={ ScreenHome } path="/" exact />
          <Route component={ ScreenRoadPlanner } path="/roadPlanner"  />
          <Route component={ ScreenLogin } path="/connexion"  />
          <Route component={ ScreenSearch } path="/recherche"  />                    
          {/* <Route component={ScreenInfo} path="/info"  />
          <Route component={ScreenPartner} path="/partenaire"  />
          <Route component={ScreenRoadPlanner} path="/roadPlanner"  />
          <Route component={ScreenTrips} path="/voyages"  />
          <Route component={ScreenProfil} path="/profil"  />
          <Route component={ScreenBasket} path="/panier"  /> */}
          <Route component={ScreenSuggestion} path="/suggestion"  />  
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;