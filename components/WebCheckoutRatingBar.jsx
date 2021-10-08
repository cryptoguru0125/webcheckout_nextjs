import React from 'react'
import StarImage from 'assets/icons/yellow-star.svg'

const WebCheckoutRatingBar = ({ count }) => {
	let starList = []
	for (let index = 0; index < count; index++) {
		starList.push(<StarImage key={index} className="rating-icon" />)
	}

	return (
		<>
			<div className="rating-bar">{starList}</div>
			<style jsx>{`
				.rating-bar {
					padding: 1px 0;
				}
			`}</style>
		</>
	)
}

export default WebCheckoutRatingBar
