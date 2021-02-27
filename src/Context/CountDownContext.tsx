import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    active:boolean;
    startCountDown:()=>void;
    resetCountDown:()=>void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountdownContextData);

export function CountDownProvider({children}:CountdownProviderProps){

    const {startNewChallenges} = useContext(ChallengesContext)
    let countdownTimeout : NodeJS.Timeout;
    const  [time, setTime] = useState(0.1 * 60);
    const [active, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown(){
        setActive(true);
    }

    function resetCountDown(){
        clearTimeout(countdownTimeout);
        setActive(false);
        setHasFinished(false);
        setTime(0.1*60);
    }

    useEffect(()=>{
        if(active && time >0){
            countdownTimeout =  setTimeout(()=>{
                setTime(time - 1);
            },1000)
        }else if (active && time ===0){
            setHasFinished(true);
            setActive(false);
            startNewChallenges();
        }
    },[active, time])

    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            active,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountDownContext.Provider>
    );
}