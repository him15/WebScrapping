let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request=require("request");
let cheerio=require("cheerio");
console.log("Before");
request(url,cb);

function cb(error , response , html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let selectorTool=cheerio.load(html);
    let scorecard=selectorTool(".match-cta-container");
    let linkArr=[];
    for(let i=0;i<scorecard.length;i++){
        let scorecardAnc=selectorTool(scorecard[i]).find("a[data-hover=Scorecard]");
        let halfLink=selectorTool(scorecardAnc).attr("href");
        let fullLink="https://www.espncricinfo.com"+halfLink;
        linkArr[i]=fullLink;
        getPlayerOfMatch(fullLink);
    }
    
    // for(let i=0;i<linkArr.length;i++){
       
       
    // }

}

function getPlayerOfMatch(link){
    request(link , cb);
    function cb(error , response , html){
        if(error){
            console.log(error);
        }else{
            PlayerParallel(html);
        }
    }

}

function PlayerParallel(html){
    let selectorTool=cheerio.load(html);
    let playerOfMatch=selectorTool(".best-player-content").text();
    console.log(playerOfMatch);
}