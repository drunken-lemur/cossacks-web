import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import {FieldGroup, Form, Input} from 'forms';

@observer
class UserForm extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    userForm: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: ''
  };

  fields = {
    email: Input,
    password: Input,
    firstName: Input,
    lastName: Input,
    middleName: Input,
    avatar: Input,
    phone: Input,
  };

  componentDidMount() {
    const {userForm} = this.props;

    userForm.reset();
  }

  render() {
    const {userForm, ...rest} = this.props;

    return (
      <Form {...rest} form={userForm}>
        <FieldGroup fields={this.fields}/>
      </Form>
    );
  }
}

export default styled(UserForm)``;
