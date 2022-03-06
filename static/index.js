//The Filter Selection Form------------------------------------------------------------------

//User Events
genre_list=['Comedy','Sitcom','Animated','For Girls','Animation','Adult Animation','Fantasy','Supernatural','History','Vikings','HBO','Dragons','Netflix',
 'Wizards','Superhero','DC','Crime','Case of the week','Science Fiction','Postapocalypse','Mystery','Drama','Gangsters','For Older Kids','Doctors',
 'Drug Cartel','Serial killer','Vampires','Action','Prison','Teens','Politics','Buddies','Horror','Terorrism','Future','Disaster','Business','For babies','Murder',
 'Independent Comics','Journalists','Witch','Cyberpunk','Disney+','Space opera','Space','Music','Time travel','Robots','Animals','Treasure hunt','Princesses',
 'Crime Drama','Fashion','Hulu','Forbidden Love','Lawyers','Marvel','Kings and Queens','Spies','For Boys','Family Ties','Biopic','Musicians','Werewolves','Coming of Age',
 'Christian','Cry movie','Zombies','Ghosts','HBO Max','Sci-fi drama','Amazon','War','World War II','Survival','Situation','Aliens','Iraq War','Magical Realism','Romance',
 'Cancer','Documentary','Action Crime','Racism','Far East','Weed','Fantasy Adventure','Relationship','Ancient Rome','Thriller','Dramedy','Disapperance',
 'Rom Com','Writers','Body switch','Sex','Geniuses','Conspiracy','Holocaust','Break-up']


//var resetButton = d3.select("#reset");//resets filter
//resetButton.on("click",resetTable);

//var dateField= d3.select("#date-field");//filter for date
//dateField.on("change", filteredTable);

var categoryField= d3.select("#category");//filter for shape
categoryField.on("change", new_select);

var countryField= d3.select("#country");//filter for country
countryField.on("change", new_select);

var genderField= d3.select("#gender");//filter for state
genderField.on("change", new_select);

var generationField= d3.select("#generation");//filter for city
generationField.on("change", new_select);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//Function For Dynamic Dropdown Menus -- State Dropdown options update if Country changes///City Dropdown options update if State changes
function dropDowns(theField,theData,theColumn){

  theField.html("");//clears dynamic dropdown
  
  
  var theValues=theData.map(function(item){//finds all the values
    return Object.values(item)[theColumn];
  });
  
  theField.append("option").text('All').attr('value','All');//adds "All" to dropdown as default
  
  var uniqueValues=[];//holds all the unique values to populate the dropdown
  theValues.forEach(thevalue=>{
    if (uniqueValues.includes(thevalue));//if value is already in array skip
    else {//if value is first time appearing add to dropdown array
      uniqueValues.push(thevalue);
    };
  });
  //alphabetizes array and appends the dropdown
  uniqueValues.sort();
  uniqueValues.forEach((item) => {
    theField.append("option").text(item).attr('value',item);
  });
};
 

//Function to Populate Filtered Table-------------------------------------------------------------------------

function filteredTable(){
  
  tbody.html(""); //clears table body
  var filtered_data=data;//stores data in temporary variable
  

  if (d3.event){//if the function is triggered by a user event
    d3.event.preventDefault();// prevent the page from refreshing  
    var triggerValue=d3.event.target.id//stores the trigger event so dropbox options can dynamically update
  }
  else {
    var triggerValue="reset";//no trigger event if page is just loaded
  }
  

  //depending on the trigger event, this will regenerate dropdown options for state and/or city
  if (triggerValue!="date-field" && triggerValue!="shape" && triggerValue !="reset"){//if this is triggered by an event change in the dropdown options
      filtered_data=filtered_data.filter(selectCountry);
    if (triggerValue==="country"){
      dropDowns(stateField,filtered_data,2);//regenerates state dropdown options if Country is changed
    }
    filtered_data=filtered_data.filter(selectState);
    
    if (triggerValue==="state" || triggerValue==="country"){ 
      console.log('yes')
      dropDowns(cityField,filtered_data,1);// regnerates city dropdown options if Country or State is changed.
    }
    filtered_data=filtered_data.filter(selectCity);
  }
  //if country, state, or city is NOT the trigger event, filter table without regenerating their dropdown options
  else {
    
    filtered_data=filtered_data.filter(selectCountry);
    filtered_data=filtered_data.filter(selectState);
    filtered_data=filtered_data.filter(selectCity);
  }
  
  //filters table by date and shape
  filtered_data=filtered_data.filter(selectDate);
  filtered_data=filtered_data.filter(selectShape);
   
  //Populates the table with the now filtered data based on user selection
  filtered_data.forEach(sighting => {
    var row =tbody.append("tr");
    Object.entries(sighting).forEach(([key,value]) => row.append("td").text(value));   
  })
  
}

//Custom Filter Functions-------------------------------------------------------------------

//Date Filter
function selectDate(theDate){
  if (dateField.property("value")===""){
    return theDate.datetime;
  }
  else {
    return theDate.datetime === dateField.property("value");
  }
};

//Country Filter
function selectCountry(theCountry){
  if (countryField.property("value")==="All"){
    return theCountry.country;
  }
  else{
    return theCountry.country === countryField.property("value");
  }
};

//State Filter
function selectState(theState){
  if (stateField.property("value")==="All"){
    return theState.state;
  }
  return theState.state === stateField.property("value");
};

//City Filter
function selectCity(theCity){
  if (cityField.property("value")==="All"){
    return theCity.city;
  }
  return theCity.city === cityField.property("value");
};

//Shape Filter
function selectShape(theShape){
  if (shapeField.property("value")===""){
    return theShape.shape;
  }
  return theShape.shape === shapeField.property("value");
};

//Function to Reset Table----------------------------------------------------------
function resetTable(){

  dateField.property("value","")
  shapeField.property("value","")
  dropDowns(countryField,data,3);
  dropDowns(stateField,data,2);
  dropDowns(cityField,data,1);

  filteredTable();
}

//MAIN-----------------------------------------------------------------------------------------


//use D3 to select table elements
var table=d3.select("#ufo-table");
//use D3 to select table head
var thead=d3.select("thead");
 //use D3 to select table body
var tbody=d3.select("tbody");


//Append header column names for Table
//var columnNames=['Title', 'Category', 'Production Country', 'Premiere','Genres:','Views'];
//var row = thead.append("tr");
//columnNames.forEach(columnName => row.append("th").text(columnName));

function new_select(){
  d3.select("tbody").html("")
  //tbody.html(""); 
  //populate table on load

  row_count=0
  var url = `/api/region?region=${countryField.property("value")}&gender=${genderField.property("value")}&generation=${generationField.property("value")}&category=${categoryField.property("value")}`;
  d3.json(url).then(function (response) {
    list_genre=[]
    response.forEach((shows => {
      row_count=row_count+1
      
      if (row_count<100){
        var row =tbody.append("tr")
        row.append("td").text(row_count)
        Object.entries(shows).forEach(([key,value]) => {
          

          if (key!='generation' && key!='gender' && key!='viewing_country' && key!='view'){
            if (key=='genre'){
              temp_value=""
              temp_count=0
              value.split("|").forEach((item)=> {
                if (!list_genre.includes(item)){list_genre.push(item)}
                if(temp_count>1){
                  temp_value=temp_value+", "}
                temp_count++
                temp_value=temp_value+item
              })
              row.append("td").text(temp_value)
            }
            else if (key=='views'){
              row.append("td").text(numberWithCommas(value))
            }
            else{
              row.append("td").text(value)
            }
          } 
        })
      } 
    }))
    //console.log(list_genre)
  })
}
//initiate on load
//d3.select('#genre').append("option").text('All').property("value",'All')
//genre_list.forEach(item=>{
//  d3.select('#genre').append("option").text(item).property("value",item)
//})

new_select();
