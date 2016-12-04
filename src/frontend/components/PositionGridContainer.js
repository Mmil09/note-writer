
import React from 'react'


export default class PositionGridContainer extends React.Component {



	render() {

		var numOfGridItems = 8;
		var gridItems = []

		for (var i = 0; i < numOfGridItems; i++) {
			gridItems.push(<div className="grid-item" key={i}>{i + 1}</div>)
		}

		var xOffset = 20
		var yOffset = 25
		var position = this.props.position;
	  var x = position * 100 + xOffset;
	  var y = yOffset;
	  var xString = String(x + 'px')
	  var yString = String(y + 'px')

		return (
			<div className="PositionGridContainer">
				<div className="grid">
					{gridItems}
					<div className="active" style={{transform: 'translate3d(' + xString + ', ' + yString + ', 0px)'}}/>
				</div>
			</div>
		)
	}

}
