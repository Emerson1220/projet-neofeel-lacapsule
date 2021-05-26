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
import ScreenBecomePartner from './screens/ScreenBecomePartner';
import ScreenProfile from './screens/ScreenProfile';
import ScreenBasket from './screens/ScreenBasket';
import Footer from './components/Footer';


//REDUX
import region from './reducers/region.reducer';
import activities from './reducers/activities.reducer';
import experiences from './reducers/experiences.reducer';
import user from './reducers/user.reducer'
import roadplanner from './reducers/roadplanner.reducer';
import suggestions from './reducers/suggestions.reducer'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

//STRIPE
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { options } from 'less';

const store = createStore(combineReducers({ region, activities, experiences, roadplanner, user, suggestions }));

const stripePromise = loadStripe('pk_test_51ItWKHK4yUyeZ8DTbPXklGpEqt6WL7YLvokEzbudM7jHc8Z72swBjC0aY38j3STBcWqWNsdRGWOKnDCyZsWoXQkr00SfyDo7CD')

function App() {
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise} >

        <div style={styles.page_container}>
          <Router>
            <div style={styles.content_wrapper}>
              <Switch>
                <Route component={ScreenHome} path="/" exact />
                <Route component={ScreenRoadPlanner} path="/roadPlanner" />
                <Route component={ScreenLogin} path="/connexion" />
                <Route component={ScreenSearch} path="/recherche" />
                <Route component={ScreenInfo} path="/info" />
                <Route component={ScreenPartner} path="/partenaire/:experienceID" />
                <Route component={ScreenBecomePartner} path="/partenaire/" />
                <Route component={ScreenRoadPlanner} path="/roadPlanner" />
                <Route component={ScreenProfile} path="/profil" />
                <Route component={ScreenBasket} path="/panier" />
                <Route component={ScreenSuggestions} path="/suggestions" />
              </Switch>
            </div>
            <Footer />
          </Router>
        </div>
      </Elements>
    </Provider>


  );
}

export default App;

const styles = {
  page_container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content_wrap: {
    flex: 2
  }
}