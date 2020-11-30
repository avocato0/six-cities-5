import { RATING_VALUE } from 'constants'
import React, { Fragment, useState } from 'react'
import * as pt from 'types'

export const FormReview = ({ onSubmit }) => {
	const [text, setText] = useState('')
	const [rating, setRating] = useState()
	const [disabled, setDisabled] = useState(!(text.length > 50 && rating))

	const updateRating = ({ target }) => {
		setRating(target.value)
		setDisabled(!(text.length > 50 && target.value))
	}

	const updateText = ({ target }) => {
		setText(target.value)
		setDisabled(!(target.value.length > 50 && rating))
	}

	return (
		<form
			className='reviews__form form'
			action='#'
			method='post'
			onSubmit={(evt) => {
				evt.preventDefault()
				onSubmit({
					text,
					rating,
				})
			}}
		>
			<label className='reviews__label form__label' htmlFor='review'>
				Your review
			</label>
			<div className='reviews__rating-form form__rating'>
				{new Array(RATING_VALUE).fill(1).map((_, id) => (
					<Fragment key={id}>
						<input
							className='form__rating-input visually-hidden'
							name='rating'
							value={RATING_VALUE - id}
							id={`${id}-stars`}
							type='radio'
							onChange={updateRating}
						/>
						<label
							htmlFor={`${id}-stars`}
							className='reviews__rating-label form__rating-label'
							title='perfect'
						>
							<svg className='form__star-image' width='37' height='33'>
								<use xlinkHref='#icon-star'></use>
							</svg>
						</label>
					</Fragment>
				))}
			</div>
			<textarea
				className='reviews__textarea form__textarea'
				id='review'
				name='review'
				placeholder='Tell how was your stay, what you like and what can be improved'
				value={text}
				onInput={updateText}
			></textarea>
			<div className='reviews__button-wrapper'>
				<p className='reviews__help'>
					To submit review please make sure to set{' '}
					<span className='reviews__star'>rating</span> and describe your stay
					with at least <b className='reviews__text-amount'>50 characters</b>.
				</p>
				<button
					className='reviews__submit form__submit button'
					type='submit'
					disabled={disabled}
				>
					Submit
				</button>
			</div>
		</form>
	)
}

FormReview.propTypes = {
	onSubmit: pt.fn,
}
