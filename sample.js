var cepservice=require("./cep.js");

cepservice.requestCEP("30170-122",function(jsonResult){
        console.log("Result is "+JSON.stringify(jsonResult));
});// end 

        