import PrevImage from 'assets/icons/back.svg'
import PrevLargeImage from 'assets/icons/back_large.svg'

const WebCheckoutPrevButton = ({ onClick }) => {
  return (
    <>
      <button type='button' className='wc-btn-prev' onClick={onClick}>
        <PrevImage className='wc-prev-icon' />
        <PrevLargeImage className='wc-prev-large-icon' />
      </button>
      <style jsx>{`
        .wc-btn-prev {
          position: absolute;
          width: 50px;
          height: 50px;
          top: 90px;
          left: -158px;
          border-radius: 100%;
          background-color: #f6f6f6;
          box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.06);
          z-index: 10;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .wc-btn-prev:hover {
          background-color: #eee;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .wc-prev-large-icon {
            display: none;
          }
          .wc-btn-prev {
            left: 16px;
            top: 60px;
            width: 35px;
            height: 35px;
          }
        }

        // Galaxy, iPhoneX, and other
        @media (max-width: 559px) and (max-height: 810px) {
          .wc-btn-prev {
            top: 40px;
          }
        }
        // Galaxy, iPhoneX, and other
        @media (max-width: 559px) and (max-height: 735px) {
          .wc-btn-prev {
            top: 30px;
          }
        }
      `}</style>
    </>
  )
}

export default WebCheckoutPrevButton
