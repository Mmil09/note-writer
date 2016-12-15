import React from 'react'
import cx from 'classnames'

const PositionGridContainer = (props) => {

	const handleMouseEnter = (position, e) => {
		//props.onPositionEnter(position)
	}

	var numOfGridItems = 8;
	var gridItems = []

	var xOffset = 20
	var yOffset = 25
	
	var absolutePosition = Math.abs(props.position)
	var numOfTraversals = Math.floor(absolutePosition/numOfGridItems)
	var relativePosition = absolutePosition - (numOfTraversals * numOfGridItems)
	var relativePositionReverse = relativePosition === 0 ? 0 : numOfGridItems - relativePosition

	var gridPositionIndex = props.position >= 0 ? relativePosition : relativePositionReverse
	
	var startPositionLabel;
	
	if (props.position < 0) {
		if (relativePosition === 0) {
			startPositionLabel = -( ((numOfTraversals - 1) * numOfGridItems) + numOfGridItems )
		}
		else {
			startPositionLabel = -( (numOfTraversals * numOfGridItems) + numOfGridItems )
		}
		
	}
	else {
		startPositionLabel = numOfTraversals * numOfGridItems
	}
	
	for (var i = 0; i < numOfGridItems; i++) {
		var label = startPositionLabel + i
		
		var classes = {
			'grid-item': true,
			entered: gridPositionIndex === i,
		}

		gridItems.push(<div className={cx(classes)} key={i} onMouseEnter={handleMouseEnter.bind(null, startPositionLabel + i)}>{label}</div>)
	}

  var x = gridPositionIndex * 100 + xOffset;
  var y = yOffset;
  var xString = String(x + 'px')
  var yString = String(y + 'px')

	return (
		<div className="PositionGridContainer">
			<div className="grid">
				{gridItems}
			</div>
		</div>
	)

}

export default PositionGridContainer
