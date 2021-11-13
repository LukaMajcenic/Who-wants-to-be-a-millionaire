import React from 'react';
import { Joker5050, JokerAudience, JokerPhone } from '../types';
import './Jokers.css';
import { FaSearch } from "react-icons/fa";

interface Props
{
    joker5050: Joker5050;
    jokerAudience: JokerAudience;
    jokerPhone: JokerPhone;
    handleJokerSelection: Function;
}

const Jokers: React.FC<Props> = ({handleJokerSelection, joker5050, jokerAudience, jokerPhone}) => {
    return (
        <div className="Jokers">
            <button onClick={() => handleJokerSelection(joker5050)} disabled={!joker5050.available} className="FiftyFifty"></button>

            <div className="jokerAudienceWrapper">
                <button onClick={() => handleJokerSelection(jokerAudience)} disabled={!jokerAudience.available} className="Audience"></button>
                {jokerAudience.usedInCurrentQuestion && 
                <button onClick={() => handleJokerSelection(jokerAudience, true)} className="AudienceCheckScores">
                    <FaSearch/>
                </button>}
            </div>

            <button onClick={() => handleJokerSelection(jokerPhone)} disabled={!jokerPhone.available} className="Phone"></button>
        </div>
    )
}

export default Jokers
