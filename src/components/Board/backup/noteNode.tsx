// import React, { useState } from "react";
// import { Node, NodeProps } from "@xyflow/react";
// import Card from "react-bootstrap/Card"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Collapse from "react-bootstrap/Collapse"
// import Image from "react-bootstrap/Image"
// import Button from "react-bootstrap/Button"
// import { Handle, Position } from "@xyflow/react";
// import { NotImplementedError } from "../../../errors";
// import { Note, NoteNodeData } from ".";

// import { InputGroup } from "react-bootstrap";

// import close from "../../static/icons8-close-50.png"

// export type NoteNodeProps = NodeProps<NoteNode>

// export const NoteNode: React.FC<NoteNodeProps> = (props: NoteNodeProps) => {
//     const {id } = props
//     const {note, deleteNote} = props.data
//     const [open, setOpen] = useState<boolean>(false)
//     const [selected, setSelected] = useState<boolean>(true)

//     const handleDelete = () => {
//         deleteNote(id)
//     }

//     return (
//         <>
//             <Handle type="target" position={Position.Top} />
//             <Card border="secondary" className="bg-dark text-light" style={{width: "20rem"}} aria-label="Card for a note">  
//                 <Card.Header aria-label="Title for a card">
//                     <InputGroup className="d-flex bg-dark">
//                         <InputGroup.Text className="flex-grow-1 border-secondary bg-transparent text-light" onClick={() => setOpen(!open)}>
//                             {note.subject}
//                         </InputGroup.Text>
//                         <InputGroup.Checkbox className="bg-dark"/>
//                     </InputGroup>
//                 </Card.Header>  
//                 <Collapse in={open}>      
//                     <Card.Body className="p-1" style={{maxHeight: "25rem", overflow: "auto"}} aria-label="Card content">
//                         {Object.entries(note.content).map(([key, value]) => {
//                             try{
//                                 return (
//                                     <div key={key}>
//                                         <Card.Title>{key}</Card.Title>
//                                         <Card.Text style={{whiteSpace: "pre-line"}}>{value}</Card.Text>
//                                     </div>
//                                 )
//                             }catch(error){
//                                 console.error(error)
//                             }
//                         })}
//                     </Card.Body>    
//                 </Collapse>   
//                 <Card.Footer className="d-flex justify-content-end p-1" aria-label="Footer for note card">
//                     <Button variant="dark" onClick={handleDelete} className="p-0">
//                         <Image style={{width: "1.5rem"}} src={close} rounded/>
//                     </Button>                    
//                 </Card.Footer> 
//             </Card>
//             <Handle type="source" position={Position.Bottom} id="a" />
//             <Handle
//                 type="source"
//                 position={Position.Bottom}
//                 id="b"
//                 style={{left: 10}}
//             />
//         </>
//     )

// }