var server = "http://localhost:3000";
module.exports = function(cmd, params)  {
    function serializeUrl () {
        var paramStr = '';
        var cmdStr = '/' + cmd;

        if(params){
            cmdStr = cmdStr + '?';
            for (var nom in params) {
                paramStr += '&' + nom + '=' + params[nom];
            }
            paramStr = paramStr.replace(/\s/g, '+');
        }
        return server + cmdStr + paramStr
    }

    function send (){
        return new Promise(function (cumplir, romper) {
            var xhr = new XMLHttpRequest();
            var url = serializeUrl()
            console.log('request to', url)
            xhr.open("GET", url, true);
            
            xhr.onload = function () {
                if (xhr.status != 200) {
                    cumplir({success:false, message:'Ajax no ok - ' + xhr.status});
                    return
                }

                try {
                    var response = JSON.parse(xhr.responseText);
                } catch (e) {
                    cumplir({success:false, message:'JSON parser error', data: xhr.responseText})
                    return
                }

                cumplir(response);
            };
            
            xhr.onerror = function (err) { 
                cumplir({success:false, message:'ajax error - ' + JSON.stringify(err)}); 
            };
            
            xhr.send();

        });
    };

    return {
        send:send,
        serializeUrl:serializeUrl
    }
}