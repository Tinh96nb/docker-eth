import * as React from 'react';
import { getWeb3 } from './getWeb3';
import MetaMask from 'components/ui/MetaMask';

export default class CheckWeb3 extends React.Component {

  constructor () {
    super()
    this.state = {
      isInjectWeb3: true
    }
  }

  componentDidMount() {
    getWeb3().then(data => {
      this.setState({isInjectWeb3: true})
    }).catch((e) => {
      this.setState({isInjectWeb3: false})
    })
  }

  render() {
    // not install metamask
    if (!this.state.isInjectWeb3) {
      return <MetaMask />;
    }
    return this.props.children;
  }
}
