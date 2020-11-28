import pt from 'prop-types'

export const offer = pt.shape({
	title: pt.string.isRequired,
	rating: pt.number.isRequired,
	price: pt.number.isRequired,
	isFavorite: pt.bool.isRequired,
	isPremium: pt.bool.isRequired,
	type: pt.oneOf([`Apartment`, `Private room`]),
	image: pt.string.isRequired,
	smallImage: pt.string.isRequired,
}).isRequired

export const offers = pt.arrayOf(offer)

const favoriteLocation = pt.shape({
	city: pt.string.isRequired,
	offers,
}).isRequired

export const favoriteLocations = pt.arrayOf(favoriteLocation)

export const offerPage = pt.shape({
	id: pt.number.isRequired,
	offer,
}).isRequired
