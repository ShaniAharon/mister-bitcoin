import './assets/scss/global.scss';
import {AppHeader} from './cmps/AppHeader';
import {ContactPage} from './pages/ContactPage';
import {HomePage} from './pages/HomePage';
import {StatisticPage} from './pages/StatisticPage';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ContactDetails} from './pages/ContactDetails';
import {ContactEdit} from './pages/ContactEdit';
import {signupPage} from './pages/signupPage';
import {userService} from './services/userService';

export function App() {
  const PrivateRoute = (props) => {
    // return props.isAdmin ? <Route component={props.component} path={props.path} /> : <Redirect to='/' />
    console.log(props);
    const user = userService.getUser();
    return user ? <Route {...props} /> : <Redirect to="/signup" />;
  };

  const isUser = () => {
    // check if needed or only inside privteRoute
    const user = userService.getUser();
    console.log(user);
    return user;
    // console.log(user);
  };

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main>
          <Switch>
            <Route component={ContactEdit} path="/contact/edit/:id?" />
            <Route component={ContactDetails} path="/contact/:id" />
            <Route component={StatisticPage} path="/statistic" />
            <Route component={ContactPage} path="/contact" />
            <Route component={signupPage} path="/signup" />
            <PrivateRoute isAdmin={isUser()} component={HomePage} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
