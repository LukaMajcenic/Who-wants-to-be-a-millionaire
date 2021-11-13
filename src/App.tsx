import React, {useState, useEffect} from 'react';
import random from 'random';
import { firebase } from "./firebase";
import { Answer, Question, Joker, Letter, Joker5050, JokerAudience, JokerType, JokerPhone, Prize } from './types';
import './App.css';
import Game from './components/Game';
import axios from "axios";
import 'react-responsive-modal/styles.css';
import { JokerAudienceChart } from './components/JokerAudienceChart';
import { Modal } from './components/Modal';
import Scoreboard from './components/Scoreboard';
import Jokers from './components/Jokers';
import { MillionaireBlock } from './components/MillionaireBlock';

function App() {

  const db: firebase.database.Database = firebase.database();

  const [Questions, setQuestions] = useState<Question[] | undefined>();
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
  const [answerConfirmed, setAnswerConfirmed] = useState<boolean>(false);
  const [questionKeys, setQuestionKeys] = useState<string[]>([]);
  const [joker5050, setJoker5050] = useState<Joker5050>(new Joker5050());
  const [jokerAudience, setJokerAudience] = useState<JokerAudience>(new JokerAudience());
  const [jokerPhone, setJokerPhone] = useState<JokerPhone>(new JokerPhone());
  const [prizes, setPrizes] = useState<Prize[]>([
    new Prize(100), new Prize(200), new Prize(300), new Prize(500), new Prize(1000),
    new Prize(2000), new Prize(4000), new Prize(8000), new Prize(16000), new Prize(32000),
    new Prize(64000), new Prize(125000), new Prize(250000), new Prize(500000), new Prize(1000000)]);
  const [showPrizes, setShowPrizes] = useState<boolean>(false);
  const [renderPrizes, setRenderPrizes] = useState<boolean>(false);

  function handleAnswerSelection(answer: Answer | null = null): void
  {
    if(!answerConfirmed && !answer?.Disabled)
    {
      let modQuestions: Question | undefined = undefined;
      if(currentQuestion)
      {
        modQuestions = {...currentQuestion};

        modQuestions.Answers.forEach(ans => {
          if(ans == answer)
          {
            ans.Selected = true;
          }
          else
          {
            ans.Selected = false;
          }
        })

        setCurrentQuestion(modQuestions);
      }
    }
  }

  function handleAnswerConfirm() : void
  {
    setAnswerConfirmed(true);

    setTimeout(() => {

      if(currentQuestion?.Answers.filter(a => a.Selected)[0].True)
      {
        setNextQuestion();
        let index = prizes.findIndex(p => p.current);
        let modPrizes = [...prizes];
        modPrizes.map((p,i) => i == index+1 ? p.current = true : p.current = false);
        setPrizes(modPrizes);
      }
    }, 1000)
  }

  function setNextQuestion(initial : boolean = false)
  {
    if(currentQuestion?.Answers.filter(ans => ans.Selected)[0].True || initial)
    {
      let randomKey : any = questionKeys[random.int(0, questionKeys?.length-1)];
      let nextQuestion = Questions?.[randomKey];
      let ABCD : string[] = ['A', 'B', 'C', 'D'];

      if(nextQuestion != undefined)
      {
        //Shuffles answers
        for (let i = nextQuestion.Answers.length - 1; i > 0; i--) 
        {
          const j = Math.floor(Math.random() * (i + 1));
          [nextQuestion.Answers[i], nextQuestion.Answers[j]] = [nextQuestion.Answers[j], nextQuestion.Answers[i]];
        }
      }
      nextQuestion?.Answers.forEach((ans, i) => {
        ans.Letter = {Letter: ABCD[i] as "A"|"B"|"C"|"D", Index: i as 0|1|2|3};
      })

      setCurrentQuestion(Questions?.[randomKey]);
      setAnswerConfirmed(false);
      let torf: boolean = !jokerAudience.available && false;
      setJokerAudience({...jokerAudience, usedInCurrentQuestion: torf});
    }
    else
    {
      if(currentQuestion != undefined)
      {
        let modifiedQuestion = {...currentQuestion};
        modifiedQuestion.Answers?.forEach(ans => {
          if(ans.True)
          {
            ans.Selected = true;
          }
        })

        setCurrentQuestion(modifiedQuestion);
      }
    }
  }

  function restoreDatabase()
  {
    axios.get('https://raw.githubusercontent.com/aaronnech/Who-Wants-to-Be-a-Millionaire/master/questions.json')
    .then((res) => {
      
      res.data.games.forEach((question : any) => {
        question.questions.forEach((q : any) => {

          let key : string | null = db.ref('Questions').push().key;

          let newQuestion = new Question(q.question, random.int(1,3) as 1|2|3, [
            new Answer(q.content[0], q.correct == 0),
            new Answer(q.content[1], q.correct == 1),
            new Answer(q.content[2], q.correct == 2),
            new Answer(q.content[3], q.correct == 3)
          ]);

          if(key)
          {
            var obj : any = {};
            obj[key] = newQuestion;
            db.ref('Questions').update(obj);
          }   
        });
      })
    })
  }

  function Joker5050Selected()
  {
    if(currentQuestion && joker5050.available)
    {
      let modifiedAnswers : Question = {...currentQuestion};
      let wrongAnswerIndexes : number[] = [];

      currentQuestion.Answers.forEach((value, index) => {
        if(!value.True)
        {
          wrongAnswerIndexes.push(index);
        }
      })
  
      wrongAnswerIndexes.splice(random.int(0,2), 1);

      wrongAnswerIndexes.forEach((value) => {
        modifiedAnswers.Answers[value].Disabled = true;
        modifiedAnswers.Answers[value].Selected = false;
      })

      setCurrentQuestion(modifiedAnswers);
    }

    setJoker5050({...joker5050, available: false});
  }

  function JokerAudienceSelected(viewResultsClicked: boolean)
  {
    if(currentQuestion && jokerAudience.available)
    {
      let percentages : number[] = [0,0,0,0];
      let remaining : number = 100;

      let lowerBound: number = 80 - (currentQuestion.Difficulty-1)*30; //80,50,30
      let higherBound: number = 100 - (currentQuestion.Difficulty-1)*20; //100,80,60

      let truePerc : number = random.int(lowerBound, higherBound);
      remaining -= truePerc;

      currentQuestion.Answers.filter(a => a.True).forEach((a,i) => {
        if(a.Letter)
        {
          percentages[a.Letter.Index] = truePerc;
        }
      })

      currentQuestion.Answers.filter(a => !a.True && !a.Disabled).forEach((a,i,arr) => {
        if(a.Letter)
        {
          if(i == arr.length-1)
          {
            percentages[a.Letter.Index] = remaining;
          }
          else
          {
            let falsePerc : number = random.int(0, remaining);
            percentages[a.Letter.Index] = falsePerc;
            remaining -= falsePerc;
          }
        }
      })

      setJokerAudience({...jokerAudience, available: false, modalOpen: true, usedInCurrentQuestion: true, percentages: percentages});
    }
    else if(jokerAudience.usedInCurrentQuestion && viewResultsClicked)
    {
      setJokerAudience({...jokerAudience, modalOpen: true});
    }
  }

  function JokerPhoneSelected()
  {
    if(currentQuestion && jokerPhone.available)
    {
      let percentSure: 0|50|100 = 0;

      switch(currentQuestion.Difficulty)
      {
        case 1:
          percentSure = [100, 100, 100, 50, 50][random.int(0,4)] as 0|50|100;
          break;
        case 2:
          percentSure = [100, 50, 50, 50, 0][random.int(0,4)] as 0|50|100;
          break;
        case 3:
          percentSure = [50, 50, 0, 0, 0][random.int(0,4)] as 0|50|100;
          break;
      }

      let correctOrWrong: boolean = [true, false][random.int(0,1)];
      let text: string[] = [currentQuestion.Question];
      currentQuestion.Answers.filter(a => !a.Disabled).forEach(a => text.push(a.Letter?.Letter + " " + a.Answer));
      switch(percentSure)
      {
        case 0:
          text.push("Nažalost ne znam");
          break;
        case 100:
          text.push("Siguran sam da je " + currentQuestion.Answers.filter(a => a.True)[0].Answer);
          break;
        case 50:
          if(correctOrWrong)
          {
            text.push("Mislim da je " + currentQuestion.Answers.filter(a => a.True)[0].Answer);
          }
          else 
          {
            text.push("Mislim da je " + currentQuestion.Answers.filter(a => !a.True && !a.Disabled)[random.int(0,currentQuestion.Answers.filter(a => !a.True && !a.Disabled).length)-1].Answer)
          }
          break;
      }

      setJokerPhone({...jokerPhone, modalOpen: true, modalText: text, available: false});
    }
  }

  function handleJokerSelection(selectedJoker: Joker5050|JokerAudience|JokerPhone, viewResultsClicked: boolean = false) 
  {
    setShowPrizes(false);
    switch(selectedJoker.name)
    {
      case '50/50':
        Joker5050Selected();
        break;
      case 'Audience':
        JokerAudienceSelected(viewResultsClicked);
        break;
      case 'Phone':
        JokerPhoneSelected();
        break;
      default:
        break;
    }
  }

  useEffect(() => {

    const ref = db.ref('Questions');

    ref.on('value', (snapshot) => {

      let keys : string[] = [];
      snapshot.forEach((child) => {
        if(child.key != null)
        {
          keys.push(child.key);
        }
      });
      setQuestionKeys(keys);
      setQuestions(snapshot.val());
    })
  }, [])

  useEffect(() => {

    setNextQuestion(true);

  }, [Questions])

  return (
    <>
    {/* <button onClick={restoreDatabase}>Restore</button> */}
    <div className="App">

      <div className="buttons">
        <button>Test</button>
        <MillionaireBlock asButton forAnswer onClick={() => {setShowPrizes(true); setRenderPrizes(true)}}>Nagrade</MillionaireBlock>
      </div>

      
      
      <Game Question={currentQuestion} handleAnswerSelection={handleAnswerSelection} handleAnswerConfirm={handleAnswerConfirm}
       answerConfirmed={answerConfirmed}>
          <Jokers joker5050={joker5050} jokerAudience={jokerAudience} jokerPhone={jokerPhone} handleJokerSelection={handleJokerSelection}/>
      </Game>

      

      <Modal open={jokerAudience.modalOpen} imageSrc={require("./img/JokerAudience.png").default} 
      onClose={() => setJokerAudience({...jokerAudience, modalOpen: false})}>
        <JokerAudienceChart data={jokerAudience.percentages}></JokerAudienceChart>
      </Modal>

      <Modal open={jokerPhone.modalOpen} imageSrc={require("./img/JokerPhone.png").default} 
      onClose={() => setJokerPhone({...jokerPhone, modalOpen: false})}>
        {jokerPhone.modalText.map((s,i) => <div key={i} className={"delay"+i}>{s}<br/></div>)}
      </Modal>

      {renderPrizes && <Scoreboard prizes={prizes} showPrizes={showPrizes} handleCloseButton={() => setShowPrizes(false)}
      handleJokerSelection={handleJokerSelection} joker5050={joker5050} jokerAudience={jokerAudience} jokerPhone={jokerPhone}/>}

      <img className="background" src={require('./img/Logo.png').default}/>
      
    </div>
    </>
  );
}

export default App;