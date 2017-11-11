import React from 'react';

function Button ( {onClick, children, className =''} ) {
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

const Loading = () => <button>loading...</button>;


const withLoading = (Component) => ({isLoading, ...rest}) => {
    return isLoading
        ? <Loading />
        : <Component {...rest} />
}

const ButtonWithLoading = withLoading(Button);

export {Button, ButtonWithLoading};


