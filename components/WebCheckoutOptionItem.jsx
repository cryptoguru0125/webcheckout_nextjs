const WebCheckoutOptionItem = ({
  selected,
  children,
  onClick = null,
}) => (
  <div
    role='button'
    className={`wc-option-item ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    {children}
    <style jsx>{`
      .wc-option-item {
        padding-left: 208px;
      }
      @media (max-width: 559px) {
        .wc-option-item {
          padding-left: 59px;
          height: 45px;
          line-height: 45px;
          border-radius: 50px;
        }
      }
    `}</style>
  </div>
)

export default WebCheckoutOptionItem
