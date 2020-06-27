import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import './Button.css';

export type ButtonNyaPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & { onClick?: () => void, value?: string, disabled?: boolean, className: string };

const Button: React.FC<ButtonNyaPropsType> = ({onClick, value, disabled, className, ...restProps}) => {
    return (
        <>
            <button className={className} onClick={onClick}
                    disabled={disabled}> {value} </button>
        </>
    );
}

export default Button;