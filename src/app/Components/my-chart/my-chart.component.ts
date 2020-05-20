import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {

  blue = 'rgba(60, 170, 255, 1)';
  purple = 'rgba(190,140,255)';
  green = 'rgba(35,250,30)';
  red = 'rgba(250, 0, 0, 1)';
  Chart;


  ARRAYSIZE = "100"; //parsed to an integer
  delay = 0;

  data = new Array(100);
  labels = new Array(100);
  backgroundCol = new Array(100).fill(this.blue);

  button_disabled = true;
  generate_button_disabled = false;

  constructor() { }


  ngOnInit(): void {

    this.start();

  }

  OnWrite(event: any) {
    this.ARRAYSIZE = event.target.value;
  }


  //initialize when user visits the site
  start() {

    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = 0;
    }

    this.Chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Length',
          data: this.data,
          backgroundColor: this.backgroundCol,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }

          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            display: false
          }]
        },
        legend: {
          display: false
        },
        animation: {
          duration: 500,
        },
        tooltips: false,
        hover: false


      }


    });
  }
  //generates random array
  generate() {


    let size = parseInt(this.ARRAYSIZE);

    if (size > 200) {
      size = 200;
    }

    if (size < 30) { //slower animation for small arrays, but big arrays will have no delay
      this.delay = 600 - size * 20;
    }
    else {
      this.delay = 0;
    }

    if (this.delay <= 0) { //ensures the delay never goes negative
      this.delay = 0;
    }

    this.data = new Array(size);
    this.labels = new Array(size);
    this.backgroundCol = new Array(size).fill(this.blue);

    this.button_disabled = false;
    for (let i = 0; i < this.data.length; i++) {
      let x = Math.random() * (150 - 5) + 5;
      x = Math.round(x);

      this.data[i] = x;
      this.backgroundCol[i] = this.blue; //reset colors
    }




    this.Chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Length',
          data: this.data,
          backgroundColor: this.backgroundCol,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }

          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            display: false
          }]
        },
        legend: {
          display: false
        },
        animation: {
          duration: 500,
        },
        tooltips: false,
        hover: false,
      }


    });



  }

  async BubbleSort() {

    this.button_disabled = true;
    this.generate_button_disabled = true;
    for (let i = this.data.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {

        //compare this bar to the next one and do a little comparison animation
        if (this.data[j] > this.data[j + 1]) {   // IF THE BARS ARE NOT FROM LEAST TO GREATEST
          this.backgroundCol[j] = this.red;
          this.backgroundCol[j + 1] = this.red;
          this.draw();

          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, this.delay)
          );

          //swap the bars lengths
          let temp = this.data[j];
          this.data[j] = this.data[j + 1];
          this.data[j + 1] = temp;

          this.draw();

          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, this.delay)
          );

          this.backgroundCol[j] = this.green;
          this.backgroundCol[j + 1] = this.green;
          this.draw();

          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, this.delay)
          );

        }
        else {  //IF THE BARS ARE ALREADY SORTED
          this.backgroundCol[j] = this.green;
          this.backgroundCol[j + 1] = this.green;
          this.draw();
          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, this.delay)
          );

        }
        this.backgroundCol[j] = this.blue;
        this.backgroundCol[j - 1] = this.blue;
        this.draw();
      }

    }

    for (let i = 0; i < this.data.length; i++) { //sorted
      this.backgroundCol[i] = this.purple
    }
    this.draw();
    this.generate_button_disabled = false;

  }
  async SelectionSort() {

    this.button_disabled = true;
    this.generate_button_disabled = true;

    for (let i = 0; i < this.data.length; i++) {
      let smallest_value = this.data[i]; //initial value
      let smallest_index = i;

      let j = 0;

      for (j = i; j < this.data.length; j++) {
        if (this.data[j] < smallest_value) {
          smallest_value = this.data[j];
          smallest_index = j;
        }
        for (let k = i; k < this.data.length - 1; k++) { //just make sure everything is blue except for the important comparisons
          this.backgroundCol[k] = this.blue;
        }
        for (let k = 0; k < i; k++) { //ensures the sorted part of array is always green
          this.backgroundCol[k] = this.green;
        }
        this.backgroundCol[j] = this.red;
        this.backgroundCol[smallest_index] = this.red;
        this.draw();
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, this.delay / 2)
        );



      }
      ///////////////////swap
      if (smallest_index != i) { //make sure its not the same thing
        let temp = this.data[i];
        this.data[i] = this.data[smallest_index];
        this.data[smallest_index] = temp;
      }
      this.backgroundCol[this.data.length - 1] = this.blue; //the last element in array


    }
    for (let i = 0; i < this.data.length; i++) { //everything is sorted and purple indicates that
      this.backgroundCol[i] = this.purple;
    }
    this.draw();
    this.generate_button_disabled = false;


  }
  async InsertionSort() {
    let value;
    let index;

    this.button_disabled = true;
    this.generate_button_disabled = true;

    for (let i = 1; i < this.data.length; i++) {
      value = this.data[i];
      index = i;


      while (index > 0 && this.data[index - 1] > value) {
        //the swaps
        let temp = this.data[index];
        this.data[index] = this.data[index - 1]
        this.data[index - 1] = temp;
        index--;

        //comparisons are red
        this.backgroundCol[index] = this.red;
        this.backgroundCol[index - 1] = this.red;

        //everything in front and behind the comparisons are green to indicate sorted part of array
        for (let k = 0; k < index - 1; k++) {
          this.backgroundCol[k] = this.green;
        }
        for (let k = index + 1; k < i; k++) {
          this.backgroundCol[k] = this.green;
        }

        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, this.delay / 2)
        );
        this.draw();
      }

      this.data[index] = value;
      this.draw();
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, this.delay / 2)
      );

    }
    for (let k = 0; k < this.data.length; k++) {
      this.backgroundCol[k] = this.purple;
    }
    this.draw();
    this.generate_button_disabled = false;

  }
  async ShellSort() {

    this.button_disabled = true;
    this.generate_button_disabled = true;

    for (let gap = (this.data.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < this.data.length; i++) {
        let temp = this.data[i];
        let j;
        for (j = i; j >= gap && this.data[j - gap] > temp; j -= gap) {

          //colors
          this.backgroundCol[j] = this.red; //when arriving at comparison, the red resembles not sorted, and the k loop make sures only those two elements are red
          this.backgroundCol[j - gap] = this.red;
          // k loop makes sure only current elements are highlighted
          for (let k = 0; k < this.backgroundCol.length; k++) {
            if (k != j && k != j - gap) {
              this.backgroundCol[k] = this.blue;
            }
            else {
              this.backgroundCol[k] = this.red;
            }
          }
          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, this.delay)
          );
          this.draw(); // draw it

          this.data[j] = this.data[j - gap];
          this.backgroundCol[j] = this.green;
          this.backgroundCol[j - gap] = this.green;

        }
        this.data[j] = temp;

        //update the chart
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, this.delay)
        );
        this.draw();

      }
      console.log(gap);

    }
    for (let i = 0; i < this.data.length; i++) {
      this.backgroundCol[i] = this.purple;
    }
    this.draw();
    this.generate_button_disabled = false;


  }
  async radixSort() {

    this.button_disabled = true;
    this.generate_button_disabled = true;

    let infinity = 999999;
    let max = this.data.length;

    //2D Array
    let matrix = new Array(max);//////
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(max);
    }
    let bucketCounter = new Array(max);

    //initialize
    for (let i = 0; i < max; i++) {
      bucketCounter[i] = 0;
      for (let j = 0; j < max; j++) {
        matrix[i][j] = infinity;
      }
    }

    //start
    let maxNum = -999999;
    for (let i = 0; i < max; i++) { //find max num
      if (maxNum < this.data[i]) {
        maxNum = this.data[i];
      }
    }

    //find number of digits of maxNum
    let length = 0;
    while (maxNum != 0) {
      length++;
      maxNum = Math.floor(maxNum / 10); //math.floor not needed if using a programming language with integers
    }

    let placementIndex = 0;
    let placementCounter = 1;
    let arrayHolder;

    while (length != 0) {
      //find last digit, second last digit, third last digit, etc

      for (let i = 0; i < max; i++) {
        arrayHolder = this.data[i];
        //colors
        this.backgroundCol[i] = this.red;
        this.backgroundCol[i - 1] = this.blue;
        this.backgroundCol[max - 1] = this.blue;
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, this.delay)
        );
        this.draw();
        for (let j = placementCounter; j != 0; j--) {
          placementIndex = arrayHolder % 10;  //remainder after / by 10
          arrayHolder = Math.floor(arrayHolder / 10);
        }

        matrix[placementIndex][bucketCounter[placementIndex]] = this.data[i];
        bucketCounter[placementIndex]++;

      }

      //fill array

      let horIndex = 0;
      let verIndex = 0;

      for (let i = 0; i < max; i++) {
        while (matrix[verIndex][horIndex] == infinity) {
          verIndex++;
          horIndex = 0;
        }

        //colors
        this.backgroundCol[i] = this.red;
        this.backgroundCol[i - 1] = this.blue;
        this.backgroundCol[max - 1] = this.blue;
        this.data[i] = matrix[verIndex][horIndex];
        horIndex++;

        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, this.delay)
        );
        this.draw();
      }

      for (let i = 0; i < max; i++) {
        bucketCounter[i] = 0;
        for (let j = 0; j < max; j++) {
          matrix[i][j] = infinity;
        }
      }

      length--;
      placementCounter++;
    }

    //final draw
    for (let i = 0; i < this.data.length; i++) {
      this.backgroundCol[i] = this.purple;
    }
    this.draw();
    this.generate_button_disabled = false;


  }
















  draw() {

    this.Chart.chart.options.animation.duration = 0;
    this.Chart.chart.update();

  }








}
