
import { useState } from 'react';
import './App.css';
import sound0 from './sounds/box0.mp3';
import sound1 from './sounds/box1.mp3';
import sound2 from './sounds/box2.mp3';
import sound3 from './sounds/box3.mp3';
import wrong from './sounds/wrong.mp3';
let level=1;
let num;
let url;
let list= [];
let itemNum=0;

function App() {
  let [heading, setHeading]= useState('Press A Key To Start The Game');
  let[initial, setInitial]= useState(true);
  let [userCheck, setUserCheck]= useState(false);
  let [tryAgain, setTryAgain] =useState(false);
  
 
  let [classes, setClasses]= useState({
    class0: 'box box0',
    class1: 'box box1',
    class2: 'box box2',
    class3: 'box box3'
  });
  
  if(initial){
    num= Math.floor(Math.random()*4);
    list.push(num);
    setInitial(false);
  
  }
  if(tryAgain){
    level=1;
    setTryAgain(false);
  }
  function toDo(){
    //console.log(itemNum);
    //console.log(list[itemNum]);
    console.log(list);
    switch (list[itemNum]) {
      case 0:
        url=sound0;
        setClasses((prev)=>{
          return {
              ...prev,
              class0: 'box box0 fadeIn'
            }
        })
        break;
      case 1:
        url=sound1;
        setClasses((prev)=>{
          return {
            ...prev,
            class1: 'box box1 fadeIn'
          }
        })
        break;
      case 2:
        url=sound2;
        setClasses((prev)=>{
          return {
            ...prev,
            class2: 'box box2 fadeIn'
          }
        })
        break;
      default:
        url=sound3;
        setClasses((prev)=>{
          return {
            ...prev,
            class3: 'box box3 fadeIn'
          }
        })
        break;
      
    };
    setTimeout(() => {
      setClasses((prev)=>{
        return {
          ...prev,
          class0: 'box box0',
          class1: 'box box1',
          class2: 'box box2',
          class3: 'box box3',
        }
      })
    }, 1000);

    let sound= new Audio(url);
    sound.play();
    setInitial(false);
  };

  
  window.addEventListener('keypress', ()=>{
    
      setHeading('Level'+ level);
      toDo();
  });
  

  function clickHandler(event){
    
  setInitial(false);
  if(event.target.classList[1]===`box${list[itemNum]}`){
      
      toDo();
      //console.log(itemNum);
      itemNum ++;

      if(itemNum === list.length){
        setUserCheck(false);
        if(!userCheck){
          level= level+1;
          setHeading('Level '+ level);
          setUserCheck(true);
        };

        setTimeout( () => {
            num= Math.floor(Math.random()*4);
          list.push(num);
          setUserCheck(false);
          
           toDo();
          
          },2000);
          
        setTimeout(()=>{itemNum=0}, 2000);
        }
      }
    else{
      url= wrong;
      let wrongSound= new Audio(url);
      wrongSound.play();
      itemNum=0;
      list= [];
      
      setHeading('Try Again! Press any key to start again');
      setTryAgain(true);
      setInitial(true);
      
    }
  };
  
  return (
    <>
      <h1>{heading}</h1>
      <main id='container'>
        <div onClick={clickHandler} className={classes.class0}></div>
        <div onClick={clickHandler} className={classes.class1}></div>
        <div onClick={clickHandler} className={classes.class2}></div>
        <div onClick={clickHandler} className={classes.class3}></div>
      </main>
    </>
  );
}

export default App;
