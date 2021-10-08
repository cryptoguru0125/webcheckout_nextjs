const WebCheckoutProgress = ({ percent = 0 }) => {
  return (
    <>
      <div className='wc-progress'>
        <div
          className='wc-progress-bar'
          style={{ width: `${percent * 100}%` }}
        ></div>
      </div>
      <style jsx>{`
        .wc-progress {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 26px;
          background-color: #fdfdfd;
          z-index: 20;
        }
        .wc-progress-bar {
          position: absolute;
          height: 100%;
          background-color: #6f8797;
          transition: width 2s;
        }
        @media (max-width: 559px) {
          .wc-progress {
            height: 16px;
          }
        }
      `}</style>
    </>
  )
}

export default WebCheckoutProgress
