import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Activity from '../Activity/Activity';
// import Receipts from './Receipts';

import './App.css';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
          <div className="container">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/activity/:id">
                <Activity />
              </Route>
              {/* <Route path="/receipts" component={Receipts} /> */}
            </Switch>
          </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;