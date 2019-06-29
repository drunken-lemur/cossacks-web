import React from 'react';
import {observer} from 'mobx-react';
import {Auth, Users} from 'services';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

@withRouter
@observer
class Login extends React.Component {  constructor(props) {
  super(props);
  this.state = {};
}

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  login() {
    const { email, password } = this.state;

    return Auth.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => this.setState({ error }));
  }

  registration() {
    const { email, password } = this.state;

    return Users.create({ email, password })
      .then(() => this.login());
  }


  render() {
    return <main className="login container">
      <div className="row">
        <div className="col-12 col-6-tablet push-3-tablet text-center heading">
          <h1 className="font-100">Log in or signup</h1>
          <p>{this.state.error && this.state.error.message}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
          <form className="form">
            <fieldset>
              <input className="block" type="email" name="email" placeholder="email" onChange={ev => this.updateField('email', ev)} />
            </fieldset>

            <fieldset>
              <input className="block" type="password" name="password" placeholder="password" onChange={ev => this.updateField('password', ev)} />
            </fieldset>

            <button type="button" className="button button-primary block signup" onClick={() => this.login()}>
              Log in
            </button>

            <button type="button" className="button button-primary block signup" onClick={() => this.registration()}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </main>;
  }
}

export default styled(Login)``;