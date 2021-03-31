let url="https://github.com/topics";
// no-underline d-flex flex-column flex-justify-center
let request=require("request");
let cheerio=require("cheerio");
let path=require("path");
let fs=require("fs");
let pdfDocument=require("pdfkit");
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
    let topics=selectorTool(".no-underline.d-flex.flex-column.flex-justify-center");

    for(let i=0;i<topics.length;i++){
        let link=selectorTool(topics[i]).attr("href");
        let fullLink="https://github.com/"+link;
        RepoLinkRequest(fullLink);

    }
}

function RepoLinkRequest(link){
    request(link , cb);
    function cb(err , response , html){
        if(err){
            console.log(err);
        }else{
            getRepoLink(html);
        }
    }
}

function getRepoLink(html){
    let selectorTool=cheerio.load(html);
    let topicName=selectorTool(".h1-mktg").text().trim();
    console.log(topicName);
    // CREATE THE DIRECTORY
    let dirPath=  path.join("F:\\WebDev\\2_web_Scrapping_13mar\\activity" , topicName);
    createDir(dirPath);

    let repoLinkBlock = selectorTool(".f3.color-text-secondary.text-normal.lh-condensed");
    
    for(let i=0;i<8;i++){
        let repoLinkAnch=selectorTool(repoLinkBlock[i]).find("a");
        let repoLink=selectorTool(repoLinkAnch[1]).attr("href");
        let fullrepoLink="https://github.com"+repoLink;

        // find the file Name for creating the JSON File 
        let linkArr=repoLink.split("/");
        let fileName=linkArr.pop();
        let filepath = path.join(dirPath, fileName);
        let fullFilePath=filepath + ".pdf";
        // createfile(fullFilePath);
        
        // move to issue section
        console.log(fullrepoLink);
        let issueLink=fullrepoLink+"/issues";
        pasteIssueInJsonRequest(issueLink , fullFilePath);
    }


    console.log("```````````````````````````````````````````");
}



// flex-auto min-width-0 p-2 pr-3 pr-md-2
function pasteIssueInJsonRequest(issueLink , pathLink){
    request(issueLink , cb);

    function cb(err , response , html){
        if(err){

            if(response.statusCode == 404){
                console.log("No Issue page found ");
            }else{
                console.log(err);
            }

        }else{
            pasteIssueInJson(html,issueLink,pathLink);
        }
    }
}

function pasteIssueInJson(html,issueLink , pathLink){
    let selectorTool=cheerio.load(html);
   
    let issuesdiv=selectorTool(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
    let arr=[];
    for(let i=0;i<issuesdiv.length;i++){
        let issuesName=selectorTool(issuesdiv[i]).find("a").text().trim();
        let issuesNameLink=selectorTool(issuesdiv[i]).find("a").attr("href");

        // write the issue name and link in the json file 
         arr.push({
            "Issue_Name": issuesName,
             "Link" : issuesNameLink   
            } );
        var json = JSON.stringify(arr);
        let pdfDoc=new pdfDocument;
        pdfDoc.pipe(fs.createWriteStream(pathLink));
        pdfDoc.text(json);
        pdfDoc.end();
        console.log("completed !");
    }
}

console.log("After the nd ");

//creating the json file 
function createfile(filepath){
    if (fs.existsSync(filepath) == false){
        let createStream=fs.createWriteStream(filepath);
        createStream.end();
    }
}

// create the folders 
function createDir(pathOfFolder){
    if (fs.existsSync(pathOfFolder) == false){
        fs.mkdirSync(pathOfFolder);
    }
}