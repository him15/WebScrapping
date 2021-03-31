// let fs=require("fs");
// let content=fs.readFileSync("abc.json"); // return the content in string Buffer form
// // console.log(content+""); // now it will print in json format 

// // to read the file -> parse it in JSON format
// let json = JSON.parse(content);
// // console.log(json);

// // push one more data in the json file 
// json.push(
//     {
//         "name":"Shivhans",
//         "last_name" : "Gupta",
//         "age":28,
//         "address":{
//             "state" : "MP",
//             "country" : "India"
//         }

//     }
// );
// // console.log(json);

// // for Writing the file -> use Stringify
// fs.writeFileSync("abc.json" , JSON.stringify(json)); // again converting from json to string while writing in json.
// console.log(json[0].name);

function fn(a){
    console.log(a);
    a();
}

function inner(){
    console.log("Inner Function");
}

fn(inner);