import { useContext } from 'react';
import { ChallengesContext } from '../Context/ChallengesContext';
import { CountDownContext } from '../Context/CountDownContext';
import Style from '../Styles/Components/ChallengeBox.module.css';

export default function ChallengeBox(){
    const {activeChallenges, resetChallenge, completeChallenge} = useContext(ChallengesContext)
    const {resetCountDown} = useContext(CountDownContext);

    function handleChallengeSucceeded(){    
        completeChallenge();
        resetCountDown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountDown();
    }

    return(
        <div className={Style.challengeBoxContainer}>
            {activeChallenges ? (
                <div className={Style.challengeActive}>
                    <header>Ganhe {activeChallenges.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenges.type}.svg`}/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenges.description}</p>
                    </main>

                    <footer>
                        <button type="button" className={Style.challengeFailedButton} onClick={handleChallengeFailed}>Falhei</button>
                        <button type="button" className={Style.challengeSucceededButton} onClick={handleChallengeSucceeded}>Completei</button>
                    </footer>
            </div>        
            ):(
                <div className={Style.challengeNotActive}>
                    <strong>Finalize um Ciclo para Receber um Desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance ao level Completando Desafios.
                    </p>
                </div>
            )}
        </div>
    );
}