import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { CompletedChallenges } from '../Components/CompletedChallenges';
import { CountDown } from '../Components/CountDown';
import {ExperienceBar} from '../Components/ExperienceBar';
import { Profile } from '../Components/Profile';
import Styles from '../Styles/Components/Home.module.css';
import ChallengeBox from '../Components/ChallengeBox';
import { CountDownProvider } from '../Context/CountDownContext';
import { ChallengesProvider } from '../Context/ChallengesContext';

interface HomeProps {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}


export default function Home(props: HomeProps) {
  return (
		<ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
			<div className={Styles.container}>
				<Head>
					<title>Inicio | Pomodoro.it</title>
				</Head>
				<ExperienceBar/>
				<CountDownProvider>
					<section>
						<div>
							<Profile/>
							<CompletedChallenges/>
							<CountDown/>
						</div>
						<div>
							<ChallengeBox/>
						</div>
					</section>
				</CountDownProvider>
			</div>
		</ChallengesProvider>
	);
}

//FUNÇÃO QUE FEZ O NEXT SURGIR 
//Essa função ela roda no servidor node do next js e não no browser do client
// Primeiro ele executa essa função no Next só para depois renderizar os demais componentes no Front
export const getServerSideProps: GetServerSideProps = async (ctx) =>{
//chamada API 
	const {level, currentExperience, challengesCompleted } = ctx.req.cookies;
	return {
		props: {
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted)
		}
	}
}