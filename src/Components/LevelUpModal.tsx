import { useContext } from 'react';
import { ChallengesContext } from '../Context/ChallengesContext';
import Style from '../Styles/Components/LevelUpModal.module.css';

export function LevelUpModal () {
    const {level, closeLevelUpModal} = useContext(ChallengesContext);


    return(
        <div className={Style.overlay}>
            <div className={Style.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você Alcançou um novo level.</p>
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal"/>
                </button>
            </div>
        </div>
    );
}