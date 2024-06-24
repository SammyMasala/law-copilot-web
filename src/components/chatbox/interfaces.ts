export interface IMessage{
    text: string,
    isUser: boolean
}

export interface ISelectedButton{
    message: string
}

export interface ITextBubbleProps {
    selectTextBubble: (selected:ISelectedButton) => void,
    message: IMessage,
    bubbleStyle: IChatBubbleStyle;    
}

export interface IChatBubbleStyle{
    variant: string,
    className: string
}

export interface ISubmitMessageProp{
    submitMessage: (message:string) => void
}

export interface IMessageInput {
    messageInput: string
}