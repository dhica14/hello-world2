var $id = function(id) { return document.getElementById(id); };

AWS.config.region = 'us-east-2'; // リージョン
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:92815f71-7a22-408e-bf27-bcff9be110ab',
});
AWS.config.credentials.get(function(err) {
    console.log('err:' + err);
    if (!err) {
        console.log("Cognito Identify Id: " + AWS.config.credentials.identityId);
    }
});

function uploadFile() {
    AWS.config.region = 'us-east-2';    
    var url = location.href;    
    var s3BucketName = "s3-form-data";    
    var now = new Date();

    // checkbox値取得
    var checkbox_data = 0;
	var checkbox = document.form.checkbox01;
	for (var i = 0; i < checkbox.length; i++){
		if(checkbox[i].checked){ 
            checkbox_data += Number(checkbox[i].value);
		}
	}
    checkbox_data = ( '00000' + checkbox_data ).slice( -5 );

    // radio値取得
	var elements_radio = document.getElementsByName("radio02");
    for ( var radio_btn = "", i = elements_radio.length; i--; ) {	
        if ( elements_radio[i].checked ) {		
            var radio_btn = elements_radio[i].value ;		
            break ;	
        }
    }
    var obj = {
        "form1": $id("q-01").value,
        "form2": $id("q-02").value,
        "checkbox": checkbox_data,
        "radio": radio_btn,
        "date": now.toLocaleString(),
        "url": url 
    };  
//    var obj = {"name":$id("name").value, "mail":$id("mail").value ,"contents":$id("contents").value, "date": now.toLocaleString(), "url": url };
    var s3 = new AWS.S3({params: {Bucket: s3BucketName}});
    var blob = new Blob([JSON.stringify(obj, null, 2)], {type:'text/plain'});
    
    s3.putObject({Key: "uploads/" +now.getTime()+".txt", ContentType: "text/plain", Body: blob, ACL: "public-read"},function(err, data){
        if(data !== null){    
            alert("お問い合わせ完了致しました");        
            console.log('data:' + data);    
        }else{        
            alert("Upload Failed" + err.message);    
        }
    });
}