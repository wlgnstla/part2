
const Message = ({message}) => {
  if(message.includes('ADDED') || message.includes('updated')){
  return (
    <div className="success">
      {message}
    </div>
  )
  }
  else if(message.includes('already been removed'))
  {
    return (
      <div className="failure">
        {message}
      </div>
    )
  }
}

export default Message
