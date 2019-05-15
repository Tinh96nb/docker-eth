import React, { Component } from "react";
import { drizzleConnect } from "drizzle-react";

class App extends Component {
  render() {
    const { drizzleStatus, accounts } = this.props;

    
    if (drizzleStatus.initialized) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Tutorial Token</h1>
            <p>
              <strong>Total Supply</strong>:{" "}
            </p>
            <h3>Send Tokens</h3>
          </header>
        </div>
      );
    }

    return <div>Loading dapp...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    contracts: state.contracts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkingDay: () => dispatch(fetchWorkingDay())
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps, mapDispatchToProps);
export default AppContainer;