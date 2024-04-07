import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    userIdNum: '',
    passwordPinNum: '',
    isError: false,
    errorMsg: '',
  }

  onChangeInputText = event => {
    this.setState({userIdNum: event.target.value})
  }

  onChangePin = event => {
    this.setState({passwordPinNum: event.target.value})
  }

  onFailure = errorMessage => {
    this.setState({isError: true, errorMsg: errorMessage})
  }

  submitCredentials = async event => {
    event.preventDefault()
    const {userIdNum, passwordPinNum} = this.state
    const response = await fetch('https://apis.ccbp.in/ebank/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userIdNum,
        pin: passwordPinNum,
      }),
    })
    const data = await response.json()
    if (response.ok === true) {
      const token = data.jwt_token
      console.log(token)
      Cookies.set('jwt_token', token, {expires: 30, path: '/'})
      // console.log(this.props)
      const {history} = this.props
      history.replace('/')
    } else {
      // console.log(data.error_msg)
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userIdNum, passwordPinNum, isError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form className="login-container" onSubmit={this.submitCredentials}>
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-image"
          />
          <div className="login-form-container">
            <h1>Welcome Back!</h1>
            <div className="label-input-container">
              <label htmlFor="userId" className="user-id-label">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input-text"
                onChange={this.onChangeInputText}
                value={userIdNum}
                placeholder="Enter User ID"
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="passwordPin" className="user-id-label">
                PIN
              </label>
              <input
                type="password"
                id="passwordPin"
                className="input-text"
                value={passwordPinNum}
                onChange={this.onChangePin}
                placeholder="Enter PIN"
              />
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
            {isError === true && <p className="error-message">{errorMsg}</p>}
          </div>
        </div>
      </form>
    )
  }
}

export default Login
