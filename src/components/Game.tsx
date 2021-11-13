import React from 'react';
import { Question, Joker5050, JokerAudience, JokerPhone } from '../types';
import { MillionaireBlock } from './MillionaireBlock';
import { TwoQuestions } from './TwoQuestions';
import './Game.css';

interface Props
{
    Question: Question | undefined;
    answerConfirmed: boolean;
    handleAnswerSelection: Function;
    handleAnswerConfirm: Function;
}

const Game: React.FC<Props> = ({children, Question, answerConfirmed, handleAnswerSelection, handleAnswerConfirm}) => {

    return (
        <div className="Game">
            {children}
            <div className="Question">
                <hr className="Line"/>              
                <MillionaireBlock forQuestion={true} answerConfirmed={answerConfirmed}>
                    {Question?.Question}
                </MillionaireBlock>
            </div>
            <TwoQuestions Answers={Question?.Answers.slice(0, 2)} 
            handleAnswerSelection={handleAnswerSelection}
            answerConfirmed={answerConfirmed}></TwoQuestions>
            <TwoQuestions Answers={Question?.Answers.slice(2, 4)} 
            handleAnswerSelection={handleAnswerSelection}
            answerConfirmed={answerConfirmed}></TwoQuestions>

            <div style={{visibility: Question?.Answers.filter(a => a.Selected == true).length == 1 ? 'visible' : 'hidden'}}>
                <MillionaireBlock onClick={() => handleAnswerConfirm()} asButton forAnswer>
                    Konačan odgovor
                </MillionaireBlock>
            </div>
        </div>
    )
}

export default Game;