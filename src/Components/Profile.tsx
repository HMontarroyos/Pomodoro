import { useContext } from 'react';
import { ChallengesContext } from '../Context/ChallengesContext';
import Styles from '../Styles/Components/Profile.module.css';

export function Profile (){
    const {level} = useContext(ChallengesContext);

    return(
        <div className={Styles.profileContainer}>
            <img src="https://github.com/HMontarroyos.png" alt="Hebert Montarroyos"/>
            <div>
                <strong>Hebert Montarroyos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}