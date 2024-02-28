module.exports = function (initialObject, keys) {
	return keys.reduce((newReducedObject, key) => {
		if (
			initialObject &&
			Object.prototype.hasOwnProperty.call(initialObject, key)
		)
			newReducedObject[key] = initialObject[key];
		return newReducedObject;
	}, {});
};
