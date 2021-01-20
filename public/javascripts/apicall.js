var $id = function(id) { return document.getElementById(id); };
function uploadFile() {

  // var hostUrl= 'https://v690bkoz28.execute-api.ap-northeast-1.amazonaws.com/dev-app-web-form/v1';
  var hostUrl= 'https://oc4hwblb10.execute-api.ap-northeast-1.amazonaws.com/dev/mails';

    var param1 = 1;
    var param2 = 10;
    var now = new Date();
    var url = location.href;

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


    var data = {
        "form1": $id("q-01").value,
        "form2": $id("q-02").value,
        "checkbox": checkbox_data,
        "radio": radio_btn,
        "date": now.toLocaleString(),
        "url": url
    };

    $.ajax({
        url: hostUrl,
        type:'POST',
        dataType: 'json',
        data:JSON.stringify(data),
        // contentType: 'application/json',
        contentType: 'multipart/form-data',
        timeout:3000,
    }).done(function(data) {
        alert("ok");
    }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
        alert("error");
    })

}
