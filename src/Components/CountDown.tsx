import { useState, useEffect, useContext } from 'react';
import {ChallengesContext} from '../Context/ChallengesContext';
import { CountDownContext } from '../Context/CountDownContext';
import Styles from '../Styles/Components/CountDown.module.css';

let countdownTimeout : NodeJS.Timeout;

export function CountDown(){
    const {
            minutes, 
            seconds, 
            hasFinished, 
            active, 
            startCountDown, 
            resetCountDown
    } = useContext(CountDownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    return(
        <div>
            <div className={Styles.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled className={Styles.countDownButton}>
                    Ciclo Encerrado
                </button>
            ):(
                <>
                {active ? (
                    <button type="button" className={`${Styles.countDownButton} ${Styles.countDownButtonActive}`} onClick={resetCountDown}>
                        Abandonar Ciclo
                    </button>
                            ) : (
                                <button type="button" className={Styles.countDownButton} onClick={startCountDown}>
                                    Iniciar um Ciclo
                                </button>
                            )}
                </>
            )}
        </div>         
    );
}

