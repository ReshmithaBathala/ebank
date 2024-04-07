import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="bad-path" />
  </Switch>
)

export default App
