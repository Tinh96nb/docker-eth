import React, { Component, Fragment } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import UploadFile from 'components/form/UploadFile';
import loadingIcon from 'images/loading.svg';

class ModalUpload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      blockMined: null,
      loading: false
    }

    this.handleHideModal = this.handleHideModal.bind(this);
  }

  getInfoFile(infoFileUploaded) {
    this.setState({loading: true});
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.DocumentManager;
    const owner = drizzleState.accounts[0];

    const responseCb = (blocMined) => {
      blocMined.content.linkIpfs = infoFileUploaded.ipfs
      this.setState({
        blockMined: blocMined,
        loading: false
      })
    };
    this.props.addNewDocuments(infoFileUploaded, contract, owner, responseCb);
  }

  renderFileInfo(block) {
    return (
      <Table hover>
        <thead>
          <tr>
            <th style={{width: '21%'}}>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Doc number</td>
            <td>{block.content.numDoc}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{block.content.name}</td>
          </tr>
          <tr>
            <td>Hash content</td>
            <td>{block.content.contentHash}</td>
          </tr>
          <tr>
            <td>Link ipfs</td>
            <td>
              <a href={`https://ipfs.io/ipfs/${block.content.linkIpfs}`}>
                {block.content.linkIpfs}
              </a>
            </td>
          </tr>
          <tr>
            <td>Link crypt</td>
            <td>
              {block.content.linkIpfsCrypt}
            </td>
          </tr>
          <tr>
            <td>Owner adress</td>
            <td>{block.content.owner}</td>
          </tr>
          <tr>
            <td>Block status</td>
            <td>{block.status ? 'Success' : 'Fail'}</td>
          </tr>
          <tr>
            <td>Gas used</td>
            <td>{block.gasUsed} Gwei</td>
          </tr>
          <tr>
            <td>Block number</td>
            <td>{block.blockNumber}</td>
          </tr>
          <tr>
            <td>Block hash</td>
            <td>{block.blockHash}</td>
          </tr>
          <tr>
            <td>Transaction hash</td>
            <td>{block.transactionHash}</td>
          </tr>
        </tbody>
      </Table>
    )
  }

  handleHideModal() {
    this.setState({
      documentInfo: null,
      blockMined: null
    })
    this.props.handleHide();
  }

  render() {
    const { blockMined, loading } = this.state
    return (
      <Fragment>
      <Modal
        size="lg"
        show={this.props.isShowUpload}
        onHide={() => this.handleHideModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload new file document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadFile
            getInfo={(data) => this.getInfoFile(data)}
          />

          { loading ?  <div className="text-center">
            <img src={loadingIcon}/>
            <p>Mine Ethereum... </p>
          </div> : ''}

          { blockMined ? this.renderFileInfo(blockMined) : null }
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.handleHideModal()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
    );
  }
}

export default ModalUpload;