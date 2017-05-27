(function (window, document) {

    var Checker = {

        retries: 10,
        cookiesEnabled: false,
        adblockEnabled: false,
        checkLocalDone: false,
        checkRemoteDone: false,

        options: {
            showPopup: true,
            allowClose: true
        },

        _ln: (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase(),
        ln: function(num){
            var lns={
                ru:[
                    'Закрыть',
                    'Функционал сайта ограничен',
                    'Настройки вашего браузера или одно из его расширений не дают нашему сайту установить cookie. Без cookie будет невозможно воспользоваться купоном на скидку или услугой возврата части денег за вашу покупку, вероятны и другие ошибки.',
                    'Проблема может быть вызвана:',
                    '<strong>Настройками вашего браузера.</strong> Зайдите в настройки браузера и разрешите использование файлов cookie.',
                    '<strong>Сторонним расширением AdBlock.</strong> Чтобы наш сайт заработал корректно вам нужно добавить его в <a href="' + Checker.adbs + '">белый список</a> в настройках AdBlock. ',
                    'Настроить Adblock'
                ],
                en: [
                    'Close',
                    'Website functionality is limited',
                    'Your browser settings or one of the extensions prevent cookies from installation. Without cookies you will not be able to use discount coupons or cash-back services; other errors are posssible as well.',
                    'The problem may be caused by:',
                    '<strong>Your browser settings.</strong>  Please, go to the browser settings and permit cookie files usage.',
                    '<strong>By a third-party extension, like AdBlock.</strong> To make the website work correctly, please, add it to <a href="' + Checker.adbs + '">whitelist</a> in AdBlock settings.',
                    'Set up Adblock',
                ],
                pt: [
                    'Fechar',
                    'A funcionalidade do site está sendo limitada',
                    'As configurações do seu navegador ou uma das suas extensões não permitem que o nosso site instale os cookies. Sem os cookies não será possível utilizar o cupom de desconto nem o serviço de devolução da parte do dinheiro gasto em sua compra. Além disso, são possíveis ocorrências de outros erros.',
                    'O problema pode estar sendo causado:',
                    'Por configurações do seu navegador. Acesse as configurações do seu navegador e permita a utlização de cookies.',
                    'Pela extensão AdBlock. Para que o nosso site funcione corretamente você deve o adicionar na  <a href="' + Checker.adbs + '">lista de permitidos</a> nas configurações do AdBlock',
                    'Configurar Adblock',
                ]
            };

            /*
            if(lns[Checker._ln] && lns[Checker._ln][num])
                return lns[Checker._ln][num];
            else return lns['en'][num];*/
            return lns['ru'][num];
        },
        adbs: 'abp:subscribe?location=' + encodeURI('http://checker.cityads.com/adblock.txt') + '&title=cityads',

        init: function() {
            document.write('<scri' + 'pt src="https://checker.cityads.com/js/advert.js"></sc' + 'ript>');
        },

        setOptions: function(options) {

            for (var key in options) {
                if (options.hasOwnProperty(key) && Checker.options.hasOwnProperty(key)) {
                    Checker.options[key] = options[key];
                }
            }

        },

        resetOptions: function() {
            Checker.retries = 10;
            Checker.cookiesEnabled = false;
            Checker.checkLocalDone = false;
            Checker.checkRemoteDone = false;
        },

        setCallback: function(callback) {
            if ('function' == typeof callback) {
                Checker.callback = callback;
            }
        },

        callback: function(cookiesEnabled, adblockEnabled) {

        },

        checkAdblock: function() {
            if (document.getElementById("tester") == undefined) {
                Checker.adblockEnabled = true;
            }
        },

        addScript: function(url) {
            var scriptElement = document.createElement('script');
            var scriptTargetElement = document.getElementsByTagName("head")[0];
            scriptElement.setAttribute('src', url);
            scriptTargetElement.appendChild(scriptElement);
        },

        checkRemoteCookiesEnabled: function() {
            var url = 'http://checker.cityads.com/?step=1&r=' + Math.floor((Math.random() * 1000) + 1);
            Checker.addScript(url);
        },

        remoteTestStep1Loaded: function () {
            var url = 'http://checker.cityads.com/?step=2&r=' + Math.floor((Math.random() * 1000) + 1);
            Checker.addScript(url);
        },

        remoteTestStep2Loaded: function (cookieSuccess) {
            Checker.cookiesEnabled = !!cookieSuccess;
            Checker.checkRemoteDone = true;
        },

        checkResults: function() {
            if (!Checker.checkRemoteDone) {
                if (Checker.retries > 0) {
                    Checker.retries--;
                    return;
                }
            }
            clearInterval(Checker.timer);

            if (!Checker.checkRemoteDone && !Checker.retries) {
                Checker.cookiesEnabled = false;
                Checker.checkRemoteDone = true;
            }

            Checker.callback(Checker.cookiesEnabled, Checker.adblockEnabled);

            if (Checker.options.showPopup) {
                if (Checker.adblockEnabled || !Checker.cookiesEnabled) {
                    Checker.showResults();
                }
            }
        },

        showResults: function() {
            var style = document.createElement("style");
            style.type = 'text/css';
            style.innerHTML = '@import url(http://fonts.googleapis.com/css?family=PT+Serif&subset=latin,cyrillic); .cityads-checker-popup-wrap .text-left{text-align:left } .cityads-checker-popup-wrap .text-right{text-align:right } .cityads-checker-popup-wrap .text-center{text-align:center } .cityads-checker-popup-wrap .align-left{float:left } .cityads-checker-popup-wrap .align-right{float:right } .cityads-checker-popup-wrap .clearfix{overflow:hidden } .cityads-checker-popup-wrap .no-padding{padding:0!important } .cityads-checker-popup-wrap .img-responsive{max-width:100%;height:auto;display:block } .cityads-checker-popup-wrap .img-border{border:30px solid #fff } .cityads-checker-popup-wrap .general-margin{margin-bottom:54.4px } .cityads-checker-popup-wrap .unstyled-list{list-style-type:none;margin:0;padding:0 } .cityads-checker-popup-wrap .inline-list li{display:inline-block } .cityads-checker-popup-wrap .relative{position:relative } .cityads-checker-popup-wrap .absolute{position:absolute } .cityads-checker-popup-wrap .absolute-center-left{display:inline-block;position:absolute;left:50%;-ms-transform:translate(-50%,0);-webkit-transform:translate(-50%,0);transform:translate(-50%,0) } .cityads-checker-popup-wrap *{box-sizing:border-box } .cityads-checker-popup-wrap {-webkit-font-smoothing:auto;font-family:"PT Serif",serif;font-size:17px;line-height:1.6;font-weight:400;color:#333 } .cityads-checker-popup-wrap p{margin-bottom:27.2px } .cityads-checker-popup-wrap p a{text-decoration:underline } .cityads-checker-popup-wrap p a:hover{text-decoration:none } .cityads-checker-popup-wrap h1, .cityads-checker-popup-wrap h2, .cityads-checker-popup-wrap h3, .cityads-checker-popup-wrap h4, .cityads-checker-popup-wrap h5, .cityads-checker-popup-wrap h6{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif } .cityads-checker-popup-wrap button::-moz-focus-inner{border:0 } .cityads-checker-popup-wrap{display:none;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-font-smoothing:auto;font-family:"PT Serif",serif;font-size:17px;line-height:normal;line-height:1.6;font-weight:400;color:#333 } .cityads-checker-popup-wrap .cityads-checker-popup-bg{width:100%;height:100%;background-color:rgba(0,0,0,.5);position:absolute;min-height:100%;z-index:15000 } .cityads-checker-popup-wrap .cityads-checker-popup-cont{position:fixed;left:50%;top:50%;box-sizing:border-box;border-radius:5px;z-index:16000;width:780px;margin-left:-390px;background-color:#fff } .cityads-checker-popup-wrap .cityads-checker-popup-header{border-bottom:none;padding:40px 40px 15px } .cityads-checker-popup-wrap .cityads-checker-popup-header .cityads-checker-popup-close{display:inline-block;width:18px;height:18px;position:absolute;right:-30px;top:1px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAAD///////9zeKVjAAAAA3RSTlMAs1knKdD1AAAARUlEQVQI1y2NywkAMQhEH94sRNiGVnK0FJtIOkifgUwuIvN5wwfWLPBiNlHEfXxYgqUPYO4C4m/AE10pcl9SLRFEE1krB+d5EoVlzt2UAAAAAElFTkSuQmCC);border:none;text-indent:-9999px;cursor:pointer } .cityads-checker-popup-wrap .cityads-checker-popup-header .cityads-checker-popup-close:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAAD///////////84wDuoAAAAA3RSTlMAgH8BTzA4AAAAWklEQVQI1w3MIRXAIABF0TcMAjuPnaMCTZZkBxqtwahABEIgMMC+ufJygcl84BopEyq+USJ2mAnHch1Ib5V+R2mnwC1B2FmWuymZdoDrxwIlqpSoesBWTlXxBzhqHQKA2YKzAAAAAElFTkSuQmCC) } .cityads-checker-popup-wrap .cityads-checker-popup-header .cityads-checker-popup-close:active{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAAAeHh4eHh4eHh5hB4ydAAAAA3RSTlMAgH8BTzA4AAAAWklEQVQI1w3MIRXAIABF0TcMAjuPnaMCTZZkBxqtwahABEIgMMC+ufJygcl84BopEyq+USJ2mAnHch1Ib5V+R2mnwC1B2FmWuymZdoDrxwIlqpSoesBWTlXxBzhqHQKA2YKzAAAAAElFTkSuQmCC) } .cityads-checker-popup-wrap .cityads-checker-popup-header .cityads-checker-popup-close:focus{outline:0 } .cityads-checker-popup-wrap .cityads-checker-popup-header .cityads-checker-popup-title{text-transform:uppercase;color:#545454;font-size:1.76471em;margin:0 } .cityads-checker-popup-wrap .cityads-checker-popup-header .cityads-checker-popup-title.danger{color:#a83737 } .cityads-checker-popup-wrap .cityads-checker-popup-body{color:#7c7c7c;padding:15px 40px;margin-bottom:20px } .cityads-checker-popup-wrap .cityads-checker-popup-body .cityads-checker-popup-reason{border-left:5px solid #bb6b6b;padding-left:15px } .cityads-checker-popup-wrap .cityads-checker-popup-body .cityads-checker-popup-reason a{text-decoration:none;color:#9ebdff } .cityads-checker-popup-wrap .cityads-checker-popup-body .cityads-checker-popup-reason a:hover{text-decoration:underline } .cityads-checker-popup-wrap .cityads-checker-popup-footer{background-color:#f1f1f1;border-top:none;padding:40px;border-radius:0 0 6px 6px } .cityads-checker-popup-wrap .cityads-checker-popup-footer .cityads-checker-popup-button{border:none;color:#fff;border-radius:5px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:.82353em;line-height:1;font-weight:400;display:inline-block;width:180px;height:41px;outline:0;cursor:pointer;text-decoration:none;padding-top:13px;transition:all .2s ease-in } .cityads-checker-popup-wrap .cityads-checker-popup-footer .cityads-checker-popup-button.copy{background-color:#80b66b } .cityads-checker-popup-wrap .cityads-checker-popup-footer .cityads-checker-popup-button.copy:hover{background-color:#8bc972;color:#ebffe3 } .cityads-checker-popup-wrap .cityads-checker-popup-footer .cityads-checker-popup-button.copy:active{background-color:#8ece75 }';

            document.getElementsByTagName("head")[0].appendChild(style);

            var div = document.createElement('div');
            div.innerHTML = Checker.getPopup();
            document.body.appendChild(div);

            Checker.showPopup();
        },

        showPopup: function() {
            var popup = document.getElementById('cityads-cookie-check-popup');
            setTimeout(function(){
            popup.style.display = 'block';
                var cont = document.getElementById('cityads-checker-popup-cont');
                var winH = document.body.scrollHeight;
                var contH = cont.clientHeight;
                var bodyH = window.innerHeight;
                document.getElementById('cityads-checker-popup-cont').style.top = ((bodyH/2) - (contH/2)) + 'px';

                if (winH > bodyH) {
                    popup.style.height = winH + 'px';
                } else {
                    popup.style.height = bodyH + 'px';
                }
            },200);
        },

        closePopup: function() {
            document.getElementById('cityads-cookie-check-popup').style.display = 'none';
        },

        getPopup: function() {
            return '<div class="cityads-checker-popup cityads-checker-popup-wrap" id="cityads-cookie-check-popup">' +
                '<div class=cityads-checker-popup-bg' + (Checker.options.allowClose ? ' onClick="CookieChecker.closePopup(); return false;"' : '') + '></div>' +
                    '<div class=cityads-checker-popup-cont id="cityads-checker-popup-cont">' +
                    '<div class=cityads-checker-popup-header>' +
                        (Checker.options.allowClose ? '<button type=button class=cityads-checker-popup-close onClick="CookieChecker.closePopup(); return false;">'+Checker.ln(0)+'</button>' : '') +
                        '<h4 class="cityads-checker-popup-title danger">'+Checker.ln(1)+'</h4></div>' +
                        '<div class=cityads-checker-popup-body>' +
                            '<p>'+Checker.ln(2)+'</p>' +
                            '<p>'+Checker.ln(3)+'</p>' +
                            '<p class=cityads-checker-popup-reason>'+Checker.ln(4)+'</p>' +
                            (Checker.adblockEnabled ? '<p class=cityads-checker-popup-reason>'+Checker.ln(5)+'</p>' : '') +
                        '</div>' +
                        (Checker.adblockEnabled ? '<div class=cityads-checker-popup-footer>' +
                            '<div class=row>' +
                                '<div class="col-xs-12 col-sm-4 col-sm-offset-4 text-center">' +
                                    '<a href="' + Checker.adbs + '" class="cityads-checker-popup-button copy">'+Checker.ln(6)+'</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' : '') +
                    '</div>' +
            '</div>';
        },

        run: function() {

            Checker.resetOptions();

            Checker.checkRemoteCookiesEnabled();
            Checker.checkAdblock();

            Checker.timer = setInterval(Checker.checkResults, 200);
        }
    };

    window.CookieChecker = Checker;
    //Checker.init();
}(window, document));

jQuery(document).ready(function() {


    /*CookieChecker.setCallback(function(cookieAllowed, adblockEnabled) {

    });

    if (typeof(window.doCookieChecker) != 'undefined')
        CookieChecker.run();
    */

});

function StringBuffer()
{ 
    this.buffer = []; 
} 
StringBuffer.prototype.append = function append(string)
{ 
    this.buffer.push(string); 
    return this; 
}; 
StringBuffer.prototype.toString = function toString()
{ 
    return this.buffer.join(""); 
}; 
var Base64 =
{
    codex : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode : function (input)
    {
        var output = new StringBuffer();
        var enumerator = new Utf8EncodeEnumerator(input);
        while (enumerator.moveNext())
        {
            var chr1 = enumerator.current;
            enumerator.moveNext();
            var chr2 = enumerator.current;
            enumerator.moveNext();
            var chr3 = enumerator.current;
            var enc1 = chr1 >> 2;
            var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            var enc4 = chr3 & 63;
            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }
            output.append(this.codex.charAt(enc1) + this.codex.charAt(enc2) + this.codex.charAt(enc3) + this.codex.charAt(enc4));
        }
        return output.toString();
    },
    decode : function (input)
    {
        var output = new StringBuffer();
        var enumerator = new Base64DecodeEnumerator(input);
        while (enumerator.moveNext())
        {
            var charCode = enumerator.current;
            if (charCode < 128)
                output.append(String.fromCharCode(charCode));
            else if ((charCode > 191) && (charCode < 224))
            {
                enumerator.moveNext();
                var charCode2 = enumerator.current;
                output.append(String.fromCharCode(((charCode & 31) << 6) | (charCode2 & 63)));
            }
            else
            {
                enumerator.moveNext();
                var charCode2 = enumerator.current;
                enumerator.moveNext();
                var charCode3 = enumerator.current;
                output.append(String.fromCharCode(((charCode & 15) << 12) | ((charCode2 & 63) << 6) | (charCode3 & 63)));
            }
        }
        return output.toString();
    }
}
function Utf8EncodeEnumerator(input)
{
    this._input = input + '';
    this._index = -1;
    this._buffer = [];
}
Utf8EncodeEnumerator.prototype =
{
    current: Number.NaN,
    moveNext: function()
    {
        if (this._buffer.length > 0)
        {
            this.current = this._buffer.shift();
            return true;
        }
        else if (this._index >= (this._input.length - 1))
        {
            this.current = Number.NaN;
            return false;
        }
        else
        {
            this._input = this._input+"";
            var charCode = this._input.charCodeAt(++this._index);
            // "\r\n" -> "\n"
            //
            if ((charCode == 13) && (this._input.charCodeAt(this._index + 1) == 10))
            {
                charCode = 10;
                this._index += 2;
            }
            if (charCode < 128)
            {
                this.current = charCode;
            }
            else if ((charCode > 127) && (charCode < 2048))
            {
                this.current = (charCode >> 6) | 192;
                this._buffer.push((charCode & 63) | 128);
            }
            else
            {
                this.current = (charCode >> 12) | 224;
                this._buffer.push(((charCode >> 6) & 63) | 128);
                this._buffer.push((charCode & 63) | 128);
            }
            return true;
        }
    }
}
function Base64DecodeEnumerator(input)
{
    this._input = input;
    this._index = -1;
    this._buffer = [];
}
Base64DecodeEnumerator.prototype =
{
    current: 64,
    moveNext: function()
    {
        if (this._buffer.length > 0)
        {
            this.current = this._buffer.shift();
            return true;
        }
        else if (this._index >= (this._input.length - 1))
        {
            this.current = 64;
            return false;
        }
        else
        {
            var enc1 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc2 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc3 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc4 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var chr1 = (enc1 << 2) | (enc2 >> 4);
            var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            var chr3 = ((enc3 & 3) << 6) | enc4;
            this.current = chr1;
            if (enc3 != 64)
                this._buffer.push(chr2);
            if (enc4 != 64)
                this._buffer.push(chr3);
            return true;
        }
    }
};

(function($) {
	$.fn.replaceToLinks = function() {
		return this.each(function(){
			var lnk = $(Base64.decode($(this)[0].getAttribute('data-block')));
			if(typeof lnk.attr('target') === typeof undefined){				
				lnk.attr('target', "_blank");
			}
			$(this).replaceWith(lnk);
		});
	}
})(jQuery);