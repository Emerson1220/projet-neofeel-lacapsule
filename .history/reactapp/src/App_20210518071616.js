import './App.css';
import Nav from './Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    
    
    
    // <SearchPage></SearchPage>
      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
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

  );
}

export default App;