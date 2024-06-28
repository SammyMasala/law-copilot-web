import React from "react";
import Button from "react-bootstrap/Button"
import type { ITextBubbleProps, IChatBubbleStyle } from "./interfaces";

const ChatBubble: React.FC<ITextBubbleProps> = ({selectTextBubble, message, bubbleStyle}) => {
    const handleSelectButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const selectedButton = {
            message: e.currentTarget.innerHTML
        }

        selectTextBubble(selectedButton)
    }
    return (        
        <Button
            variant={bubbleStyle.variant}
            className={bubbleStyle.className}
            onClick={handleSelectButton}
        >
            {message.text}
        </Button> 
    )
}  

export default ChatBubble
export {ITextBubbleProps, IChatBubbleStyle}