import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import 'css/main.css';

import NavBar from 'components/ui/NavBar';
import CheckWeb3 from 'utils/helper/checkWeb3';

// import Home from './home';
// import { Document } from './document';

class App extends Component {
  render() {
    return (
      <CheckWeb3>
        <Router>
          <Fragment>
            <NavBar/>
            <Container>
              <Row className="wraper">
                <Col md={12}>
                  <Switch>
                    <Route component={() => (<p>Not Found</p>)} />
                  </Switch>
                </Col>
              </Row>
            </Container>
          </Fragment>
        </Router>
      </CheckWeb3>
    );
  }
}

export default App;