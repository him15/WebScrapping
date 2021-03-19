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
     
    let selectorTool=cheerio.load(html);
    let batsmanTab=selectorTool(".table.batsman");
    
    let teamName=selectorTool(".row.no-gutters.align-items-center");
    console.log(teamName.length);
    let teamArr=[];
    for(let i=0;i<2;i++){
        let tName = selectorTool(teamName[i]).text();
        tName=tName.split("INNINGS");
        teamArr[i]=tName[0];
    }

        for(let j=0;j<batsmanTab.length;j++){
            let singleBatsmanRow=selectorTool(batsmanTab[j]).find("tbody tr"); // gives rows of the batsman..
            // console.log("````````````````"+teamArr[j] + "````````````````````````");
            for(let k=0;k<singleBatsmanRow.length-1;k=k+2){
                let allCols=selectorTool(singleBatsmanRow[k]).find("td");
                let final=selectorTool(allCols[0]).text();
                // let a= " -> "+tName[0]; 
                // final = final + a;
                console.log(final + "  of  " + teamArr[j]);
            }
            console.log("````````````````````````````````");
            
        }

   }
    

    // for(let i=0;i<batsmanTab.length;i++){
    //     let singleInBowl=selectorTool(batsmanTab[i]).find("tbody tr"); // gives all the bowler with all stat in the match  
    //     for(let j=0;j<singleInBowl.length;j++){
    //         let batsmanTab=selectorTool(singleInBowl[j]).find("td");
    //         let batsman=selectorTool(batsmanTab[0]).text();
    //         console.log(batsman);
            
    //     }
    // }

    // console.log(stringHtml);

