import React, { useEffect, useMemo, useState } from 'react'
import { Joker5050, JokerAudience, JokerPhone, Prize } from '../types';
import Jokers from './Jokers';
import {MillionaireBlock} from './MillionaireBlock';
import './Scoreboard.css';

interface Props
{
    prizes: Prize[];
    showPrizes: boolean;
    handleCloseButton: Function;
    joker5050: Joker5050;
    jokerAudience: JokerAudience;
    jokerPhone: JokerPhone;
    handleJokerSelection: Function;
}

const Scoreboard: React.FC<Props> = ({prizes, showPrizes, handleCloseButton, handleJokerSelection, joker5050, jokerAudience, jokerPhone}) => {

    return (
        <div className={`ScoreboardDialog ${showPrizes ? 'showDialog' : 'hideDialog'}`}>
            <div className="Border"></div>
            <div className="Scoreboard">
                <button onClick={()=> handleCloseButton()}>Zatvori</button>
                {prizes.slice().reverse().map((p,i) => <MillionaireBlock forPrize forCurrentPrize={p.current} key={p.amount}>
                    <span className={p.step ? "goldText" : "whiteText"} style={{display: 'flex'}}>
                        <div className="number">{15-i}</div>
                        <div className="diamond">
                            {p.amount <= prizes.filter(p => p.current)[0].amount && <> ♦ </>}
                        </div>
                        <div className="amount">{p.amount}</div>
                    </span>
                </MillionaireBlock>)}
            </div>
        </div>
    )
}

export default Scoreboard

