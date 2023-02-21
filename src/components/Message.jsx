import React from 'react'

const Message = ({ user, text, uri }) => {
  return (
    <div className={user === 'me' ? 'flex-end message-box' : 'flex-start message-box'}>
      {
        user === 'other' &&
        <div className="avatar">
          <img src={uri} alt="" />
        </div>
      }
      <div className="message-container">
        <p className="msg">
          {text}
        </p>
      </div>

      {
        user === 'me' &&
        <div className="avatar">
          <img src={uri} alt="" />
        </div>
      }
    </div >
  )
}

export default Message