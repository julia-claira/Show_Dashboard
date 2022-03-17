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


var generationField= d3.select("#generation");//filter for city
generationField.on("change", new_select);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function categorize(temp_labels,numbersA){
    
  var temp_numbers=[]
  var labelsB=[]

    for (a of numbersA) temp_numbers.push(a);

    numbersA.sort( function( a , b){
      console.log('----')
      if(a < b) return 1;
      if(a > b) return -1;
      return 0;
  });
  for (i = 0; i < numbersA.length; i++){
    labelsB.push(temp_labels[temp_numbers.indexOf(numbersA[i])])
  }
  return labelsB
}






function createBar(gender_df,title_rank){

  var men_titles=[]
  var women_titles=[]
  
  var f_new_sub={};
  var m_new_sub={};

  gender_df.forEach((shows) => {
    
    if (shows['genre_main']=='Science Fiction'){
      if(shows['gender']=='women'){
        women_titles.push(shows['title'])
        
        if (!(shows['genre_sub'] in f_new_sub)){
          temp_sub={[shows['genre_sub']]:0}
          f_new_sub=Object.assign(temp_sub,f_new_sub)
        }
        f_new_sub[shows['genre_sub']]=f_new_sub[shows['genre_sub']]+shows['views']/1000
      }
      else{
        men_titles.push(shows['title'])

        if (!('*'+shows['genre_sub'] in m_new_sub)){
          temp_sub={['*'+shows['genre_sub']]:0}
          m_new_sub=Object.assign(temp_sub,m_new_sub)
        }
        m_new_sub['*'+shows['genre_sub']]=m_new_sub['*'+shows['genre_sub']]+shows['views']/1000
      }
    }
  })

  //sort sub array and then chart top 5 subcategories!!!!!!!!!!!!!!!!
  x1=[]
  y1=[]
  Object.entries(f_new_sub).forEach(([key,value])=>{
    x1.push(key)
    y1.push(value)
  })
  
  x1=categorize(x1,y1)
  while (x1.length>=6){
    x1.pop()
    y1.pop()
  }
  
  x2=[]
  y2=[]
  Object.entries(m_new_sub).forEach(([key,value])=>{
    x2.push(key)
    y2.push(value)
  })

  x2=categorize(x2,y2)
  while (x2.length>=6){
    x2.pop()
    y2.pop()
  }

  console.log(x2)
  x3=x1.concat(x2)
  y3=y1.concat(y2)

  console.log(x3)


  //Creates Trace
  var trace1 = {
      type: 'bar',
      x: x3,
      y: y3,
      text: 'bar',
      hovertemplate: 
      '<b>%{x}<b>'+
      '<br>-------<br>'+
      '<i>%{text}</i>'+
      '<extra></extra>',
      orientation: 'v',
      textfont: {
        family: 'Lato',
        color: 'white',
        size: 18
      },
      marker: {
        color: ['orange','orange','orange','orange','orange',
        'rgb(142,124,195)','rgb(142,124,195)','rgb(142,124,195)','rgb(142,124,195)','rgb(142,124,195)']
      }
  };
  
  var myData=[trace1];

  //Layout and Plot
  layout = {
      title: {text:"Science Fiction Sub-Genre Preference",
      x:0.09,
      y:.99,
      font: {
        color:'white',
        size:24},
    },
      //title_x: 0,
      annotations: [
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'Women',
          x: 1.48,
          y: y3[0]/1.1,
          font: {
            color:'white',
            size:22}
        },
        {
          font: {
            size: 20,
            color:'white'
          },
          showarrow: false,
          text: 'Men',
          x: 6.1,
          y: y3[0]/1.1,
          font: {
            color:'white',
            size:22}
        }
      ],
      showlegend: false,
      autosize: false,
      width: 700,
      height: 520,
      margin: {
        l: 45,
        r: 150,
        b: 80,
        t: 120,
        pad: 0
      },
      xaxis: {
        tickfont: {
          family: 'Lato',
          size: 14,
          color: 'white'
        },
      },
      yaxis: {
        tickfont: {
          family: 'Lato',
          size: 14,
          color: 'white'
        },
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xanchor: 'left',
      display:'none',
      //grid: {rows: 1, columns: 2, pattern: 'independent'}
  }
  Plotly.newPlot("bar", myData,layout,{displayModeBar: false});

  //43243274385347582340857342897985823 Create Rank Chart Here
  console.log(title_rank.indexOf(women_titles[0])+1)
  console.log(title_rank.indexOf('Bones')+1)

}
  
function pie_categorize(gender_df){

  men_genre_list_org={'Comedy':0,'Drama':0,'Crime':0,'Crime Drama':0,'Action':0,'Action Crime':0,'Horror':0,'Science Fiction':0,
  'Animation':0,'Adventure':0,'Other':0,'Fantasy':0,'Fantasy Adventure':0,'Documentary':0,'Superhero':0}

  women_genre_list_org={'Comedy':0,'Drama':0,'Crime':0,'Crime Drama':0,'Action':0,'Action Crime':0,'Horror':0,'Science Fiction':0,
  'Animation':0,'Adventure':0,'Other':0,'Fantasy':0,'Fantasy Adventure':0,'Documentary':0,'Superhero':0}

  the_gender='women'
  gender_trigger=0
  current_genre=""
  console.log(gender_df)
 
  gender_df.forEach((shows) => {

    if(shows['gender']=='women'){    
      if(women_genre_list_org[shows['genre_main']]!=undefined){
        women_genre_list_org[shows['genre_main']]=women_genre_list_org[shows['genre_main']]+shows['views']/1000;
      }
      else {
        women_genre_list_org['Other']=women_genre_list_org['Other']+shows['views']/1000;
      } 
    }
    else{
      if(men_genre_list_org[shows['genre_main']]!=undefined){
        men_genre_list_org[shows['genre_main']]=men_genre_list_org[shows['genre_main']]+shows['views']/1000;
      }
      else {
        men_genre_list_org['Other']=men_genre_list_org['Other']+shows['views']/1000;
      } 
    }
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
    grid: {rows: 1, columns: 2},
    display:'none'
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
  var url = `/api/region?region=${countryField.property("value")}&generation=${generationField.property("value")}&category=${categoryField.property("value")}`;
  d3.json(url).then(function (response) {
    list_genre=[]
    title_rank=[]
    response.forEach((shows => {
      row_count=row_count+1
      
      if (row_count<300){
        var row =tbody.append("tr")
        row.append("td").text(row_count)
        Object.entries(shows).forEach(([key,value]) => {
          
          if (key=='title') title_rank.push(value)
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
                    //if(item=="Science Ficcategorize(item)
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
    getGenderData(title_rank)

  })
}

function getGenderData(title_rank){


  var url_gender = `/api/gender?region=${countryField.property("value")}&generation=${generationField.property("value")}&category=${categoryField.property("value")}`;
  
  d3.json(url_gender).then(function (responseG) {
    
    //console.log(responseG)
    pie_categorize(responseG);
    createBar(responseG,title_rank);
  })
  
}





//categorize('adfafa');
//categorize('Science Fiction');
//console.log(genre_list_org)

new_select();
