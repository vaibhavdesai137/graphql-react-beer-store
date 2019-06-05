import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { getToken } from './utils/helpers';
import Navbar from './components/Navbar';
import App from './components/App';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Checkout from './components/Checkout';
import Brews from './components/Brews';
import "gestalt/dist/gestalt.css";

// Redirection for all routes that need login
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        getToken() !== null ?
            <Component {...props} /> : <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }} />
    )} />
);

const Root = () => (
    <Router>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route component={App} exact path="/" />
                <Route component={Signup} path="/signup" />
                <Route component={Signin} path="/signin" />
                <PrivateRoute component={Checkout} path="/checkout" />
                <Route component={Brews} path="/:brandId" />
            </Switch>
        </React.Fragment>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
