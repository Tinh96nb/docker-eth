import React, { Component } from 'react';
import { Table, Button, Modal, ListGroup } from 'react-bootstrap';
import { getFromIpfs, dataToFile } from 'utils/helper/ipfs';
import { convertTimeStampToString } from 'utils/helper/common';

export default class ListDoc extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isShowModalDownload: false,
      docSelecting: null,
    }
    this.handleShowModalDownload = this.handleShowModalDownload.bind(this);
    this.renderModalDownload = this.renderModalDownload.bind(this);
    this.renderTableDoc = this.renderTableDoc.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  getDocFromBlockchain(numDoc) {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.DocumentManager;

    const cbResponse = (block) => this.setState({docSelecting: block})
    this.props.getDocByIndex(numDoc, contract, cbResponse);
  }

  handleDownload() {
    const {linkIpfsCrypt, name} = this.state.docSelecting
    getFromIpfs(linkIpfsCrypt).then((data) => {
      dataToFile(data, name);
    });
  }

  handleShowModalDownload(doc) {
    this.getDocFromBlockchain(doc.numDoc);
    this.setState({
      isShowModalDownload: true
    })
  }

  renderDocDetail(document) {
    return (
      <ListGroup>
        <ListGroup.Item><b>Name: </b> {document.name}</ListGroup.Item>
        <ListGroup.Item><b>Hash content: </b> {document.contentHash}</ListGroup.Item>
        <ListGroup.Item><b>Link ipfs crypt:</b> {document.linkIpfsCrypt}</ListGroup.Item>
        <ListGroup.Item><b>Owner address: </b> {document.owner}</ListGroup.Item>
      </ListGroup>
    )
  }

  renderModalDownload() {
    const { docSelecting } = this.state
    return (
      <Modal
        show={this.state.isShowModalDownload}
        onHide={() => this.setState({isShowModalDownload: false})}
      >
        <Modal.Header closeButton>
          <Modal.Title>Download Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {docSelecting ? this.renderDocDetail(docSelecting): ''}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.setState({isShowModalDownload: false})}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => this.handleDownload()}
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  renderTableDoc(documents) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{width: '5%'}}>#</th>
            <th>Name</th>
            <th>Hash Doc</th>
            <th>Link Ipfs Crypted</th>
            <th>Owner</th>
            <th style={{width: '13%'}}>Upload at</th>
            <th style={{width: '11%'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => {
            const dateUploaded = convertTimeStampToString(doc.createdAt);
            
            return (
              <tr key={index}>
                <td>{doc.numDoc}</td>
                <td>{doc.name}</td>
                <td>{doc.contentHash}</td>
                <td>{doc.linkIpfsCrypt}</td>
                <td>{doc.owner}</td>
                <td>{dateUploaded}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => this.handleShowModalDownload(doc)}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  render () {
    const { documents } = this.props
    return (
      <>
        {this.renderTableDoc(documents)}
        {this.renderModalDownload()}
      </>
    )
  }
}