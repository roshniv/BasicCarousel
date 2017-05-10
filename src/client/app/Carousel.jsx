import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {render} from 'react-dom';

export default class Carousel extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		images: [
    			"http://placekitten.com/g/600/400",
				"http://placebear.com/600/400",
				"http://placehold.it/600x400"
    		],
    		defaultSelectedIndex: 0,
    		showThumbnails: true,
    		slideshowActive: false,
    		slideshowDelay: 400,
    		animationDirection: 'previous',
    		selectedIndex: 0
    	};
    	this.goInDirection = this.goInDirection.bind(this, 'next');
  	}

  	getProps() {
		var props = {
			className:'carousel',
			onKeyDown: this.handleKeyDown,
			tabIndex:'0'
		};

		if (this.props.slideshowActive) {
			props.onMouseEnter = this.handleMouseEnter;
			props.onMouseLeave = this.handleMouseLeave;
		}

		return props;
	}

  	componentWillMount() {
		if (this.props.images) {
			this.setState({images: this.props.images});
		}
	}

  	componentDidMount() {
		if (this.props.slideshowActive) {
			this.progressSlideshow();
		}
	}

	renderCurrentImage() {
		var selected = this.state.selectedIndex;
		var props = {
			key: selected,
			src: this.state.images[selected]
		};

		return (
			<img {...props} />
		);
	}

	renderArrow(direction) {
		var props = {
			className: 'carousel--arrow-' + direction,
			onClick: this.goInDirection.bind(null, direction)
		};

		return (
			<div {...props} />
		);
	}

	renderThumbs() {
		var thumbnails = null;

		if (this.props.showThumbnails) {
			thumbnails = (
				<div className="carousel--thumbs">
					{this.props.images.map(this.renderThumb)}
				</div>
			);
		}

		return thumbnails;
	}

	renderThumb(src, index) {
		var selected = (index === this.state.selectedIndex) ? ' carousel--selected' : '';
		var props = {
			className: 'carousel--thumb' + selected,
			key: index,
			onClick: this.handleThumbClick.bind(null, index),
			src: src
		}
		return <img {...props} />;
	}

	handleKeyDown(event) {
		var left = 37;
		var up = 38;
		var right = 39;
		var down = 40;
		var key = event.which;

		if (key === down || key === left) {
			this.goInDirection('previous');
		} else if (key === up || key === right) {
			this.goInDirection('next');
		}
	}

  	handleMouseEnter() {
		clearTimeout(this.timeout);
	}

	handleMouseLeave() {
		this.progressSlideshow();
	}

	handleThumbClick(index) {
		this.goToIndex(index);
	}

	progressSlideshow() {
		this.setState({animationDirection: 'next'});

		this.timeout = setTimeout(function () {
			this.goInDirection('next');
			this.progressSlideshow();
		}.bind(this), this.props.slideshowDelay);
	}

	goToIndex(index) {
		var direction = (this.state.selectedIndex > index ) ? 'previous' : 'next';

		this.setState({
			animationDirection: direction,
			selectedIndex: index
		});
	}

	goInDirection(direction) {
		var totalImages = this.state.images.length;
		var modifier = (direction === 'next') ? 1 : -1;
		var newIndex = this.state.selectedIndex + modifier;

		if (newIndex === totalImages) {
			newIndex = 0;
		} else if (newIndex === -1) {
			newIndex = totalImages - 1;
		}

		this.setState({
			animationDirection: direction,
			selectedIndex: newIndex
		});
	}

	render () {
  		var Animation = CSSTransitionGroup;
  		return (
			<div {...this.getProps()}>
				<div className="carousel--image">
					{this.renderArrow('previous')}
					<Animation transitionName={'animation--' + this.state.animationDirection}
						transitionEnterTimeout={500}
          				transitionLeaveTimeout={300}>
						{this.renderCurrentImage()}
					</Animation>
					{this.renderArrow('next')}
				</div>
				{this.renderThumbs()}
			</div>
		);
  	}
}

render(<Carousel/>, document.getElementById('app'));
