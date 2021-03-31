let fs=require("fs");
console.log("before");

// async function fs.readfile()

//-------------Parallel --------------------------
    // fs.readFile("f1.txt" ,"UTF8" ,cb);
    // fs.readFile("f2.txt" ,"UTF8", cb);
    // fs.readFile("f3.txt" ,"UTF8", cb);
    // fs.readFile("f4.txt" ,"UTF8", cb);

    // function cb(err   ,data){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("content -> ",data);
    //     }
    // }

// ------------- Serial way ----------------------------
        fs.readFile("f1.txt" ,"UTF8" ,cb1);
        function cb1(err , data){
            if(err){
                console.log(err);
            }else{
                console.log("content -> ",data);
                fs.readFile("f2.txt","UTF8" , cb2);
            }
        }
        function cb2(err , data){
            if(err){
                console.log(err);
            }else{
                console.log("content -> ",data);
                fs.readFile("f3.txt" ,"UTF8", cb3);
            }
        }
        function cb3(err , data){
            if(err){
                console.log(err);
            }else{
                console.log("content -> ",data);
                fs.readFile("f4.txt","UTF8" , cb4);
            }
        }
        function cb4(err , data){
            if(err){
                console.log(err);
            }else{
                console.log("content -> ",data);
            }
        }
 
console.log("after");
console.log("other");