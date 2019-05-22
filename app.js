'use strict';

/*
Generate number of tick boxes depending on how many life studies there are per book.
Can I get the data to persist after it has been ticked? i.e. permanently ticked?
Store ticks to local storage. Next time it is generated, it remains ticked or unticked depending on what is in local storage
*/

/*==============================================
GLOBAL VARIABLES
================================================*/

var lifeStudyObjectArray = []; //Stores all the different LS titles
var lifeStudyArray = []; //Stores every single LS
var lifeStudySection; //Section on page for each LS book

var checkedLS = []; //Stores the LS that have been checked
var checkBox; //Checkbox on page
var numberLabel; //Label for checkbox
var uniqueID; //ID for each LS
var stringyLS; //String of LS selected to be stored in local storage

var percentageRead; //The percentage of messages read
var percentageNotRead; //The percentage of messages not read
var progressBlurb;
var blurbText;

/*==============================================
CONSTRUCTOR FUNCTION
================================================*/
//Constructor function for each LS book
//Stores name of LS and total number of messages
var LifeStudy = function(name, number){
  this.name = name;
  this.number = number;
  lifeStudyObjectArray.push(this);
};

/*==============================================
DOM REFERENCES
================================================*/
//References form from html
var ot = document.getElementById('ot');
var stats = document.getElementById('stats');

/*==============================================
LOCAL STORAGE
================================================*/
//This function checks if there is data in local storage, and retrieves it if there is data
function retrieve(){
  if(localStorage.getItem('LS') === null){ //If no data, nothing happens
    console.log('No checked boxes yet');
  } else {
    stringyLS = localStorage.getItem('LS'); //If data, retrieves back from local storage
    checkedLS = JSON.parse(stringyLS);
    console.log('Retrieved from local storage: ' + checkedLS);
  }
}

/*==============================================
OTHER FUNCTIONS
================================================*/
//Renders LS book title to form
function renderTitle(i){
  var title = document.createElement('h3');
  title.textContent = lifeStudyObjectArray[i].name;
  lifeStudySection.appendChild(title);
}

//Checks if box is already checked
function checkStoredBoxes(){
  if (checkedLS.includes(uniqueID)){
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }
}

//Renders LS checkbox, gives it an ID, adds ID to all LS array
function renderCheckBox(i, j){
  uniqueID = `${lifeStudyObjectArray[i].name}${j+1}`;
  checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = uniqueID;
  lifeStudyArray.push(uniqueID);
  checkStoredBoxes();
  numberLabel.appendChild(checkBox);
}

//Renders label
function renderLabel(j){
  numberLabel = document.createElement('label');
  numberLabel.textContent = j+1;
  lifeStudySection.appendChild(numberLabel);
}

//Function to create checkboxes and labels for each LS message in a book
function renderCheckBoxesAndLabel(i){
  for (var j = 0; j < lifeStudyObjectArray[i].number; j++){
    renderLabel(j);
    renderCheckBox(i, j);
  }
}

//Function to render LS book info in a fieldset onto the LS form on page
function renderLS(){
  retrieve();
  for (var i = 0; i < lifeStudyObjectArray.length; i++){
    lifeStudySection = document.createElement('fieldset');
    lifeStudySection.id = lifeStudyObjectArray[i].name;
    renderTitle(i);
    renderCheckBoxesAndLabel(i);
    ot.appendChild(lifeStudySection);
  }
  console.log('Total Life-Studies: ' + lifeStudyArray.length);
}

//Function to calculate progress
function calculateProgress(){
  percentageRead = Math.floor(checkedLS.length / lifeStudyArray.length * 100);
  percentageNotRead = 100 - percentageRead;
}

//Function to render progress to page
function renderProgress(){
  calculateProgress();
  blurbText = `${checkedLS.length} of ${lifeStudyArray.length}. ${percentageRead}% read.`;
  progressBlurb = document.createElement('p');
  progressBlurb.textContent = blurbText;
  stats.appendChild(progressBlurb);
}

//Function to update progress when new box clicked
function updateProgress(){
  calculateProgress();
  progressBlurb.textContent = blurbText;
}

// Adds pie charts to page (OT, NT, Total?)
function makeChart(){
  var pieChartLabels = ['Read', 'Not Yet Read'];
  var pieChartSegments = [percentageRead, percentageNotRead];

  var ctx = document.getElementById('progressChart').getContext('2d');
  var progressChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: pieChartLabels,
      datasets: [{
        label: 'Progress',
        data: pieChartSegments,
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
        ],
      }]
    },
    options: {
      title: {
        // display: true,
        // text: 'Progress'
      },
      legend: {
        display: 'true',
        position: 'bottom'
      }
    }
  });
}

//Function to load page
function loadPage(){
  renderLS();
  renderProgress();
  makeChart();
}

/*==============================================
SUBMIT EVENT LISTENER
================================================*/

//Event handler that adds clicked LS to array for local storage
var userClickedHandler = function(event){
  event.preventDefault();
  checkedLS = [];

  for (var m = 0; m < lifeStudyArray.length; m++){
    var thisLS = document.getElementById(lifeStudyArray[m]);
    if(thisLS.checked){
      checkedLS.push(lifeStudyArray[m]);
    }
  }
  stringyLS = JSON.stringify(checkedLS); //Stores to local storage
  localStorage.setItem('LS', stringyLS);
  updateProgress();
};

//Event listener added to form
ot.addEventListener('change', userClickedHandler);

/*==============================================
INITIALIZE PAGE
================================================*/

//Instantiates LS
new LifeStudy('genesis', 120);
new LifeStudy('exodus', 185);
new LifeStudy('leviticus', 64);
new LifeStudy('numbers', 54);
new LifeStudy('deuteronomy', 30);
new LifeStudy('joshua', 15);
new LifeStudy('judges', 10);
new LifeStudy('ruth', 8);
new LifeStudy('1 & 2 samuel', 38);
new LifeStudy('1 & 2 kings', 23);
new LifeStudy('1 & 2 chronicles', 13);
new LifeStudy('ezra', 5);
new LifeStudy('nehemiah', 5);
new LifeStudy('esther', 3);
new LifeStudy('job', 38);
new LifeStudy('psalms', 45);
new LifeStudy('proverbs', 8);
new LifeStudy('ecclesiastes', 2);
new LifeStudy('song of songs', 10);
new LifeStudy('isaiah', 54);
new LifeStudy('jeremiah', 40);
new LifeStudy('lamentations', 4);
new LifeStudy('ezekiel', 27);
new LifeStudy('daniel', 17);
new LifeStudy('minor prophets', 35);
new LifeStudy('zechariah', 15);
new LifeStudy('matthew', 71);
new LifeStudy('mark', 70);
new LifeStudy('luke', 79);
new LifeStudy('john', 51);
new LifeStudy('acts', 72);
new LifeStudy('romans', 69);
new LifeStudy('1 corinthians', 69);
new LifeStudy('2 corinthians', 59);
new LifeStudy('galatians', 46);
new LifeStudy('ephesians', 97);
new LifeStudy('philippians', 62);
new LifeStudy('colossians', 65);
new LifeStudy('1 thessalonians', 24);
new LifeStudy('2 thessalonians', 7);
new LifeStudy('1 timothy', 12);
new LifeStudy('2 timothy', 8);
new LifeStudy('titus', 6);
new LifeStudy('philemon', 2);
new LifeStudy('hebrews', 69);
new LifeStudy('james', 14);
new LifeStudy('1 peter', 34);
new LifeStudy('2 peter', 13);
new LifeStudy('1 john', 40);
new LifeStudy('2 john', 2);
new LifeStudy('3 john', 2);
new LifeStudy('jude', 5);
new LifeStudy('revelation', 68);

//Instantiates page
loadPage();
