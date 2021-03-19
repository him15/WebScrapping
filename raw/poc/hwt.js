let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request=require("request");
let cheerio=require("cheerio");

console.log("Before");

request(url , cb);


function cb(error , response , html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html);
        
    }
}

function extractHtml(html){
    //-------  extract both the bowler table
    // save the bowler name and no. of wickets
    // compare the wickets 
    let selectorTool=cheerio.load(html);
    let bowlerTab=selectorTool(".table.bowler");
    console.log(bowlerTab.length);
    
    // extract all the data of the table from the website one by one 
    // let stringHtml="";
    // for(let i=0;i<bowlerTab.length;i++){
    //     stringHtml += selectorTool(bowlerTab[i]).html();

    // }

    for(let i=0;i<bowlerTab.length;i++){

        let singleInBowl=selectorTool(bowlerTab[i]).find("tbody tr"); // gives all the bowler with all stat in the match  
        for(let j=0;j<singleInBowl.length;j++){
            let bowlerTab=selectorTool(singleInBowl[j]).find("td");
            let bowler=selectorTool(bowlerTab[0]).text();
            let wickets=selectorTool(bowlerTab[4]).text();
            console.log("bowler -> "+bowler +"wicket -> "+wickets);
            
        }
        console.log("`````````````````````````````");
    }

    // console.log(stringHtml);

}

