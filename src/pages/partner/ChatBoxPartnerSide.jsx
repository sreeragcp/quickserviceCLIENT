import React from 'react'

export default function ChatBoxReciever({user,message,timestamp}) {
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedTime;
  }
  return (
    <div className='w-full mt-1 sendermessage me-auto'>
    <strong style={{fontSize:13}}>{user}</strong>
           <p>{message}</p>
            <div className='w-full h-5 text-end'>{formatTimestamp(timestamp)}</div>
         </div>
  )
}

export function ChatBoxSender({user,message,timestamp}) {
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedTime;
  }
    return (
      <div className='w-full mt-1 usermessage ms-auto'>
      <strong style={{fontSize:13}}>{user}</strong>
             <p>{message}</p>
              <div className='w-full h-5 text-end'>{formatTimestamp(timestamp)}</div>
           </div>
    )
  }