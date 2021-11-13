import React from 'react';
import { Modal as RespModal} from 'react-responsive-modal';
import './Modal.css';
import { VscChromeClose } from "react-icons/vsc";

interface Props
{
    open: boolean;
    onClose: () => void;
    imageSrc?: any|null;
}

export const Modal:React.FC<Props>  = ({children, open, onClose, imageSrc}) => {
    return (
        <RespModal open={open} onClose={onClose as ()=>void} center classNames={{modal: 'modal'}} closeIcon={<></>}>
            <div className="header">
                <div className="imgContainer">{imageSrc && <img src={imageSrc}/>}</div>
                <button onClick={onClose}><VscChromeClose/></button>
            </div>
            <div className="body">
                {children}
            </div>
        </RespModal>
    )
}
