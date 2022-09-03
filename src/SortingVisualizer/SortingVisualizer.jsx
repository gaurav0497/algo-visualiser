import React from 'react';
import {getMergeSortAnimations,getBubbleSortedArray,heapSort,quickSort,insertion_Sort} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import {Container} from '@mui/material';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 280;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({array});
  }
  drawAnimation(animations){
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {

      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        barOneStyle.height = `${newHeight}px`;
        barOneStyle.color = color;
      }, i * ANIMATION_SPEED_MS);
    }
  }
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    let animation = []
    const animations = quickSort(this.state.array,0,this.state.array.length -1,animation);
    this.drawAnimation(animations);
    // for (let i = 0; i < animations.length; i++) {
    //   const arrayBars = document.getElementsByClassName('array-bar');
    //   const isColorChange = i % 3 !== 2;
    //   if (isColorChange) {
    //     const [barOneIdx, barTwoIdx] = animations[i];
    //     const barOneStyle = arrayBars[barOneIdx].style;
    //     const barTwoStyle = arrayBars[barTwoIdx].style;
    //     const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //     setTimeout(() => {
    //       barOneStyle.backgroundColor = color;
    //       barTwoStyle.backgroundColor = color;
    //     }, i * ANIMATION_SPEED_MS);
    //   } else {
    //     setTimeout(() => {
    //       const [barOneIdx, newHeight] = animations[i];
    //       const barOneStyle = arrayBars[barOneIdx].style;
    //       barOneStyle.height = `${newHeight}px`;
    //     }, i * ANIMATION_SPEED_MS);
    //   }
    // }
    // We leave it as an exercise to the viewer of this code to implement this method.
  }
  insertionSort(){
    const animations = insertion_Sort(this.state.array);
    this.drawAnimation(animations);
  }
  heapSort() {
    const animations = heapSort(this.state.array);
    this.drawAnimation(animations);
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    const animations = getBubbleSortedArray(this.state.array);
    this.drawAnimation(animations);
    // We leave it as an exercise to the viewer of this code to implement this method.

  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container" style={{marginBottom:"2rem",marginTop:"0.25rem"}}>
        <Div style={{backgroundColor:"brown",width:"50%",color:"whitesmoke",marginLeft:"20rem",marginBottom:"1rem"}}>{"Welcome to Sorting visualizer"}</Div>
        <div style={{marginBottom:"2rem"}}>
        <span>Animation speed : {ANIMATION_SPEED_MS}ms</span>
        <span style={{marginLeft:"2rem"}}>Number of array bars : {NUMBER_OF_ARRAY_BARS}</span>
        <span style={{marginLeft:"2rem"}}>Color of array bars : <span style={{backgroundColor:"turquoise"}}>{PRIMARY_COLOR.toUpperCase()}</span></span>
        </div>
        <Container >
        {array.map((value, idx) => (
          <div
            className="array-bar"
            id={idx}
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        </Container>
        <Button variant="outlined" color="error" onClick={() => this.resetArray()}>Generate New Array</Button>
        {/* <br></br> */}
        <div style={{marginTop:"1.1rem",justifyContent:"space-between"}}>
        <Button variant="outlined" style={{marginLeft:"2rem"}} onClick={() => this.bubbleSort()}>Bubble Sort</Button>
        <Button variant="outlined" style={{marginLeft:"2rem"}} onClick={() => this.insertionSort()}>Insertion Sort</Button>
        <Button variant="outlined" style={{marginLeft:"2rem"}} onClick={() => this.mergeSort()}>Merge Sort</Button>
        <Button variant="outlined" style={{marginLeft:"2rem"}} onClick={() => this.quickSort()}>Quick Sort</Button>
        <Button variant="outlined" style={{marginLeft:"2rem"}} onClick={() => this.heapSort()}>Heap Sort</Button>
        </div>
        
        {/* <Button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </Button> */}
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
