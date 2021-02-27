import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from "../Components/LevelUpModal";

interface Challenge {
    type:'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number; 
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenges: Challenge;
    levelUp: () => void; 
    startNewChallenges: () => void;
    resetChallenge: () => void;
    completeChallenge:() => void;
    closeLevelUpModal: ()=> void;
    
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;    
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenges, setActiveChallenges] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);



    const experienceToNextLevel = Math.pow((level + 1)*4, 2);

    useEffect(()=>{
        Notification.requestPermission();
        //Dando Permissão Para notificações no Browser
    }, [])

    useEffect(()=>{
        //Salvando Dados nos Cookies atraves da biblioteca JS-Cookies
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengesCompleted',String(challengesCompleted));

    },[level, currentExperience, challengesCompleted]);

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenges (){
        const randomChallengeIndex = Math.floor(Math.random()* challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenges(challenge);

        new Audio('/notification.mp3').play();
        // Chamando o notification do Browser 

        if(Notification.permission === 'granted') {
            new Notification('Novo Desafio 🍅',{
               body: `Valendo ${challenge.amount}xp!` 
            })
        }
    }

    function resetChallenge(){
        setActiveChallenges(null);
    }

    function completeChallenge () {
        if(!activeChallenges){
            return;
        }

        const {amount} = activeChallenges;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenges(null);
        setChallengesCompleted(challengesCompleted + 1);
    }



    return(
        <ChallengesContext.Provider 
            value={{level, 
            currentExperience, 
            challengesCompleted, 
            levelUp, 
            startNewChallenges, 
            activeChallenges, 
            resetChallenge, 
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal}}>
                {children}
                { isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}