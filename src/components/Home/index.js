import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Home extends Component {
  LogOut = () => {
    const cookieValue = Cookies.get('jwt_token')
    console.log('Logout button clicked')
    console.log(cookieValue)
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <button type="button" className="logout-button" onClick={this.LogOut}>
            Logout
          </button>
        </nav>
        <div className="digital-card-container">
          <div>
            <h1 className="flexibility-heading">
              Your Flexibility, Our Excellence
            </h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
              alt="digital card"
              className="digital-card"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
