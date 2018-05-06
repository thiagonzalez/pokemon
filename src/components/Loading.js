import React, { Component } from 'react';
import loader from '../images/loader.svg';

class Loading extends Component {
  render() {
    return(
      <div className="loading">
        <img src={loader} alt="loading icon" />
      </div>
    );
  }
}

export default Loading;
