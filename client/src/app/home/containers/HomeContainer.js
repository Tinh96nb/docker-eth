import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'react-bootstrap';

import ListMem from '../components/ListMem';
import ListDoc from '../components/ListDoc';

import { fetchDocuments } from '../reducer';
class HomeContainer extends Component {

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.DocumentManager;
    const web3 = drizzle.web3;
    const ContractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
    this.props.fetchDocuments(ContractWeb3);
  }

  render() {
    const { documents, members } = this.props
    return (
      <Row className="mt-4">
        <Col md={9}>
          <ListDoc documents={documents} />
        </Col>
        <Col md={3}>
          <ListMem members={members} />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  const { members, documents } = state.home;
  return {
    members,
    documents
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDocuments: (contract) => dispatch(fetchDocuments(contract)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);