import React from 'react';
import {render} from 'react-dom';
import Carousel from './Carousel.jsx';

export default class DemoCarousel extends React.Component {
  	render () {
	  	var carouselImages = [
			"images/bike.png",
			"images/library.png",
			"images/people.png",
			"images/bust.png",
			"images/cat.png"
		];
	    return (
			<div className="main">
				<Carousel images={carouselImages} />
			</div>
		);
  	}
}

render(<DemoCarousel/>, document.getElementById('app'));
