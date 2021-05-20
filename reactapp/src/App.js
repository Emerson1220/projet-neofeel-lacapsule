import './App.css';

//REACT ROUTER
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//pages
import ScreenHome from './screens/ScreenHome';
import ScreenRoadPlanner from './screens/ScreenRoadPlanner';
import ScreenSuggestions from './screens/ScreenSuggestions';
import ScreenSearch from './screens/ScreenSearch';
import ScreenLogin from './screens/ScreenLogin';
import ScreenInfo from './screens/ScreenInfo';
import ScreenPartner from './screens/ScreenPartner';
import ScreenProfile from './screens/ScreenProfile';
import ScreenBasket from './screens/ScreenBasket';


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
          <Route component={ ScreenInfo } path="/info"  />
          <Route component={ ScreenPartner } path="/partenaire"  />
          <Route component={ ScreenRoadPlanner } path="/roadPlanner"  />
          {/* <Route component={ ScreenTrips } path="/voyages"  /> */}
          <Route component={ ScreenProfile } path="/profil"  />
          <Route component={ ScreenBasket } path="/panier"  />
          <Route component={ScreenSuggestions} path="/suggestions"  />  
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;