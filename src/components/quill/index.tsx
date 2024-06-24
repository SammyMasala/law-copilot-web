import React from 'react';
import ReactQuill from 'react-quill'; 
import Container from 'react-bootstrap/Container';
import 'react-quill/dist/quill.snow.css';
import './style.css';


interface IUpdateInputProp{
    updateInput : (message: string ) => void
}

const Quill: React.FC<IUpdateInputProp> = ({ updateInput }) => {
    return (
        <ReactQuill theme='snow' onChange={updateInput}/>
    )
} 

export default Quill;