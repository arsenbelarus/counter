import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import './Display.css';

export type DisplayPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { onEnter?: () => void, value?: number, className: string };

const Display: React.FC<DisplayPropsType> = ({onClick, value, className, ...restProps}) => {
    return (
        <div className="Display">
            <input value={value} className={className}/>
        </div>
    );
}

export default Display;
