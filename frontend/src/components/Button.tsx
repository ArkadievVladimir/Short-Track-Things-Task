interface buttonProp {
  btnConfig: {
    btnClass: string;
    btnDescription: string;
    btnIconClass: string;
    onClickHandler: (e: React.MouseEvent) => void;
    iconSrc: string;
  }
}

export const Button = ({ btnConfig }: buttonProp) => {
  const {
    btnClass, 
    btnDescription, 
    btnIconClass, 
    onClickHandler, 
    iconSrc
  } = btnConfig;
  return (
    <button className={ btnClass }>
      <p data-tooltip={ btnDescription }>
        <img
          className={ btnIconClass }
          onClick={ onClickHandler }
          src={ iconSrc }
          alt={ btnDescription }
        />
      </p>
    </button>
  )
}
