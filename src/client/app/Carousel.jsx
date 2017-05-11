import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {render} from 'react-dom';

export default class Carousel extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		dataArray: [],
    		animationDirection: 'next',
    		selectedIndex: 0
    	};
    	this.goInDirection = this.goInDirection.bind(this);
    	this.handleKeyDown = this.handleKeyDown.bind(this);
  	}

  	getProps() {
		var props = {
			className:'carousel',
			onKeyDown: this.handleKeyDown,
			tabIndex:'0'
		};

		return props;
	}

  	componentWillMount() {
		if (this.props.dataArray) {
			this.setState({dataArray: this.props.dataArray});
		}
	}

  	renderCurrentImage() {
		var selected = this.state.selectedIndex;
		var props = {
			key: selected,
			src: this.state.dataArray[selected].imageurl
		};

		return (
			<div>
				<img {...props} />
				<div className="content">
					<h3>{this.state.dataArray[selected].title}</h3>
					<p>{this.state.dataArray[selected].synopsis}</p>
					<a href={"http://" + this.state.dataArray[selected].link} target="_blank">{this.state.dataArray[selected].link}</a>
				</div>
			</div>
		);
	}

	renderArrow(direction) {
		var props = {
			className: 'carousel--arrow-' + direction,
			onClick: this.goInDirection.bind(this, direction)
		};

		return (
			<div {...props} />
		);
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

  	goInDirection(direction) {
		var totalImages = this.state.dataArray.length;
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
			</div>
		);
  	}
}
