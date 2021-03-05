import React, {useEffect } from 'react';
import Styles from '../Styles/Components/ToogleBoxDarkMode.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export function ToogleBoxDarkMode(){
    useEffect(() => {
        const html = document.querySelector('html')
        const checkbox = document.getElementById('theme');
    
        checkbox.addEventListener('change', () => {
            html.classList.toggle('darkMode');
        }); 
      });

    return(
        <div className={Styles.themeDark}>
        <div className={Styles.toggle}>
            <input id="theme" className={Styles.theme} type="checkbox"/>
            <label className={Styles.label} htmlFor="theme">
                <FontAwesomeIcon icon={faSun} className={Styles.faSun}/>
                <FontAwesomeIcon icon={faMoon} className={Styles.faMoon}/>
                <div className={Styles.ball}></div>
            </label>
        </div>
    </div>

    );
}