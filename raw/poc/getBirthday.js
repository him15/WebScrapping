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
    let batsmanTabArr=selectorTool(".table.batsman");
    let teamName=selectorTool(".row.no-gutters.align-items-center");
    let teamArr=[];
    for(let i=0;i<2;i++){
        let tName = selectorTool(teamName[i]).text();
        tName=tName.split("INNINGS");
        teamArr[i]=tName[0];
    }

    for(let i=0;i<batsmanTabArr.length; i++){
        let batsmanTabAnch=selectorTool(batsmanTabArr[i]).find("tbody tr .batsman-cell a"); // gives the array of the anchor
        
        for(let j=0;j<batsmanTabAnch.length;j++){

            let names=selectorTool(batsmanTabAnch[j]).text();
            let teamName=teamArr[i];
            let link = selectorTool(batsmanTabAnch[j]).attr("href") ;
            // console.log(names , teamName , link);
            printBirthday(names , teamName , link);
        }
        

    }
   
}

function printBirthday(names , teamName , link){

    request(link , cb);
    function cb(error , response , html){
        if(error){
            console.log(error);
        }else{
            extractBirthday(html , names , teamName);
        }
    }
}

function extractBirthday(html , names , teamName){
    let selectorTool=cheerio.load(html);
    let birthdayElem=selectorTool(".ciPlayerinformationtxt span");
    let birthday=selectorTool(birthdayElem[1]).text();
    console.log(names ," is player of " , teamName , " born on " , birthday);
    console.log("");

}