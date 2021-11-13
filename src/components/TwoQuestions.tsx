import React from 'react';
import { Answer } from '../types';
import { MillionaireBlock } from './MillionaireBlock';
import './Game.css';

interface Props
{
    Answers: Answer[] | undefined;
    answerConfirmed: boolean;
    handleAnswerSelection: Function;
}

export const TwoQuestions: React.FC<Props> = ({Answers, answerConfirmed, handleAnswerSelection}) => {
    return (
        <div className="Answers">
            <hr className="Line"/> 
            {Answers?.map((ans, i) => {
                return <MillionaireBlock key={i} forAnswer answer={ans}
                onClick={() => handleAnswerSelection(ans)}
                answerConfirmed={answerConfirmed}>
                    {!ans.Disabled && <>♦ <span className={ans.Selected ? "blackText" : "goldText"}>{ans.Letter?.Letter}:</span> {ans.Answer}</>}
                </MillionaireBlock>
            })}
        </div>
    )
}
