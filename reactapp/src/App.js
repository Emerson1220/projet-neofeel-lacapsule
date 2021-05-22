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
import experiences from './reducers/experiences.reducer';
import token from './reducers/token.reducer';
import user from './reducers/user.reducer'
import roadplanner from './reducers/roadplanner.reducer'
import { Provider } from 'react-redux';
import { createStore, combineReducers }  from 'redux';

//STRIPE
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const store = createStore(combineReducers({ region, activities, experiences, token, roadplanner, user }));

const stripePromise = loadStripe('pk_test_51ItWKHK4yUyeZ8DTbPXklGpEqt6WL7YLvokEzbudM7jHc8Z72swBjC0aY38j3STBcWqWNsdRGWOKnDCyZsWoXQkr00SfyDo7CD')

function App() {
  return (
    <Provider store={ store }>
      <Elements stripe={ stripePromise }>
        <Router>
          <Switch>
            <Route component={ ScreenHome } path="/" exact />
            <Route component={ ScreenRoadPlanner } path="/roadPlanner"  />
            <Route component={ ScreenLogin } path="/connexion"  />
            <Route component={ ScreenSearch } path="/recherche"  />                    
            <Route component={ ScreenInfo } path="/info"  />
            <Route component={ ScreenPartner } path="/partenaire"  />
            <Route component={ ScreenRoadPlanner } path="/roadPlanner"  />
            <Route component={ ScreenProfile } path="/profil"  />
            <Route component={ ScreenBasket } path="/panier"  />
            <Route component={ScreenSuggestions} path="/suggestions"  />  
          </Switch>
        </Router>
      </Elements>
    </Provider>

  );
}

export default App;