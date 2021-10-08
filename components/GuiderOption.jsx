const GuiderOption = ({ data, selected, onClick = null }) => (
  <div
    role='button'
    className={`guider-option ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <div className='profile clearfix'>
      <img className='avatar' src={data.avatar} alt='avatar' />
      <h4>{data.name}</h4>
      <label className='role'>{data.role}</label>
      <div className='description'>{data.desc}</div>
    </div>

    <style jsx>{`
      .guider-option {
        padding: 16px 19px;
        border-radius: 10px;
        box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.06);
        background-color: #fffaf5;
        margin-bottom: 8px;
        text-align: left;
      }
      
      .profile > * {
        float: left;
      }
      .avatar {
        width: 87px;
        height: 87px;
        border-radius: 50%;
        margin-right: 27px;
      }
      h4 {
        font-size: 17px;
        font-weight: 900;
        line-height: 1.2;
      }
      .role {
        font-size: 13px;
        font-weight: 500;
        margin: 2px 0 6px 0;
      }
      .description {
        font-size: 14px;
        font-weight: 500;
        color: #6f8797;
      }
      h4,
      label,
      .description {
        width: calc(100% - 200px);
      }
      .guider-option.selected {
        background: #9497e8;
      }
      .guider-option.selected, .selected .description {
        color: #fdfdfd;
      }
      
      @media (min-width: 560px) {
        .guider-option:hover {
          background-color: #b8bcee;
          color: #fff;
        }
        .guider-option:hover .description {
          color: #fff;
        }
      }
      @media (max-width: 559px) {
        .guider-option {
          padding: 16px;
        }
        .avatar {
          width: 45px;
          height: 45px;
          margin-right: 7px;
        }
        label {
          font-size: 13px;
        }
        h4,
        label {
          line-height: 1.4;
          width: calc(100% - 60px);
        }
        .description {
          font-size: 13px;
          width: 100%;
          margin-top: 4px;
        }
      }
    `}</style>
  </div>
)

export default GuiderOption
