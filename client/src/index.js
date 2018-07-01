import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import Home from './components/Home';
import Flow from './components/Flow';

class Routers extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={App} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/Flow" component={Flow} />
        </div>
      </BrowserRouter>
      </div>
    );
  }
}




ReactDOM.render(<Routers />, document.getElementById('root'));
registerServiceWorker();
