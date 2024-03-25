import React from 'react';
import './button.scss'

function CustomButton({ text}) {
return (
    <button className="custom-button">
    {text}
    </button>
);
}

export default CustomButton;
