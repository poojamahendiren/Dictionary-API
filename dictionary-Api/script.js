// getiing required elements using class name
const searchText = document.querySelector(".searchText");
const searchBtn = document.querySelector(".btn");
const displayResults = document.querySelector(".displayResult");
const resultDiv = document.querySelector(".result");


 // reseting search box on every refresh
document.addEventListener("DOMContentLoaded",function() {
    searchText.value="";
});

 
//function to be performed during the search
searchBtn.addEventListener("click", function () {
    if(searchText.value===""){
        resultDiv.hidden=true;
        alert("hurry up! enter the word!!!");
    }
    else if(searchText.value!=""){
 const ApiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"+`${searchText.value}`;


 //nested-function for every individual results
 function renderResult(result) {
  const resultDiv = document.createElement("div");
  resultDiv.className = "card";
  let word = result['word'];
  let phonetic = result['phonetic'];
  let origin = result['origin'];
  let meaning = result['meanings'];
  let definition = meaning[0].definitions[0].definition;
  let example = meaning[0].definitions[0].example;
  if(example===undefined) {
    example="I couldnt find any examples";
  }
  let synonyms = meaning[0].definitions[0].synonyms;
  let synonym1 = synonyms[0];
    if(synonym1===undefined) {
        synonym1 = "";
    }
  let synonym2 = synonyms[1];
   if(synonym2===undefined){
        synonym2 = "'No Synonyms";
   }
  let synonym3 = synonyms[2];
     if(synonym3===undefined) {
        synonym3 = "";
     }
  resultDiv.innerHTML = `
    <h2>Word - ${word}</h2>
    <p><b>Phonetic</b> - ${phonetic};<br><br>
       <b>Origin</b> - ${origin}<br><br>
       <b>part-of-speech</b> - "${meaning[0].partOfSpeech}"<br><br>
       <b>Defenition</b> - ${definition}<br><br>
       <b>Example</b> - ${example}<br><br>
       <b>Synonyms<b> - ${synonym1}' ${synonym2}' ${synonym3}'</p>
`;
  displayResults.appendChild(resultDiv);
  console.log(resultDiv.innerHTML);
}

//function to get all results
function renderAll(results) {
  displayResults.innerHTML = "";
  resultDiv.hidden = false;
  for(let result of results){ 
        renderResult(result);
  }
}

  //fetching the results based on searchText
let func = async function(ApiURL){
    try{
    const response = await fetch(ApiURL);
    var results = await response.json();
    console.log(results);
    renderAll(results);
    }
    catch(error){
      console.log(error.message);
      alert("try to be more specific")
    }
}
// since fetching is under anonymous function , calling the function    
func(ApiURL);
}
});