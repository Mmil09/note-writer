var scales = {
	'major': {
		name: 'major/minor',
		spacing: [0,2,4,5,7,9,11],
		spacingAscending: [0,2,4,5,7,9,11],
		intervalLength: 12,
	}
}

for (scale in scales) {
	var scale = scales[scale];
	scale.spacingDescending = getReverseScaleSpacing(scale)
	scale.spacingLength = scale.spacingAscending.length
}

function getReverseScaleSpacing(scale) {
	var reverseSpacing = [];

	var descendingIndex = scale.spacing.length - 1
	var ascendingIndex = 0;

	while (descendingIndex >= 0) {
		reverseSpacing[ascendingIndex] = scale.intervalLength - scale.spacing[descendingIndex]
		ascendingIndex++;
		descendingIndex--;		
	}

	reverseSpacing.unshift(0)
	reverseSpacing.pop()

	return reverseSpacing
}



module.exports = scales