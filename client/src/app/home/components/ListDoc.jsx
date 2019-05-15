import React, { Component } from 'react';
import {Card, Table} from 'react-bootstrap';
import { convertTimeStampToString } from 'utils/helper/common';

export default class ListDoc extends Component {
  render() {
    return (
      <Card>
        <Card.Header as="h5">List Document</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width: '5%'}}>#</th>
                <th>Name</th>
                <th>Hash content</th>
                <th>Link crypt</th>
                <th>Owner</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
                {this.props.documents.map((doc, index) => {
                  const dateUploaded = convertTimeStampToString(doc.createdAt);
                  return (
                    <tr key={index}>
                      <td>{doc.numDoc}</td>
                      <td>{doc.name}</td>
                      <td>{doc.contentHash}</td>
                      <td>{doc.linkIpfsCrypt}</td>
                      <td>{doc.owner}</td>
                      <td>{dateUploaded}</td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}