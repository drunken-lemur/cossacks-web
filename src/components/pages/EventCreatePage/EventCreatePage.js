import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Wrapper = styled.div``;

class EventCreatePage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    subComponent: PropTypes.object
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const { className, ...rest } = this.props;

    return (
      <Wrapper className={className} {...rest}>
        EventCreatePage
      </Wrapper>
    );
  }
}

export default styled(EventCreatePage)``;