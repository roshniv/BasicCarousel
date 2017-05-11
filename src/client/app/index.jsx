import React from 'react';
import {render} from 'react-dom';
import Carousel from './Carousel.jsx';
import data from './data.json';

export default class DemoCarousel extends React.Component {
  	render () {
	  	return (
			<div className="main">
				<Carousel dataArray={data.carousel} />
			</div>
		);
  	}
}

render(<DemoCarousel/>, document.getElementById('app'));
