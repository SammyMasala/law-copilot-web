import React from 'react';
import ReactQuill from 'react-quill'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'react-quill/dist/quill.snow.css';
import './style.css';


interface IUpdateInputProp{
    updateInput : (message: string ) => void
}

const Quill: React.FC<IUpdateInputProp> = ({ updateInput }) => {    
    return (
        <Container fluid className='h-100 d-flex flex-column'>
            <Row className="flex-grow-1 p-1 overflow-auto">
                <ReactQuill theme='snow' onChange={updateInput} className=''/>
            </Row>
            <Row className='d-inline-flex p-2'>
                <Button>Save as .docx</Button>
                <Button>Save as .pdf</Button>
            </Row>
        </Container>
    )
} 

export default Quill;