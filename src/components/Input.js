import React from 'react'

export const Input = ({type, placeholder, name, info, onChange}) => (
    <div className="input-wrapper">
        <input type={type ? type : 'text'} className="input" placeholder={placeholder} name={name} onChange={onChange}/>
        <div className="input__info">{info}</div>
    </div>
);

export default Input