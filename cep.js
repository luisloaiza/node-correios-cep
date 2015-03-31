
var request = require('request');
var querystring = require("querystring");
var parseString = require('xml2js').parseString;

/*
	Call to the CEP - Correo Brasil API
	https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente
*/

exports.requestCEP = function(cep,onResponse){
	
	var xmlBody= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:cli=\"http://cliente.bean.master.sigep.bsb.correios.com.br/\">" +
           "<soapenv:Header />" +
           "<soapenv:Body>" +
              "<cli:consultaCEP>" +
                "<cep>"+cep+"</cep>" +
              "</cli:consultaCEP>" +
           "</soapenv:Body>" +
        "</soapenv:Envelope>";

	request.post({
		  headers: {'content-type' : 'text/xml; charset=utf-8'}
		  , url: "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente"
		  , body: xmlBody
		}, function(error, response, bodyXml){

			parseString(bodyXml, function (err, result) {

				var responseArr=result["soap:Envelope"]["soap:Body"][0]["ns2:consultaCEPResponse"][0]["return"];
	    		var resultObjectArr=[];
	    		for(var i=0;i<responseArr.length;i++){
		    		resultObjectArr.push({
		    			bairro:responseArr[i]["bairro"][0],
		    			cep:responseArr[i]["cep"][0],
		    			cidade:responseArr[i]["cidade"][0],
		    			complemento:responseArr[i]["complemento"][0],
		    			complemento2:responseArr[i]["complemento2"][0],
		    			street:responseArr[i]["end"][0],
		    			state:responseArr[i]["uf"][0]
		    		});
	    		}// end for

	    		onResponse(resultObjectArr);
			});// end parsing results
		});
}// end function


