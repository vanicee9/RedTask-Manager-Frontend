import React from 'react';
import './button.scss'

function CustomButton({text}) {
return (
    <button type = "submit" className="custom-button">
    {text}
    </button>
   
);
}

export default CustomButton;
