import React from "react";
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import { ISelectedButton } from ".";

interface ITextBubbleProps {
    selectTextBubble: (selected:ISelectedButton) => void,
    message: string;
    isUser: boolean 
}

const ChatBubble: React.FC<ITextBubbleProps> = ({selectTextBubble, message, isUser}) => {
    const handleSelectButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const selectedButton = {
            message: e.currentTarget.value
        }

        selectTextBubble(selectedButton)
    }
    return (        
        <Button
            variant={isUser === true ? "Dark": "Secondary"}
            onClick={handleSelectButton}
        >
            {message}
        </Button> 
    )
}  

export default ChatBubble