const Button = ({ title, className, onClickFunc, type, disabled }) => {
  return (
    <button 
      disabled={disabled}
      type={type}
      className={className} 
      onClick={() => onClickFunc()}> 
      {title}
    </button>
  )
}

export default Button;
