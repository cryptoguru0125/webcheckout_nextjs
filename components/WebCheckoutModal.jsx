import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import CloseIcon from 'assets/icons/x.svg'

const WebCheckoutModal = ({ isOpen, onClose, width, height, children }) => {
  return (
    <Rodal
      className='wc-modal'
      visible={isOpen}
      onClose={onClose}
      width={width}
			height={height}
    >
      <div className='wc-modal-header'>
        <button className='wc-close-btn' onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      {children}
      <style jsx global>{`
        .wc-modal .rodal-mask {
          background-color: rgba(0, 0, 0, 0.6);
        }

        .wc-modal .rodal-dialog {
          padding: 20px 30px 26px;
          border-radius: 30px;
          background-color: #f9f2ea;
        }

        .wc-modal-header {
          text-align: right;
        }

        .wc-close-btn {
          padding-top: 3px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #f6f6f6;
          box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.06);
        }

        .wc-close-btn:hover {
          background-color: #eee;
        }

        .wc-modal .rodal-close {
          display: none;
        }
      `}</style>
    </Rodal>
  )
}

export default WebCheckoutModal
