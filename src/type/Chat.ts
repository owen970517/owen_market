export interface ChatProps {
    chatUser? : string[];
    date? : Date;
    product? : string;
}

export interface MessageProps {
    content? : string ;
    date? : string;
    보낸사람?: string;
}