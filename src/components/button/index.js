import React from 'react';

function Button ( {onClick, children, className =''}) {
    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>
    );
}

export default Button;