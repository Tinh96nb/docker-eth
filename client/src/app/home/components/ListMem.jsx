import React, { Component } from 'react';
import {Card, Table} from 'react-bootstrap';

export default class ListMem extends Component {
  render() {
    return (
      <Card>
        <Card.Header as="h5">List Member</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width: '15%'}}>#</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
                {this.props.members.map((mem, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{mem}</td>
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