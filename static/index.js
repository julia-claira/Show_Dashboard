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

function createBar(gender_df){
  
  var f_new_sub={};
  var m_new_sub={};
  var isSciFi=false
  var the_gender="women"

  gender_df.forEach((shows) => {
    Object.entries(shows).forEach(([key,value]) => {
      if(key=="gender"){
        if(value=="women"){
          the_gender="women"
        }
        else{
          the_gender="men"
        }      
      }
      
      if(key=="genre_main"){
        if(value=="Science Fiction"){
          isSciFi=true
        }
        else{
          isSciFi=false
        }
      }
      if(key=="genre_sub" && isSciFi){
        sub_cat=value
        if(the_gender=="women"){
          if (!(value in f_new_sub)){
            temp_sub={[value]:0}
            f_new_sub=Object.assign(temp_sub,f_new_sub)
          }
        }
        else{
          if (!(value in m_new_sub)){
            temp_sub={[value]:0}
            m_new_sub=Object.assign(temp_sub,m_new_sub)
          }
        }
      }
      if(key=="views" && isSciFi){
        if(the_gender=="women"){
          f_new_sub[sub_cat]=f_new_sub[sub_cat]+value/1000
        }
        else{
          m_new_sub[sub_cat]=m_new_sub[sub_cat]+value/1000
        }
      }
    })
  })
  console.log(f_new_sub)
  console.log(m_new_sub)
  //sort sub array and then chart top 5 subcategories!!!!!!!!!!!!!!!!
  
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
function pie_categorize(gender_df){

  men_genre_list_org={'Comedy':0,'Drama':0,'Crime':0,'Crime Drama':0,'Action':0,'Action Crime':0,'Horror':0,'Science Fiction':0,
  'Animation':0,'Adventure':0,'Other':0,'Fantasy':0,'Fantasy Adventure':0,'Documentary':0,'Superhero':0}

  women_genre_list_org={'Comedy':0,'Drama':0,'Crime':0,'Crime Drama':0,'Action':0,'Action Crime':0,'Horror':0,'Science Fiction':0,
  'Animation':0,'Adventure':0,'Other':0,'Fantasy':0,'Fantasy Adventure':0,'Documentary':0,'Superhero':0}

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
      if (key=="genre_main"){
        current_genre=value;
      }
      if (key=="views" && gender_trigger==1){
        if(women_genre_list_org[current_genre]!=undefined){
          women_genre_list_org[current_genre]=women_genre_list_org[current_genre]+value/1000;
        }
        else {
          women_genre_list_org['Other']=women_genre_list_org['Other']+value/1000;
        }
        
      }
      else if (key=="views" && gender_trigger==0){
        if(men_genre_list_org[current_genre]!=undefined){
          men_genre_list_org[current_genre]=men_genre_list_org[current_genre]+value/1000;
        }
        else {
          men_genre_list_org['Other']=men_genre_list_org['Other']+value/1000;
        }
      }
    })
  })
  
  pieChart(women_genre_list_org,men_genre_list_org)

}


function pieChart(women_the_genre_list,men_the_genre_list){
  

  var x=[]
  var y=[]
  var x2=[]
  var y2=[]

  Object.entries(women_the_genre_list).forEach(([key,value]) => {   
    if (value!=0){
      x.push(value)
      y.push(key)
    }
  })

  Object.entries(men_the_genre_list).forEach(([key,value]) => {   
    if (value!=0){
      x2.push(value)
      y2.push(key)
    }
  })

  var Women = {
    domain: {column: 0},
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

  var Men = {
    domain: {column: 1},
    type: "pie",
    values: x2,
    labels: y2,
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

  var data = [Women,Men];

  var layout = {
    title: {
      x:.2,
      y:.99,
      text:'Genre Preference by Gender',
      font: {
      color:'white',
      size:24},
    },
    annotations: [
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'Women',
        x: 0.175,
        y: 0.5,
        font: {
          color:'white',
          size:22}
      },
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'Men',
        x: 0.8,
        y: 0.5,
        font: {
          color:'white',
          size:22}
      }
    ],
    showlegend: true,
    autosize: false,
    width: 700,
    height: 520,
    margin: {
      l: 10,
      r: 10,
      b: 10,
      t: 120,
      pad: 0
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    legend: {
      orientation: "h",
      font: {
        family: 'Lato',
        color: 'white',
        size: 18
      }
    },
    grid: {rows: 1, columns: 2}
  };

  
  Plotly.newPlot("f-pie-chart", data, layout);

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
                    //categorize(item)
                  }
                }

                if(temp_count==2 && contain_streaming_service==true){
                  //console.log("2: "+item)
                  //categorize(item)
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
    
    //console.log(responseG)
    pie_categorize(responseG);
    createBar(responseG);
  })

}





//categorize('adfafa');
//categorize('Science Fiction');
//console.log(genre_list_org)

new_select();
