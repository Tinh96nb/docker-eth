import React, { Component, Fragment } from 'react';
import miningIcon from 'images/mining.svg';
import loadingIcon from 'images/loading.svg';

import DocContainer from './containers/DocContainer';

export { docReducer } from './reducer';
export class Document extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isMining: false,
      drizzleState: null
    };
  }

  componentWillMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
        drizzle.web3.eth.isMining()
          .then((result) => this.setState({isMining: result}));
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Fragment>
        {(this.state.loading)
        ? (<div className="text-center">
          <img src={loadingIcon}/>
          <p> Connecting to Ethereum Virtual Machine... </p>
        </div>)
        : (
          <div>
            {(this.state.isMining) ? <div className="mining">
              <img src={miningIcon} />
              <span>mining...</span>
            </div>: ''}
            <DocContainer
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          </div>
          )
        }
      </Fragment>
    )
  }
}