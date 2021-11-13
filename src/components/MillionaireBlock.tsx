import React from 'react';
import { Answer } from '../types';
import './MillionaireBlock.css';
import './Buttons.css';

interface Props
{
    forQuestion?: boolean;
    forAnswer?: boolean;
    forPrize?: boolean;
    forCurrentPrize?: boolean;
    asButton?: boolean;
    answer?: Answer;
    answerConfirmed?: boolean;
    onClick?: () => void;
}

export const MillionaireBlock: React.FC<Props> = ({children, answerConfirmed, forQuestion, forAnswer, 
    forPrize, forCurrentPrize, asButton, answer, onClick}) => {

    function addClasses(): string
    {
        let classes = ['millionaireBlockBorder'];

        classes.map(x => {})

        if(forQuestion){classes.push('forQuestion')}
        if(forAnswer){classes.push('forAnswer')}
        if(forPrize){classes.push('forPrize')}
        if(forCurrentPrize){classes.push('forCurrentPrize')}
        if(asButton){classes.push('asButton')}
        if(answer?.Selected)
        {
            if(!answerConfirmed){classes.push('selected')}
            else{classes.push(String(answer.True))}
        }
        if(answer?.Disabled){classes.push('disabled')}

        return classes.join(' ');
    }

    return (
        <>
        <div className={"millionaireBlockWrapper"} onClick={onClick}>
            <div className={addClasses()}>
                <div className={"millionaireBlock"}>
                    <div className="text">
                        {children}
                    </div>                    
                </div>
            </div>
        </div>
        </>
    )
}
