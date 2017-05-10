import React from 'react';
import {render} from 'react-dom';
import Carousel from './Carousel.jsx';

export default class DemoCarousel extends React.Component {
  	render () {
	  	var carouselImages = [
			"http://placekitten.com/g/600/400",
			"http://placebear.com/600/400",
			"http://placehold.it/600x400"
		];
	    return (
			<div className="main">
				<Carousel images={carouselImages} />
			</div>
		);
  	}
}

render(<DemoCarousel/>, document.getElementById('app'));
