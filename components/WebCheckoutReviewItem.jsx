import WebCheckoutRatingBar from './WebCheckoutRatingBar'

const WebCheckoutReviewItem = ({ data }) => {
  const { rating, author, content } = data
  return (
    <div className='wc-review-item'>
      <WebCheckoutRatingBar count={rating} />
      <p>
				{content}
			</p>
      <h3>{author}</h3>
      <style jsx>{`
        .wc-review-item {
          padding: 8px 24px 8px 12px;
          border-radius: 10px;
          box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.06);
          background-color: #fffaf5;
          text-align: left;
          margin-bottom: 9px;
          font-size: 12px;
          font-weight: 500;
          color: #6f8797;
        }
        .wc-review-item:last-child {
          margin-bottom: 0;
        }
        .wc-review-item > h3 {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -0.2px;
          padding-top: 3px;
          color: #31556f;
        }
				p {
					color: #6f8797;
          font-size: 12px;
  					font-weight: 500;
				}
      `}</style>
    </div>
  )
}

export default WebCheckoutReviewItem
