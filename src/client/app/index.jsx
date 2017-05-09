import React from 'react';
import {render} from 'react-dom';
import AComponent from './AComponent.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
    		<p> Hello React!</p>
    		<AComponent />
    	</div>
    );
  }
}

render(<App/>, document.getElementById('app'));