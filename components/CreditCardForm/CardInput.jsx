const CardInput = ({ label, error = false, errorMsg, children }) => (
  <div className='card-input-wrapper'>
    <div className={`card-input ${error ? 'has-error' : ''}`}>
      <label>{label}</label>
      <div className='input-wrapper'>{children}</div>
    </div>
    {error && <div className='input-error'>{errorMsg || error.message}</div>}

    <style jsx>{`
      .card-input-wrapper {
        margin-bottom: 10px;
      }
      .card-input {
        border: 1px solid transparent;
        height: 50px;
        border-radius: 10px;
        background-color: rgba(191, 148, 100, 0.07);
        padding: 18px 12px 11px 12px;
        position: relative;
      }
      .card-input.has-error {
        border-color: #e53939;
      }
      .input-error {
        text-align: left;
        color: #e53939;
        font-size: 10px;
        font-weight: 500;
        margin-left: 10px;
        line-height: 1;
        margin-top: 2px;
      }
      label {
        font-size: 10px;
        font-weight: 500;
        color: #bf9464;
        position: absolute;
        left: 12px;
        top: 3px;
      }
    `}</style>
  </div>
)

export default CardInput
