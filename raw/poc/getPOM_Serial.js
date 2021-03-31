let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request=require("request");
let cheerio=require("cheerio");
console.log("before");
request(url , cb);

function cb(error , response , html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let sTool=cheerio.load(html);
    let scorecard=sTool(".match-cta-container");
    let linkArr=[];
    for(let i=0;i<scorecard.length;i++){
        let scorecardAnc=sTool(scorecard[i]).find("a[data-hover=Scorecard]");
        let halfLink=sTool(scorecardAnc).attr("href");
        let fullLink="https://www.espncricinfo.com"+halfLink;
        linkArr[i]=fullLink;
       
    }
    getPlayerOfMatch(linkArr , 0);

}

function getPlayerOfMatch(arr , n){
    request(arr[n] , function(err , response , html){
        if(arr.length == n){
            return;
        }
        else if(err){
            console.log(err);
        }else{
            let selectorTool=cheerio.load(html);
            let playerOfMatch=selectorTool(".best-player-content").text();
            console.log(playerOfMatch);
            getPlayerOfMatch(arr , n+1);
        }
    });
}

console.log("after");