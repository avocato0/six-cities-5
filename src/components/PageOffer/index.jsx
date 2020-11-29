import React from 'react'
import * as pt from 'types'
import cl from 'classnames'
import { ListPlaces } from 'components/ListPlaces'
import { CardListType } from 'constants'
import { Header } from 'components/Header'
import { ListReviews } from 'components/ListReviews'
import { Map } from 'components/Map'

export const PageOffer = ({ hotel }) => {
	const {
		id,
		images,
		is_premium: isPremium,
		is_favorite: isFavorite,
		title,
		rating,
		type,
		bedrooms,
		max_adults: maxAdults,
		price,
		goods,
		host: user,
		description,
		reviews,
		other,
	} = hotel

	return (
		<div className='page'>
			<Header />

			<main className='page__main page__main--property'>
				<section className='property'>
					<div className='property__gallery-container container'>
						<div className='property__gallery'>
							{images.map((item, itemId) => {
								return (
									<div className='property__image-wrapper' key={itemId}>
										<img
											className='property__image'
											src={item}
											alt='Photo studio'
										/>
									</div>
								)
							})}
						</div>
					</div>
					<div className='property__container container'>
						<div className='property__wrapper'>
							{isPremium && (
								<div className='property__mark'>
									<span>Premium</span>
								</div>
							)}
							<div className='property__name-wrapper'>
								<h1 className='property__name'>{title}</h1>
								<button
									className='property__bookmark-button button'
									type='button'
								>
									<svg
										className='property__bookmark-icon'
										width='31'
										height='33'
									>
										<use xlinkHref='#icon-bookmark'></use>
									</svg>
									<span className='visually-hidden'>
										{isFavorite ? `In` : `To`} bookmarks
									</span>
								</button>
							</div>
							<div className='property__rating rating'>
								<div className='property__stars rating__stars'>
									<span
										style={{
											width: `${rating * (100 / 5)}%`,
										}}
									></span>
									<span className='visually-hidden'>Rating</span>
								</div>
								<span className='property__rating-value rating__value'>
									4.8
								</span>
							</div>
							<ul className='property__features'>
								<li className='property__feature property__feature--entire'>
									{type}
								</li>
								<li className='property__feature property__feature--bedrooms'>
									{bedrooms} Bedrooms
								</li>
								<li className='property__feature property__feature--adults'>
									Max {maxAdults} adults
								</li>
							</ul>
							<div className='property__price'>
								<b className='property__price-value'>&euro;{price}</b>
								<span className='property__price-text'>&nbsp;night</span>
							</div>
							<div className='property__inside'>
								<h2 className='property__inside-title'>What&apos;s inside</h2>
								<ul className='property__inside-list'>
									{goods.map((item) => {
										return (
											<li className='property__inside-item' key={item}>
												{item}
											</li>
										)
									})}
								</ul>
							</div>
							<div className='property__host'>
								<h2 className='property__host-title'>Meet the host</h2>
								<div className='property__host-user user'>
									<div
										className={cl(
											'property__avatar-wrapper',
											'user__avatar-wrapper',
											{
												'property__avatar-wrapper--pro': user.pro,
											}
										)}
									>
										<img
											className='property__avatar user__avatar'
											src={user.avatar}
											width='74'
											height='74'
											alt='Host avatar'
										/>
									</div>
									<span className='property__user-name'>{user.name}</span>
								</div>
								<div className='property__description'>
									<p className='property__text'>{description}</p>
								</div>
							</div>

							<ListReviews
								reviews={reviews}
								onSubmitReview={(data) => {
									console.log(data, id)
								}}
							/>
						</div>
					</div>
					<section className='property__map map'>
						<Map
							points={other.map((otherOffer) => ({
								lat: otherOffer.coords[0],
								lng: otherOffer.coords[1],
							}))}
						/>
					</section>
				</section>
				<div className='container'>
					<section className='near-places places'>
						<h2 className='near-places__title'>
							Other places in the neighbourhood
						</h2>
						<ListPlaces offers={other} type={CardListType.ROW} />
					</section>
				</div>
			</main>
		</div>
	)
}

PageOffer.propTypes = {
	hotel: pt.hotel,
}
