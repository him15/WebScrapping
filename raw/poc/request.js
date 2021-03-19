let request=require("request");
let cheerio=require("cheerio");

// npm init -y
// npm install request 

// Async ham tb use karte hai jab hame pahle high priority wala kaam pahle karana hota hai & least priority wala kaam we put on callback function..

console.log("Before");
request("https://www.google.com/",cb);   // cb is call back function.

// this is the format of call back function - error,response,html
// it runs on the last - least priority work should be there.
function cb(error , response , html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html);
    }
}
function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let selectElem=selectorTool("#SIvCob");
    console.log(selectElem.html());
}

console.log("After");