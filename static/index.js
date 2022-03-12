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

genre_list_org={'Comedy':0,'Drama':0,'Crime':0,'Crime Drama':0,'Action':0,'Action Crime':0,'Horror':0,'Science Fiction':0,'Sci-fi drama':0,
'Animated':0,'Animation':0,'Animated':0,'Adult Animation':0,'Adventure':0,'Other':0,'Fantasy':0,'Fantasy Adventure':0,'Documentary':0,'Superhero':0}

men_genre_list_org={'Comedy':0,'Drama':0,'Crime':0,'Crime Drama':0,'Action':0,'Action Crime':0,'Horror':0,'Science Fiction':0,'Sci-fi drama':0,
'Animated':0,'Animation':0,'Animated':0,'Adult Animation':0,'Adventure':0,'Other':0,'Fantasy':0,'Fantasy Adventure':0,'Documentary':0,'Superhero':0}

women_genre_list_org={'Comedy':0,'Drama':0,'Crime':0,'Crime Drama':0,'Action':0,'Action Crime':0,'Horror':0,'Science Fiction':0,'Sci-fi drama':0,
'Animated':0,'Animation':0,'Animated':0,'Adult Animation':0,'Adventure':0,'Other':0,'Fantasy':0,'Fantasy Adventure':0,'Documentary':0,'Superhero':0}
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

function categorize(the_value){
  //console.log(genre_list_org['Science Fiction'])
  //genre_list_org['Science Fiction']=genre_list_org['Science Fiction']+1
  if(genre_list_org[the_value]!=undefined){
    genre_list_org[the_value]=genre_list_org[the_value]+1  
  }
  else {
    genre_list_org['Other']=genre_list_org['Other']+1 
  }




}

function createBar(){
    
  //Adds line breaks instead of semicolons for hover text
  //var theLabel=dataTopTen.map(row=> {
  //    return row.label.split(';');
  //})
  //theLabel=theLabel.map(row =>row.join('<br>'));
  //theLabel.reverse();

  //Creates Trace
  var trace1 = {
      type: 'bar',
      x: [1,2,3,4,5,6,7,8,9,10],
      y: [1,2,3,4,5,6,7,8,9,10],
      text: 'bar',
      hovertemplate: 
      '<b>%{x}<b>'+
      '<br>-------<br>'+
      '<i>%{text}</i>'+
      '<extra></extra>',
      orientation: 'h',
  };
  var myData=[trace1];

  //Layout and Plot
  layout = {
      title: {text:"Top Ten Bacteria Cultures Found",xanchor:'right'},
      title_x: 0,
      autosize: false,
      width: 600,
      height: 500,
      margin: {
          l: 70,
          r: 200,
          b: 100,
          t: 30,
          pad: 4
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xanchor: 'left',
      display:'none'
  }
  Plotly.newPlot("bar", myData,layout,{displayModeBar: false});
};
function pieChart(gender_df){
  var pieDiv = document.getElementById("pie-chart");
  var x=[]
  var y=[]

  the_gender='women'
  gender_trigger=0
  current_genre=""
 
  gender_df.forEach((shows) => {
    Object.entries(shows).forEach(([key,value]) => {
      if (key=="gender"){
        if(value==the_gender){
          
          gender_trigger=1
        }
        else{
          
          gender_trigger=0
        }
      } 

      //console.log(count)
      if (key=="genre_main"){
        //console.log('hit1')
        current_genre=value;
      }
      if (key=="views" && gender_trigger==1){
        console.log('hit2')
        console.log(current_genre)
        console.log(value/1000)
        //I need to sort out if it is man or woman first

        women_genre_list_org[current_genre]=women_genre_list_org[current_genre]+value/1000;
        //then need to create a list or dictonary for genre_sub
        //delete categorize function and remove the categorizing in new_select()
        //I actually will want to put this in a separate function so I don't have to create the pie chart twice(or create a loop 2x)
      }
    })
  })
  console.log( women_genre_list_org)
  //my_genres//this will be the thing to pass in the nextlne
  Object.entries(women_genre_list_org).forEach(([key,value]) => {
    
    if (value!=0){

      x.push(value)
      y.push(key)
    }
  })




  var traceA = {
    type: "pie",
    values: x,
    labels: y,
    hole: 0.5,
    pull: [0, 0, 0, 0, 0,0.2,0,0],
    direction: 'clockwise',
    marker: {
      //colors: ['#CDDC39', '#673AB7', '#F44336', '#00BCD4', '#607D8B'],
      line: {
        color: 'black',
        width: 0
      }
    },
    textfont: {
      family: 'Lato',
      color: 'white',
      size: 18
    },
    hoverlabel: {
      bgcolor: 'black',
      bordercolor: 'black',
      font: {
        family: 'Lato',
        color: 'white',
        size: 18
      }
    }
  };

  var data = [traceA];

  var layout = {
    title: {
      text:"Genre Preference",
      font: {
        family: 'Lato',
        color: 'white',
        size: 20
      }
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1,
      font: {
        family: 'Lato',
        color: 'white',
        size: 18
      }
    }
  };

  Plotly.plot(pieDiv, data, layout);

}

//MAIN-----------------------------------------------------------------------------------------


//use D3 to select table elements
var table=d3.select("#ufo-table");
//use D3 to select table head
var thead=d3.select("thead");
 //use D3 to select table body
var tbody=d3.select("tbody");



function new_select(){
  d3.select("tbody").html("")


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
              contain_streaming_service=false
              value.split("|").forEach((item)=> {
                if(temp_count==1) {
                  if (item==" Disney+" || item==" HBO" || item==" Netflix" || item==" Hulu"){contain_streaming_service=true}
                  else {
                    //console.log("1: "+item)
                    categorize(item)
                  }
                }

                if(temp_count==2 && contain_streaming_service==true){
                  //console.log("2: "+item)
                  categorize(item)
                }

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
    //pieChart(genre_list_org);
    getGenderData()
  })
}

function getGenderData(){


  var url_gender = `/api/gender?region=${countryField.property("value")}&generation=${generationField.property("value")}&category=${categoryField.property("value")}`;
  
  d3.json(url_gender).then(function (responseG) {
    
    console.log(responseG)
    pieChart(responseG);
  })

}


createBar();


//categorize('adfafa');
//categorize('Science Fiction');
//console.log(genre_list_org)

new_select();
