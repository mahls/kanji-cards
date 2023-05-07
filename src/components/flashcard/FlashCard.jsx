import React from 'react'
import {useState, useEffect} from 'react'
import { motion } from "framer-motion"
import { useTransition } from 'react-transition-state';
import { BsFillCaretDownSquareFill, BsEyeSlash, BsEye } from 'react-icons/bs';
import '../../App.css'
import { ColorModeScript } from '@chakra-ui/react'
import {CustomButton} from '../CustomButton.jsx'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

export const FlashCard = () => {

  const [allKanji, setallKanji] = useState([])
  const [randomKanji, setRandomKanji] = useState('');
  const [index, setIndex] = useState(0);
  const [characterInfo, setCharacterInfo] = useState({});

  const [gradeMenu, setGradeMenu] = useState(false);
  const [gradeSelected, setGradeSelected] = useState("grade-1");

  const [isNext, setIsNext] = useState(false);
  const [nextKanji, setNextKanji] = useState("");
  const [isPrevious,setIsPrevious] = useState(false);

  const [isRandom, setIsRandom] = useState(null);

  const [showInfo, setShowInfo] = useState(false);

  const [divsArray, setDivsArray] = useState([]);

  let addArray = () => {
    setDivsArray(oldArray => []);
    setDivsArray(oldArray => [...divsArray, randomKanji]);
    console.log(divsArray);
    setTimeout(()=>{setDivsArray(oldArray => [])},2000);
  };


  useEffect(() => {
    fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        .then(response => response.json())
        .then(data => setallKanji(data));
  }, []);

  useEffect(() => {
    fetch(`https://kanjiapi.dev/v1/kanji/${gradeSelected}`)
        .then(setIsNext(false))
        .then(response => response.json())
        .then(data => setallKanji(data));
  }, [gradeSelected])

  useEffect(() => {
       fetch(`https://kanjiapi.dev/v1/kanji/${randomKanji}`)
        .then(response => response.json())
        .then(data => setCharacterInfo(data)); 
  }, [randomKanji])

  let getNextKanjiInfo = () => {
       fetch(`https://kanjiapi.dev/v1/kanji/${nextKanji}`)
        .then(response => response.json())
        .then(data => setCharacterInfo(data)); 
  }

  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 80);
    let randomKanji = allKanji[randomNumber];
    setRandomKanji(randomKanji);
    setIndex(randomNumber);
  }, [allKanji])  
  
   let getRandomKanji = () => {
    setIsNext(false);
    let randomNumber = Math.floor(Math.random() * 80);
    let randomKanji = allKanji[randomNumber];
    setRandomKanji(randomKanji);
    setIndex(randomNumber);
    console.log(randomNumber);
    console.log(characterInfo);
    addArray();
  };

  let toggleGradeMenu = () => {
    console.log("menu");
    setGradeMenu(!gradeMenu);
    console.log(gradeMenu);
  };

  let handleGradeSelect = (grade) => {
      setGradeSelected(grade);
      console.log(gradeSelected);
      setGradeMenu(false);
  }

  let handleNext = () => {
    if(index > 30){
      setIndex(0);
      console.log(index);
      console.log('bigger');
    };
    setIndex(index + 1);
    console.log(index);
    let indexedKanji = allKanji[index];
    setNextKanji(indexedKanji);
    setIsNext(true);
    getNextKanjiInfo();
  }

  let toggleInfo = () => {
    setShowInfo(!showInfo);
    console.log(showInfo);
  };

  let handlePrevious = () => {
      if(index > 30){
      setIndex(0);
      console.log(index);
      console.log('bigger');
    };
    setIndex(index - 1);
    console.log(index);
    let indexedKanji = allKanji[index];
    setNextKanji(indexedKanji);
    setIsNext(false);
    getNextKanjiInfo(); 
  }

  let SelectMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon /> } colorScheme="black">
          <p className="font-bold text-stone-200">Select Grade</p>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={()=>{handleGradeSelect("grade-1")}}>Grade 1</MenuItem>
          <MenuItem onClick={()=>{handleGradeSelect("grade-2")}}>Grade 2</MenuItem>
          <MenuItem onClick={()=>{handleGradeSelect("grade-3")}}>Grade 3</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  //<div className="mr-2"><button className={buttonStyle + ""}>Previous</button></div>; 
  //<div className=""><button className={buttonStyle} onClick={getRandomKanji}>Random</button> </div>;
  //<div className="ml-2"><button className={buttonStyle + ""} onClick={handleNext}>Next</button> </div>;

  let menu = <div><p onClick={toggleGradeMenu} className="cursor-pointer pt-1"><BsFillCaretDownSquareFill className="text-stone-400"/></p></div>

  let buttonStyle="bg-stone-900 rounded-sm border-2 border-stone-600 bg-stone-700 w-32 transition ease-in-out delay-150 hover:border-stone-700 hover:text-stone-300";
  let gradeOptionStyle="cursor-pointer px-2 border-t-2 border-stone-900 hover:bg-stone-700"

  // fix index async state problem, previous button 

  return (

    <div className="flex content-center justify-center">

      {/*glow*/}
      <div className="fixed w-7/12 z-0 shadow-2xl opacity-5 shadow-emerald-900 h-96 animate-pulse mb-4 rounded-2xl "></div>

      <div className="rounded-sm border-2 h-9/12 z-40 border-stone-800 border-opacity-50 bg-stone-900 w-7/12  ">

        <div className="px-4 flex justify-between pt-4">
          <div className="font-bold text-stone-200">Kyōiku Kanji {gradeSelected}</div>
          <SelectMenu/>
        </div>

        {
          gradeMenu &&
          <div className="z-50">  
            <div onClick={()=>{handleGradeSelect("grade-1")}} className={gradeOptionStyle}><p>Grade 1</p></div>
            <div onClick={()=>{handleGradeSelect("grade-2")}} className={gradeOptionStyle}><p>Grade 2</p></div>
            <div onClick={()=>{handleGradeSelect("grade-3")}} className={gradeOptionStyle}><p>Grade 3</p></div>
          </div>
        }
        
        <div className="bg-stone-900 px-4 pt-4">
          <p className="text-stone-300">Index: {index}</p>
        </div>

        <div className="flex justify-center bg-stone-900 px-5 pt-8 h-48 py-5">
            <motion.div className="text-9xl text-stone-100 z-20 h-46 shadow-violet-200">{ isNext ? nextKanji : randomKanji } </motion.div>
        </div>
  
        { showInfo ?
          <div className="flex h-16 align-center center  justify-center bg-stone-900 px-5 py-5 text-stone-200 transition">
            <div className="px-2">Meaning: { characterInfo.heisig_en}</div>
            <div className="px-2">Kun: {characterInfo.kun_readings ==  undefined ? '' : characterInfo.kun_readings[0]}</div>
            <div className="px-2">Yoni: {characterInfo.on_readings == undefined ? '' : characterInfo.on_readings[0]}</div>
          </div> :
          <div className="bg-stone-900 h-16 transition"></div>
        }
        <div className="py-2 pb-4 flex bg-stone-900 border-stone-700 px-4 pt-4 justify-between">
          <div className="bg-stone-900 border-stone-700 mr-20 cursor-pointer" onClick={toggleInfo}>{showInfo ? <BsEye/> : <BsEyeSlash/>}</div>
          <div className="flex pr-20">        

            <CustomButton text={"Previous"} task={handlePrevious} />
            <CustomButton text={"Random"} style={'mx-2'} task={getRandomKanji}/>
            <CustomButton text={"Next"}   task={handleNext}/>
          </div>
          <div>
    
    </div>
        </div>
      </div>

    </div>
    
  )
}

const Foo = () => {
  const [allKanji] = useState([]);
  const [index, setIndex] = useState(0);

  const getCharacterInfo = (index) => {
    const nextKanji = allKanji[index];
    // API call and state update;
  };

  const handleNext = () => {
    const nextIndex = index > 30 ? 0 : index + 1;
    setIndex(nextIndex);
    getCharacterInfo(nextIndex);
  }
  
  const nextKanji = allKanji[index];

  return null;

}
