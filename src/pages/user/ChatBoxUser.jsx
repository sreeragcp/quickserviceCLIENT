import React from 'react'

export default function ChatBoxReciever({user,message}) {
  return (
    <div className='w-full mt-1' style={{display:'flex',justifyContent:'flex-start',flexDirection:'row'}}>
      <p style={{padding:10,backgroundColor:'green', borderRadius:10,maxWidth:"60%"}}>
        <strong style={{fontSize:13}}>{user}</strong>
        <br></br>
        {message}
      </p>
    </div>
  )
}

export function ChatBoxSender({user,message}) {
    return (
      <div className='w-full mt-1' style={{display:'flex',justifyContent:'flex-end',flexDirection:'row'}}>
        <p style={{padding:10,backgroundColor:'grey', borderRadius:10,maxWidth:"60%"}}>
          <strong style={{fontSize:13}}>{user}</strong>
          <br></br>
          {message}
        </p>
      </div>
    )
  }