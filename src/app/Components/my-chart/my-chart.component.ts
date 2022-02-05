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


  ARRAYSIZE = "200"; //parsed to an integer
  delay = 0;

  data = new Array(200);
  labels = new Array(200);
  backgroundCol = new Array(200).fill(this.blue);

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

    if (size > 600) {
      size = 600;
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

  generateReversed(){
    let size = parseInt(this.ARRAYSIZE);

    if (size > 600) {
      size = 600;
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
      let x = this.data.length-5-i;
      
      if(x < 1){
        x = 1
      }

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

  async initiateMergeSort(){
    this.button_disabled = true;
    this.generate_button_disabled = true;

    await this.mergeSort(0, this.data.length-1);

    for (let i = 0; i < this.data.length; i++) { //everything is sorted and purple indicates that
      this.backgroundCol[i] = this.purple;
    }
    this.draw();
    this.generate_button_disabled = false;
  }
  
  async merge(l,m,r){
    // Find sizes of two subarrays to be merged
        let n1 = Math.floor(m - l + 1);
        let n2 = Math.floor(r - m);
  
        /* Create temp arrays */
        let L = new Array();
        let R = new Array();
  
        /*Copy data to temp arrays*/
        for (let a = 0; a < n1; a++)
            L.push(this.data[l + a]);
            
        for (let b = 0; b < n2; b++)
            R.push(this.data[m + 1 + b]);
  
        /* Merge the temp arrays */
  
        // Initial indexes of first and second subarrays
        let i = 0, j = 0;
  
        // Initial index of merged subarray array
        let k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                this.data[k] = L[i];
                i++;
                this.backgroundCol[k] = this.red;
                this.draw();
                await new Promise(resolve =>
                  setTimeout(() => {
                    resolve();
                  }, this.delay)
                );
              this.backgroundCol[k] = this.blue;
            }
            else {
                this.data[k] = R[j];
                j++;
                this.backgroundCol[k] = this.red;
                this.draw();
                await new Promise(resolve =>
                  setTimeout(() => {
                    resolve();
                  }, this.delay)
                );
                this.backgroundCol[k] = this.blue;
            }
            k++;
        }
  
        /* Copy remaining elements of L[] if any */
        while (i < n1) {
            this.data[k] = L[i];
            i++;
            k++;
            this.backgroundCol[k] = this.red;
            this.draw();
            await new Promise(resolve =>
              setTimeout(() => {
                resolve();
              }, this.delay)
            );
            this.backgroundCol[k] = this.blue;
        }
  
        /* Copy remaining elements of R[] if any */
        while (j < n2) {
            this.data[k] = R[j];
            j++;
            k++;
            this.backgroundCol[k] = this.red;
            this.draw();
            await new Promise(resolve =>
              setTimeout(() => {
                resolve();
              }, this.delay)
            );
            this.backgroundCol[k] = this.blue;
            
        }
  }
  async mergeSort(l,r){
    if (l < r) 
    {
        // Find the middle point
        let m = Math.floor(l+ (r-l)/2);

        // Sort first and second halves
        await this.mergeSort(l, m);
        await this.mergeSort( m +1, r);

        // Merge the sorted halves
        await this.merge(l, m, r);
    }
  }


  async HeapSort()
  {
      this.button_disabled = true;
      this.generate_button_disabled = true
      //first we have to build the heap. Recall the leaf nodes are already a heap on their own, so to find the last non-leaf node, we go to the element at index n / 2 - 1
      //has to happen bottom up
      await this.BuildMaxHeap();

      //starting from the last element, extract root node (largest in the entire list) and swap it with the current node at end of the tree. Now the largest element is sorted
      //Disregard last element as it is sorted. Heap length follows loop counter variable. Root index is always first

      for (let i = this.data.length - 1; i >= 0; i--)
      {
          let temp = this.data[i];
          this.data[i] = this.data[0];
          this.data[0] = temp; //sorted
          this.backgroundCol[i] = this.green;
          await this.Heapify(i, 0);
      }
      for (let i = 0; i < this.data.length; i++) { //everything is sorted and purple indicates that
        this.backgroundCol[i] = this.purple;
      }
      this.draw();
      this.generate_button_disabled = false;

  }
  async Heapify(HeapSize, rootIndex)
  {
      //indices of the three nodes
      let largerNode = rootIndex;
      let leftChild = 2 * rootIndex + 1;
      let rightChild = 2 * rootIndex + 2;

      //make sure the calculated position of the child element is within the list first before comparing 
      if (leftChild < HeapSize && this.data[leftChild] > this.data[largerNode])
      {
          largerNode = leftChild;
      }
      if(rightChild < HeapSize && this.data[rightChild] > this.data[largerNode])
      {
          largerNode = rightChild;
      }
      
      //if the root is smaller than one of the children, swap the nodes so that the old root is the new child, and perform heapify on the subtree starting at that node
      if(largerNode != rootIndex)
      {

          this.backgroundCol[rootIndex] = this.red;
          this.backgroundCol[largerNode] = this.red;

          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, this.delay)
          );
          this.draw(); // draw it

          let temp = this.data[rootIndex];
          this.data[rootIndex] = this.data[largerNode];
          this.data[largerNode] = temp;

          
          this.backgroundCol[rootIndex] = this.green;
          this.backgroundCol[largerNode] = this.green;

          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, this.delay)
          );
          this.draw(); // draw it

          this.backgroundCol[rootIndex] = this.blue;
          this.backgroundCol[largerNode] = this.blue;

          await this.Heapify(HeapSize, largerNode); //heap size does not change because we are referring to the entire original list, but the root node of the subtree is located where the old larger child was
      }
      //if the larger element is already the root, the heap condition is satisfied, and since we did not change anything, and we built a max heap in the beginning, we know the subtrees below are also maintining the condition. No need to heapify further below
  }
  async BuildMaxHeap()
  {
      let heapSize = this.data.length;
      for (let i = Math.floor(this.data.length/2) - 1; i >= 0; i--)
      {
          await this.Heapify(heapSize, i); //each subtree will be heapified, and we will move up the entire tree, right to left, bottom level to top level
      }
  }


  async initiateQuickSort(){
    this.button_disabled = true;
    this.generate_button_disabled = true;

    await this.QuickSort(0, this.data.length-1);

    for (let i = 0; i < this.data.length; i++) { //everything is sorted and purple indicates that
      this.backgroundCol[i] = this.purple;
    }
    this.draw();
    this.generate_button_disabled = false;
  }
  async QuickSort(left, right)
  {
      if (left < right)
      {
          let pivotIndex = await this.HoarePartition(left, right);

          //pivot should be included in the recursive quicksort call for left half because we are using Hoare Partition, which means the element at pivotIndex is not guaranteed at its final sorted position
          //if we used Lomuto partition, we would not have to include the element at pivotIndex as this algorithm guarantees final sorted position
          await this.QuickSort(left, pivotIndex); 
          await this.QuickSort(pivotIndex + 1, right);
      }
  }
  async HoarePartition(left, right)
  {

      // Partition the sublist from index 'left' to index 'right' as described above.
      let pivotIndex = -1;

      if (left < right && left >= 0 && right < this.data.length)
      {
          let pivot = this.data[Math.floor(left + (right - left) / 2)]; // Immune from overflow exception //middle element
          let i = left - 1;
          pivotIndex = right + 1;

          while (i < pivotIndex)
          {
              // Starting from the left, loop until a value is found that is >= 'pivot'
              do
              {
                  i++;
              } while (this.data[i] < pivot);

              // Starting from the right, loop until a value is found that is <= 'pivot'
              do
              {
                  pivotIndex--;
              } while (this.data[pivotIndex] > pivot);

              if (i < pivotIndex)
              {   
                  this.backgroundCol[i] = this.red;
                  this.backgroundCol[pivotIndex] = this.red;
                  await new Promise(resolve =>
                    setTimeout(() => {
                      resolve();
                    }, this.delay)
                  );
                  this.draw(); // draw it


                  // Swap l[i] with l[pivotIndex] because they are out of order relative to 'pivot'
                  let copy = this.data[i];
                  this.data[i] = this.data[pivotIndex];
                  this.data[pivotIndex] = copy;

                  this.backgroundCol[i] = this.green;
                  this.backgroundCol[pivotIndex] = this.green;
                  await new Promise(resolve =>
                    setTimeout(() => {
                      resolve();
                    }, this.delay)
                  );
                  this.draw(); // draw it

                  this.backgroundCol[i] = this.blue;
                  this.backgroundCol[pivotIndex] = this.blue;
                  
              }
          }
      }

      return pivotIndex;
  }
















  draw() {

    this.Chart.chart.options.animation.duration = 0;
    this.Chart.chart.update();

  }








}
