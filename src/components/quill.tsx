import React from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

interface IUpdateInputProp{
    updateInput : (message: string ) => void
}

const Quill: React.FC<IUpdateInputProp> = ({ updateInput }) => {
    return (
        <ReactQuill theme='snow' onChange={updateInput}/>
    )
} 

export default Quill;