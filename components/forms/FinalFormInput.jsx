import { useState } from 'react'
const FinalFormInput = ({ input, meta, label, showMsg = true }) => {

  const [floating, setFloating] = useState(!!input.value)

  const handleFocus = () => {
    setFloating(true)
  }

  const handleBlur = () => {
    if (!input.value) {
      setFloating(false)
    }
  }

  const hasError = (meta.error || meta.submitError) && meta.touched;

  return (
    <div
      className={`final-form-input ${floating ? 'floating' : ''} ${hasError ? 'has-error' : ''}`}
    >
      <label>{label}</label>
      <input {...input} onFocus={handleFocus} onBlur={handleBlur} />
      {hasError && showMsg && (
        <span className='error'>{meta.error || meta.submitError}</span>
      )}
      <style jsx>{`
        .final-form-input {
          height: 50px;          
          border-radius: 10px;
          background-color: rgba(191, 148, 100, 0.07);
          margin-bottom: 15px;
          position: relative;
        }
        .final-form-input label {
          font-size: 15px;
          font-weight: 500;
          color: #bf9464;
          position: absolute;
          left: 13px;
          top: 15px;
          transition: all 200ms;
        }
        .final-form-input input {
          border: 0;
          background: transparent;
          outline: none;
          font-size: 14px;
          font-weight: 900;
          color: #31556f;
          padding: 21px 13px 10px 13px;
          width: 100%;
        }
        .final-form-input.floating label {
          font-size: 10px;
          top: 7px;
        }
        .final-form-input.has-error {
          border: solid 1px #e53939;
        }
        .final-form-input .error {
          color: #e53939;
          font-size: 10px;
          font-weight: 500;
          position: absolute;
          left: 13px;
          top: 51px;
          line-height: 1;
        }
      `}</style>
    </div>
  )
}

export default FinalFormInput
