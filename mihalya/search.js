/*
Copyright (c) 2011-2012, Delian Delchev & Atanas Tchobanov
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of Delian Delchev & Atanas Tchobanov nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

This software is using code from the following projects:

- AES implementation in JavaScript (c) Chris Veness 2005-2011 
see http://csrc.nist.gov/publications/PubsFIPS.html#197   
http://www.movable-type.co.uk/scripts/aes.html

- Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple single-byte character encoding (c) Chris Veness 2002-2011 

- PDF.js Copyright (c) 2011 Mozilla Foundation
https://github.com/mozilla/pdf.js
Contributors: Andreas Gal 
                  Chris G Jones 
                  Shaon Barman 
                  Vivien Nicolas 
                  Justin D'Arcangelo 
                  Yury Delendik
                  Kalervo Kujala
                  Adil Allawi 
                  Jakob Miland
                  Artur Adib
                  Brendan Dahl

- Base64Binary Copyright (c) 2011, Daniel Guerrero
*/

 
	var user;
	var pass;
	var nonce;
	var pass2;
	var baski = new Object();
	var basket = new Object();
	var publi = new Object();
	var editpng = "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAA3NCSVQICAjb4U/gAAABUFBMVEX////3///39//v9///7+/37+/v7/fn7/fe7///573n5/fv5+fe5+/W5/f33sb/3qX33r3e3u/W3uf/1pzv1r3e1t7W1t7O1uf/1kLO1t7/zozG1t73zoT/zlLOzt7Oztb/zjnGzt7Gztb/ziH/zhD/xlLGxta9xt69xtb/xhC9xsa9xs7/xgDWvbX3vTH3vSG1vb21vcb/tSnOta3Gtb3/tQj/tQD3tRC9tb2ttbX/rRittb3erVq9ra29rbWtrb2lrb3/pQClrbWtpaWlpbX/nAicpaW1nJz3lCmcnK2UnK2UnKX/jAj/jAD3hDnWhFLGhHu9hITGhGvehBj3exi9hGOEjKV7jKW1e3PeczGEhIx7hJSce4R7hIz/awCtc2PWayl7e4x7e4Slc1pze3u9azn/WgDvWghrc3vGWjFra3vnQgDeQgCtSimEUkL/AP/EQcPCAAAAcHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8At2Fi0gAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAsdEVYdENyZWF0aW9uIFRpbWUARnJpIDIzIEp1bCAyMDA0IDIwOjE0OjA0IC0wMDAw128ueAAAAM9JREFUGJVjyMcADFiF1CSBQFHDOdg/3gIqJMYABIzMNjpGfhFQIUmQEAO3uWNcjjuKkIyZb1pumCGSEIu+mW92TLg3khC/mWNcproXspCejmt6IC+yEKemqU+CHI9DVL42TEhVxSokgIPLIUXbUgvsLkY+BWWjSFFBIc8MLUtriJCArIRHkLiamneGlrUBREhEWCrVTlpD0jtDWwvqId3kUFtJJQ1JlyS4H43zTITkJcXYnbzhQqysjExsTMxM9lAh68TY2OjYRBDIcgMKAQCzJVHpRUMajAAAAABJRU5ErkJggg==";
	var tickpng = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAqFBMVEVMnwm71qWDwFLU1NSfv4RjsyDC8J3l5eWs537FxsVWswySz2De7tBrtS/h79VXrBHS6cDq99+y1pahz31fwRCGuV3MzMxnuyTN5riM11BQpgrv+uXF3bFcwQx2tkLQ4cPc3Nzv7++ZyXK56pFbtRKIvlxUrwqBxkmo14PB36ni9dNcrxmU1lL1+fFXtwtsxSW/0rDf98xwuDXV8b6mzoRhwhNUpRKLwGDgG7+sAAAAOHRSTlP///////////////////////////////////////////////////////////8A/////////////wxlbe0AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAf0lEQVQYlWPQRQMMaHxDNAFlNlQBYxVpFAEtbW4UMwRZzQSRBfhYGTRAtghIQ/gS2lJGYGs1eflAfGE1NX4eiDu0uZhMlFj19PSEoA6TERcXAQJ9VbhLGdV1JCUl5ZCcLm/OwcHEh+wXRRZRA4TnFNkVmMU4OcWYFdgVMX2rCwCUkSbn8tcLPAAAAABJRU5ErkJggg==";
	var publishxpng= "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAALHRFWHRDcmVhdGlvbiBUaW1lAEZyaSAyNiBTZXAgMjAwMyAwODo0MTo0MCAtMDAwMGcWLAkAAAAHdElNRQfTCRoHKh1j6KffAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAHhQTFRF////xs7Oxq21vXt7xr29xq2tzlpC3ikIxlpSxrW1xkpS3gAAxoR75zkI/0oQxlJS/wAA70IQxkJC7wgA7yEA/yEA5wAAzlJC70oY/2Mhxr21zmtS72Mp/3s51mta73M5/5xa1ox773Mx/7Vz5ykIxrWt3nta1mtSK1AQzwAAAAF0Uk5TAEDm2GYAAAB7SURBVHjaJY7tFoIgEEQHWYgPESMrUousrPd/wxbdXzPn3LlnIdaFwEetEli/5TcC1gStsLzeZSIyOX8k6FGes74euxAZH6f5njk7u011vnUhbRoQM92wF2uYGc6XyBjVnNKp9yxoQ/VQ9L2XUPpgKuC8UxCN3N+RjfgDbwsGzDrn/yYAAAAASUVORK5CYII=";
	var ajaxloader="R0lGODlhIAAgAPMAAP///wAAAMbGxoSEhLa2tpqamjY2NlZWVtjY2OTk5Ly8vB4eHgQEBAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==";
	var picturepng ="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGYUExURZas0JWr0O/z9+bu9sfS45+75+fu9pqw0puw0PD0+NGfVNOfVOzz952y0Ze14+jw9mOWPJ6y0uvv8ovCWYG+Uu3x9+zx9+3v8e7z94aORPH0+Hqf1/Dz95jJZYip3ZKz0KHMk47CcYGk2p255oe7YYu7g3Odw4C2o6rRhIfAVuvy95HGXe/094q9ZXqqTufv9Xq6T4eLQai408nInO/z+MvV5GmemvL193ura46u4HyweH+zoajSdJWrz5mv0MXTr8PZuqfQgpSrz4e3uOnv8ous3vD093iqn+3y95DFXmWYPp6y0YKmx+bt9snU5GqWo/D195O20ZTCi32i2fP09IC+U4fBWIeyb/Lz9Jm35KK104C1qZfIY2STka+GP5vLZ4/FY6DNfX+9WI200KbQgunw9+vs7JW044e9bO3x9vHz95PCiHSmSn68UneoTNGvbpp7NWeaQJu45X2ixV+SjObt92qZpYeztoCDVqG96LLB2qe503ed1naCXqHLk5jJal6QiYSn3Jqw0ZWs0PT195mv0cLcv////9erUeAAAACIdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAYt9YPAAAAx0lEQVR42mJoRwMM7aZGHM0gwAgEdixAgeq0kBYo4HHxBgpwRKQnRytopASZqdVosQMFGFr4nOts4mPqVcukU8EC5pHqjrLawmGKJcH8TSCBgCLrRE9NkdyMBiV9sICOcnl2QqhBkpV/IxtYQII10D1cV8UitlgOLNDsUckqXytpWOFj6coMFhDTy8sp4OaKK/QSAAs4iba1tdkb5zsAKd9WoIBtZhsclIIEosSzpDjdZJiAwERIECjgV9XUCgO8IM+hAYAAAwD8SFpupCeivAAAAABJRU5ErkJggg==";
	var audiopng ="iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAL3RFWHRDcmVhdGlvbiBUaW1lAGpldS4gMTYgamFudi4gMjAwMyAxMzowNjoxOCArMDEwMMvW/rYAAAAHdElNRQfTARAMBykx7k3BAAAACXBIWXMAABGvAAARrwH3/UuEAAAABGdBTUEAALGPC/xhBQAAADBQTFRF////9/f/5+f/Xl56UFDDV1fx5uZzr69TFhZ79/djoqK34uJe5+dS//+MBQUNnp7uspz8egAAAAF0Uk5TAEDm2GYAAABbSURBVHjaY2BgYGAKFWAAga/THMD0r51gmt89u16QgWGVhfvpqwoMXO9egGlm8+b201MFGdjfPWnfM1WBQQoqDlTnDaYZmNorS0H6hcLTIOappgWAKEYhEwYGAKeMHVkYe3D1AAAAAElFTkSuQmCC";
	
	var pdfpng = "R0lGODlhEgASANUAAHEVDenS16qChv/9/t3W3vcAAP/X2P/l5PXs7rlkZt6IiPvKy/Pv8MnFzf/09bRVWfssL+/v8trY3NvX4DcqAOkCAkEzA/+mp8BhYh0QALdKVHl2etMBBF8aHzIwM+/v7f4QDvX2+MmztP8dKHwxALm2vf/n6v7q7Ojh4OO6wlEhIW8rKv/3+Nq+vcpeXvOHhyITAI2LjqhlaPoQG7qYmvLt8////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAASABIAQAa2QJtwSCwabbeahHDAHBAISSOSKd4sWIqFQsl4MzChBjICFc4VDmAzGNg8xpvtkGihQjZEQ3CoEmM1gYIbEnBEJAAAHYsdiSonDQ0lDX5DSQwsCgsvFyYGASaVQjcCNCwfEUsEBA0TojYxsbKyRxq2t7YrbAMWRGMzZmhqG8TEvURJghiBExOtr0kENQsPIiwIqVRWNQwoGBcXLgkyNAPQNQkK1xERDAEpC9AODgeoEausrkf7REEAOw==";
	
//Object keys emulator for Firefox < 4.x

	if (typeof JSON == 'undefined') {
    JSON = {};
    
    JSON.stringify = function (ref) {
        var s = '';
        Traverse(ref).forEach(function to_s (node) {
            if (node instanceof Array) {
                this.before(function () { s += '[' });
                this.post(function (child) {
                    if (!child.isLast) s += ',';
                });
                this.after(function () { s += ']' });
            }
            else if (typeof node == 'object') {
                this.before(function () { s += '{' });
                this.pre(function (x, key) {
                    to_s(key);
                    s += ':';
                });
                this.post(function (child) {
                    if (!child.isLast) s += ',';
                });
                this.after(function () { s += '}' });
            }
            else if (typeof node == 'string') {
                s += '"' + node.toString().replace(/"/g, '\\"') + '"';
            }
            else if (typeof node == 'function') {
                s += 'null';
            }
            else {
                s += node.toString();
            }
        });
        return s;
    };
    
    JSON.parse = function (s) {
        return eval('(' + s + ')'); // meh, I'm lazy
    };
}

if (!Object.keys) Object.keys = function (obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            keys.push(key);
    }
    return keys;
};

if (typeof Object.create === 'undefined') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

if (!Array.prototype.forEach) Array.prototype.forEach = function (f, to) {
    for (var i = 0; i < this.length; i++) {
        f.call(to, this[i], i, this);
    }
};

if (!Array.isArray) Array.isArray = function (ref) {
    return Object.prototype.toString.call(ref) === '[object Array]';
};

if (!Array.prototype.some) Array.prototype.some = function (f, to) {
    for (var i = 0; i < this.length; i++) {
        if (f.call(to, this[i], i, this)) return true;
    }
    return false;
};

if (!Array.prototype.every) Array.prototype.every = function (f, to) {
    for (var i = 0; i < this.length; i++) {
        if (!f.call(to, this[i], i, this)) return false;
    }
    return true;
};

if (!Array.prototype.indexOf) Array.prototype.indexOf = function (x) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === x) return i;
    }
    return -1;
};

//End object.keys emulator for Firefox < 4.x

	function checkuser() {
	
		var f=document.getElementById("author");

		// Check is the user/pass correct
		user = f.name.value;
		pass = f.pass.value;
		var ubase = Base64.encode(user);
		
		if (!lstr(ubase)) return 0;
		
		var s = localStorage[ubase];
		var x = Base64.decode(s);
		var d = Aes.Ctr.decrypt(s,pass,256);
		pass2 = pass + user;
		pass2 = pass2.substr(0,32);
		
		nonce = x.substr(0,8);
		
		return (d==user)?1:0;
	}

	function validate () {
		var e=document.getElementById("mylogin");
		e.style.display="none";
	//	if (localStorage["wiki_status"] !== "OK")
	//		e=document.getElementById("reload");
	//	else {
			if (checkuser())
				e=document.getElementById("search")
			else
				e=document.getElementById("mylogin");
	//	}
		e.style.display="block";
	}
	
	function reldb() {
		var e;
		e=document.getElementById("search");e.style.display="none";
		e=document.getElementById("mylogin");e.style.display="block";
	//	e=document.getElementById("reload");e.style.display="none";
	}
	
	function cledb() {
		localStorage.clear(); return reldb();
	}
	
	function reloaddata() {
		var e = document.getElementById("dbname");
		var dbname = e.dbd.options[e.dbd.selectedIndex].value;
		e = document.getElementById("jurkane");
		e.innerHTML = "<H1>Please wait until the database is loaded</H1>";
		localStorage.clear();
		if (reloadb(dbname)) {
			localStorage["wiki_status"] = "OK";
			e.innerHTML = "";
			
			e = document.getElementById("reload");
			e.style.display = "none";
			e = document.getElementById("search");
			e.style.display="block";

			// Lets check for the users
			if (checkuser()==0) {
				e.style.display="none";
				e = document.getElementById("mylogin");
				e.style.display="block";
			}

		} else {
			localStorage.clear();
			e.innerHTML = "";
			e = document.getElementById("reload"); e.style.display="none";
			e = document.getElementById("error"); e.style.display="block";
		}
	}
	
	function reloadb(file) {
		localStorage.clear(); // Clear the whole local storage
		var req = new XMLHttpRequest();
		req.open('GET',file,false);
		req.send(null);
		if (req.status==200 || req.status==0) {
			var x = req.responseXML.documentElement;
			
			// Read the files
			var f = x.getElementsByTagName("data");
			var i; 
			for (i=0;i<f.length;i++) {
				// xxx
				try {
				  var mykey = f[i].getElementsByTagName("key")[0].textContent;
				  var myval = f[i].getElementsByTagName("value")[0].textContent;
				  localStorage[mykey]=myval;
				} catch(e) {};
			}
			return 1;
		}
		return 0;
	}
	
//Import data functions
	function showimport() {
		var x = document.getElementById("import");
		x.style.display="block";
	}
	
	function loadimport() {
			var x = document.getElementById("vimport");
			var y = document.getElementById("bimport");
			// Read the values
			var f = x.value.getElementsByTagName("data");
			var b = y.value;
			var i; 
			for (i=0;i<f.length;i++) {
				// xxx
				try {
				  var mykey = f[i].getElementsByTagName("key")[0].textContent;
				  var myval = f[i].getElementsByTagName("value")[0].textContent;
				  localStorage[mykey]=myval;
				  
				} catch(e) {};
			}
			var i = document.getElementById("import");
			i.innerHTML="Imported "+f.lenght+" records";
			return 1;
	}
	
	
//End import functions

	function init() {

		// test for storage object
		if (localStorage == undefined) {
			var e=document.getElementById("nohtml5");
			e.style.display="block";
		} else {
			// Request for user/pass
			var e=document.getElementById("mylogin");
			e.style.display="block";
			loadbasket();
		}
	
	}
	
	function dhs(w) {
		return Aes.Ctr.encrypt(w,pass2,256,nonce);
	}
	
	function myhash(w) {
		
		return w.toLowerCase().match(/^.{2,15}/)[0];
		//return  w.toLowerCase().match(/^(\w|[\x80-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}){2,15}/)[0];
	}
	
	function crossset(w,s) {
		var a = Array();
		for (var i = 0; i<s.length; i++) // xxx
		  for (var j = 0; j<w.length; j++) // xxx
		    if (w[j]==s[i]) a.push(w[j]);
		return a;
	}
	
	function setextr(w) {
		var d = dhs(w+".idx");
		if (lstr(d)) { 
			var s = Aes.Ctr.decrypt(localStorage[d],pass2,256);
			return s.split(",")
		}
		else
			return Array();
	}
	
	function srch(w) {
		var i;
		var zl = w.length;
		for (i = 0; i<w.length; i++) {
			if (w[i].length<3) { w.splice(i--,1); continue; } // xxx
			w[i] = myhash(w[i]);
		}
		// if (zl>0 && w.length<1) return Array(); // xxxx
		if (w.length==0) return setextr("");
		var myset = setextr(w[0]);
		for (i = 1; i<w.length; i++) //
			myset = crossset(myset,setextr(w[i]));
		return myset;
	}

//Basket functions	
	function loadbaski(b) {
		baski[b] = new Object();
		var s = new Array();
		if (localStorage['baski.'+b]) 
			s = localStorage['baski.'+b].split(',');
		for (var i = 0; i<s.length; i++) //
			baski[b][s[i]]=1;
		return false;
	}
	
	function savebaski(b) {
		var s = Object.keys(baski[b]);
		localStorage['baski.'+b] = s.join(",");
		return false;
	}
	
	function checkbaski(b,id) {
		if (baski == undefined)
			loadbaski(b);
		return baski[b][id];
	}
	
	function addtobaski(b,id) {
		if (baski == undefined) loadbaski(b);
		baski[b][id]=1;
		savebaski(b);
	}
	
	function removefrombaski(b,id) {
		if (baski == undefined) loadbaski(b);
		delete(baski[b][id]);
		savebaski(b);
	}
	
	function togglebaski(t,b,id) {
		loadbaski(b);
		if (baski[b][id]) {
			removefrombaski(b,id)
			t.innerHTML = b+": <b><img src='data:image/png;base64,"+publishxpng+"' border=0></b>";
		}
		else {
			addtobaski(b,id);
			t.innerHTML = b+": <b><img src='data:image/png;base64,"+tickpng+"' border=0></b>";
		}
		return false;
	}
	
	//Baskets names
	
	function addbasket() {
		var e = document.getElementById("nbasket");
		var nb = e.value;
		if (baskets == undefined) loadbasket();
		baskets[nb]=1;
		savebasket();
	}
	
	function loadbasket() {
		baskets = new Object();
		var s = new Array();
		if (localStorage['basket']) 
			s = localStorage['basket'].split(',');
		for (var i = 0; i<s.length; i++) //
			baskets[s[i]]=1;
		var e = document.getElementById("lbaskets");
		loadbaski("edited");
		loadbaski("ready");
		var output = "<span align='left'>Edited</span><span align='right'> [<a href='#' onclick='mysearch(0,20,\"edited\")'>View</a>] [<a href='#' onclick='myexport(\"edited\")'>Export</a>]</span><BR><span align='left'>Ready</span><span align='right'> [<a href='#' onclick='mysearch(0,20,\"ready\")'>View</a>] [<a href='#' onclick='myexport(\"ready\")'>Export</a>]</span>&nbsp;";
		for (property in baskets) {
  			output += "<BR><span align='left'>"+property + "</span><span align='right'> [<a href='#' onclick='mysearch(0,20,\""+property+"\")'>View</a>] [<a href='#' onclick='myexport(\""+property+"\")'>Raw</a>] [<a href='#' onClick='removebasket(\"" + property + "\")'>Delete <img src='data:image/png;base64," + publishxpng + "' border=0></a>]&nbsp;</span>";
  			loadbaski(property);
		}
		e.innerHTML = output;
		return false;
	}
	
	function savebasket() {
		var s = Object.keys(baskets);
		localStorage['basket'] = s.join(",");
		loadbasket();
		return false;
	}
	
	function removebasket(b) {
		if (baskets == undefined) loadbasket();
		delete(baskets[b]);
		savebasket();
	}
	
// End basket functions

	function showid(id) {
		var e = document.getElementById("results");
		var a = document.getElementById("attachments");
		var m = document.getElementById("media");
		m.innerHTML="";
				if(baski["edited"][id]){
					if(baski["ready"][id]) 
						var isready = " (Ready)";
					else
						var isready = " (Not Ready)";
					var s = "<a href='#' onClick='editid("+id+")'><img src='data:image/png;base64,"+editpng+"' border=0> Edited"+isready+"</a> ::: ";
				} else {
					var s = "<a href='#' onClick='editid("+id+")'><img src='data:image/png;base64,"+editpng+"' border=0> Edit</a> ::: ";
				}
				for (property in baskets) {
				if (baski[property][id]) {
					s += "<a name='"+id+"'><a href='#"+id+"' onClick='togglebaski(this,\""+property+"\",\""+id+"\")'>"+property+": <b><img src='data:image/png;base64,"+tickpng+"' border=0></b></a> ::: ";
				} else {
					s += "<a name='"+id+"'><a href='#"+id+"' onClick='togglebaski(this,\""+property+"\",\""+id+"\")'>"+property+":<b><img src='data:image/png;base64,"+publishxpng+"' border=0></b></a> ::: ";
				}
				}
				var ms = "";
				ipp = trd(id+".attachcount");
				ipp++;
				for (ip=0; ip<=ipp; ip++) {
					
//					if(trd(id + ".attachname." + ip)) {
					
					if(trd(id + ".attachtype." + ip)=="pdf") { //pdf
					var xid = dhs(id + ".attachdata." + ip);
					var file = s2h(xid);
					var dir = file.substr(-3,3);
					var fn = dir + "/file" + file + ".txt";
					var fn = "/" + dir + "/file" + file + ".txt";
					ms += "<A HREF='#" + id + ip + "' onClick='showpdf(\"" + id + "\",\"" + ip + "\");return false;' CLASS='"+ ((localStorage["beenhere."+id+ip])?"been":"notbeen") + "'><img src='data:image/gif;base64,"+pdfpng+"' border=0>";
					ms += trd(id + ".attachname." + ip);
					ms += "</A><BR>";
					
					} else {
					ms += "<A HREF='#" + id + ip + "' onClick='document.getElementById(\"media\").innerHTML=\"\";showmedia(\"" + id + "\",\"" + ip + "\");return false;' CLASS='"+ ((localStorage["beenhere."+id+ip])?"been":"notbeen") + "'>";
					
					if(trd(id + ".attachtype." + ip)=="png" || trd(id + ".attachtype." + ip)=="jpg")
						ms += "<img src='data:image/png;base64," + picturepng + "' border=0> ";
					
					if(trd(id + ".attachtype." + ip)=="mp3" || trd(id + ".attachtype." + ip)=="ogg")
						ms +="<img src='data:image/png;base64,"+audiopng+"' border=0> ";
					
					ms += trd(id + ".attachname." + ip);
					ms += "</A><BR>";
					} //not pdf
//					}
				}
			
			e.innerHTML = "<H1>" +  trd(id+".subj") + "</H1><HR><B>REFID:</B> " + trd(id+".refid")
					+ " <B>DATE:</B> " + trd(id+".date")
					+ " <B>ORIGIN:</B> " + trd(id+".origin")
					+ " <B>CLASS:</B> " + trd(id+".class")
					+ " <B>DEST:</B> " + trd(id+".dest")
					+ " <BR><B>SUBJECT:</B> " + trd(id+".subj");
					
			e.innerHTML = "<BR><B>TEXT:</B> <PRE>" + trd(id + ".data") +"</PRE><BR>"+s+"<HR>";	
			
			a.innerHTML = " <BR>" + ms;
			
			localStorage["beenhere."+id] = 1;
		return false;
	}
	
	function showmedia(id,ip) {
		var e = document.getElementById("media");
		if(trd(id + ".attachtype." + ip)=="jpg" || trd(id + ".attachtype." + ip)=="png"){
			if(trd(id + ".attachname." + ip)){
				e.innerHTML = "<P>" + trd(id + ".attachname." + ip)+ "</P><P><img width=800 src=\"data:image/png;base64,"  + trdm(id + ".attachdata." + ip) + "\"><P>";
				//g.document.write('<html>' + trd(id + ".attachname." + ip) + '<P><img width="800" src="data:image/jpg;base64,' + trdm(id + ".attachdata." + ip) + '"></html>');
			} else {
				e.innerHTML = '<P>' + trd(id + ".attachname." + ip) + '<P>Can\'t be found';
			}
		}
		
		if(trd(id + ".attachtype." + ip)=="mp3" || trd(id + ".attachtype." + ip)=="ogg" || trd(id + ".attachtype." + ip)=="wav"){
			if(trd(id + ".attachname." + ip)){
			if(trd(id + ".attachtype." + ip)=="ogg")
				e.innerHTML = '<P>' + trd(id + ".attachname." + ip) + '<P><audio controls="controls" autobuffer="autobuffer" autoplay="autoplay"><source src="data:audio/ogg;base64,' + trdm(id + ".attachdata." + ip) + '"/></audio>';
			if(trd(id + ".attachtype." + ip)=="mp3")
			 	e.innerHTML = '<P>' + trd(id + ".attachname." + ip) + '<P><audio controls="controls" autobuffer="autobuffer" autoplay="autoplay"><source src="data:audio/mpeg;base64,' + trdm(id + ".attachdata." + ip) + '"/></audio>';
			} else {
				e.innerHTML = '<P>' + trd(id + ".attachname." + ip) + '<P>Can\'t be found';
			}
		}
		
		localStorage["beenhere."+id+ip] = 1;
		return false;
	}
	
	function showpdf(id,ip,file) {
			if(trd(id + ".attachname." + ip)){
				var pdfdata = trdm(id + ".attachdata." + ip);
    			var databin = Base64Binary.decodeArrayBuffer(pdfdata);
    			var pdf = PDFView.load(databin);
    			s = document.getElementById("main");
    			s.style.display="none";
    			v = document.getElementById("view");
    			v.style.display="block";
      	
  			//	var page = pdf.getPage(1);
 			//	var scale = 1;
  	// Prepare canvas using PDF page dimensions
  			//	var context = canvas.getContext('2d');
  			//	canvas.height = page.height * scale;
  			//	canvas.width = page.width * scale;
  				// Render PDF page into canvas context
  			//	page.startRendering(context);
			} else {
				canvas.innerHTML = '<P>' + trd(id + ".attachname." + ip) + '<P>Can\'t be found';
			}
	}
	
	function editid(id) {
		var e = document.getElementById("results");
		if(localStorage[dhs(id + ".dataed")]) {
			var toedit= trd(id + ".dataed");
		} else {
			var toedit= trd(id + ".data");
		}
		
				if(baski["edited"][id]){
					if(baski["ready"][id]) 
						var isready = " (Ready)";
					else
						var isready = " (Not Ready)";
					var s = "<a href='#' onClick='editid("+id+")'><img src='data:image/png;base64,"+editpng+"' border=0> Edited"+isready+"</a> ::: ";
				} else {
					var s = "<a href='#' onClick='editid("+id+")'><img src='data:image/png;base64,"+editpng+"' border=0> Edit</a> ::: ";
				}
				for (property in baskets) {
				if (baski[property][id]) {
					s += "<a name='"+id+"'><a href='#"+id+"' onClick='togglebaski(this,\""+property+"\",\""+id+"\")'>"+property+": <b><img src='data:image/png;base64,"+tickpng+"' border=0></b></a> ::: ";
				} else {
					s += "<a name='"+id+"'><a href='#"+id+"' onClick='togglebaski(this,\""+property+"\",\""+id+"\")'>"+property+":<b><img src='data:image/png;base64,"+publishxpng+"' border=0></b></a> ::: ";
				}
				}
				
		e.innerHTML = "<form><textarea cols=80 rows=100 id='editid'>"  + toedit + "</textarea><BR><input type='button' value='Save' onclick='saveedited("+id+"); return false;' > <input type='button' value='Ready' onclick='saveedited("+id+",1); return false;'> </FORM><BR>" + s;
		return false;
	}
	
	function saveedited(id,r) {
		var e = document.getElementById("editid").value;
		localStorage[dhs(id + ".dataed")] = dhs(e);
		addtobaski("edited",id)
		if(r) {
		addtobaski("ready",id)
		showid(id);
		} else {
		editid(id);
		}
	}

//Search and show functions

	function lstr(x) {
		if (localStorage[x]) return 1;
		var file = s2h(x);
		var dir = file.substr(-3,3);
		var fn = dir + "/file" + file + ".txt";
		var r = new XMLHttpRequest();
		r.open('GET',fn,false);
		r.send(null);
		if (r.status==0 || r.status==200) {
			var z = r.responseText;
			localStorage[x] = z.replace(/\<xml\>/,"").replace(/\<\/xml\>/,"");
			if (localStorage[x]) return 1;
			return 0;
		} else return 0;
	}
	
//Show text - cached in localstorage
	function trd(id) {
		var xid = dhs(id);
		if (lstr(xid)) {
			var s = Aes.Ctr.decrypt(localStorage[xid],pass2,256);
			return s.replace(/^\s+/,"").replace(/\s+$/,"");
		}
		return "";
	}

// Show images and audio, not cached in localStorage

	function trdm(id) {
		//var e = document.getElementById("media");
		//e.innerHTML = '<img src="data:image/gif;base64,'+ajaxloader+'">';
		var xid = dhs(id);
		var file = s2h(xid);
		var dir = file.substr(-3,3);
		var fn = dir + "/file" + file + ".txt";
		var r = new XMLHttpRequest();
		r.open('GET',fn,false);
		r.send(null);
		if (r.status==0 || r.status==200) {
			var z = r.responseText;
			var zr = z.replace(/\<xml\>/,"").replace(/\<\/xml\>/,"");
			var s = Aes.Ctr.decrypt(zr,pass2,256);
			return s.replace(/^\s+/,"").replace(/\s+$/,"");
		}
		if(r.status==404){
			return "Error 404 Not Found";
		}
		return "";
	}

// Search function	
function mysearch(start,end,b) {
		
		var e = document.getElementById("srch");
		var m = document.getElementById("media");
		m.innerHTML="";
		var a = document.getElementById("attachments");
		m.innerHTML="";
		a.innerHTML="";
		var sch = e.value;
		sch = sch.replace(/^\s+/,"").replace(/\s+$/,"");
		var w = sch.split(" ");
		var idx;
		if (baski==undefined) loadbaski(b);
		if (b) {
		  idx = Object.keys(baski[b])  // Take the info from the basket
		} else if(sch){
		  idx = srch(w);
		} else {
		  idx = "";
		}
		
		baskets = new Object();
		var s = new Array();
		if (localStorage['basket']) 
			s = localStorage['basket'].split(',');
		for (var i = 0; i<s.length; i++) //
			baskets[s[i]]=1;
		
	
		e = document.getElementById("results");
		
		// Delete childrens of the old resuls
		var i;
		for (i=0;i<e.childNodes.length;i++) e.removeChild(e.childNodes[0]); // xxx
		
		
		if (idx.length<1) {
			e.innerHTML = "<H3>No documents found!</H3>";
			if(b)
			e.innerHTML += "<BR>[<a href='#' onclick='bimport(\""+b+"\")'>Import in Basket " +b +"</a>]<BR>";
		} else {
			var div;
			var step = 20;
			var startnext = start+step;
			var endnext = end+step;
			var startprev = start-step;
			var endprev = end-step;
			e.innerHTML = "Found "+idx.length+" of "+ trd(".count") + " documents"+ ((b)?" from the "+b:"") +"</H3><HR>";
			
			if(b)
			e.innerHTML += "<BR>[<a href='#' onclick='myexportbasket(\""+b+"\")'>Export Basket " +b +"</a>] [<a href='#' onclick='bimport(\""+b+"\")'>Import in Basket " +b +"</a>]<BR>";
			
			if(start>0) {
				if(startprev < 0) startprev=0; 
				var starthtml="[<a href='#' onclick='mysearch(0,"+step+",\""+b+"\")'>Start</a>]";
				var prevhtml="[<a href='#' onclick='mysearch("+startprev+","+endprev+",\""+b+"\")'><< Prev "+ startprev+"-"+start +"</a>]";
			}
			else { 
			var starthtml = "";
			var prevhtml = "";
			}
			
			if(end < idx.length) {
				if(endnext >= idx.length) endnext=idx.length;
				var endhtml="[<a href='#' onclick='mysearch("+(idx.length-step)+","+idx.length+",\""+b+"\")'>End</a>]";
				var nexthtml=" [<a href='#' onclick='mysearch("+startnext+","+endnext+",\""+b+"\")'>"+ startnext + "-" + endnext + " Next >></a>]";
			}
			else { 
				var endhtml = "";
				var nexthtml = "";
			}
			
			if(start < 0) start=0;
			if(end > idx.length) end=idx.length;
			
			var navigation ="<BR>"+starthtml+" "+prevhtml+" <B>" + start + "-" + end +"</B> " + nexthtml + " " + endhtml + "<BR><HR>";
			
			e.innerHTML += navigation;
			
			for (i=start;i<end;i++) { // xxx
				var myid = idx[i];
				if (myid<1) continue;
				if(baski["edited"][myid]){
					if(baski["ready"][myid]) 
						var isready = " (Ready)";
					else
						var isready = " (Not Ready)";
					var s = "<a href='#' onClick='editid("+myid+")'><img src='data:image/png;base64,"+editpng+"' border=0> Edited"+isready+"</a> ::: ";
				} else {
					var s = "<a href='#' onClick='editid("+myid+")'><img src='data:image/png;base64,"+editpng+"' border=0> Edit</a> ::: ";
				}
				for (property in baskets) {
				
				if (baski[property][myid]) {
					s += "<a name='"+myid+"'><a href='#"+myid+"' onClick='togglebaski(this,\""+property+"\",\""+myid+"\")'>"+property+": <b><img src='data:image/png;base64,"+tickpng+"' border=0></b></a> ::: ";
				} else {
					s += "<a name='"+myid+"'><a href='#"+myid+"' onClick='togglebaski(this,\""+property+"\",\""+myid+"\")'>"+property+":<b><img src='data:image/png;base64,"+publishxpng+"' border=0></b></a> ::: ";
				}
				}
				
				var div = document.createElement('div');
				div.innerHTML =
				" <A HREF='#" + myid +"' onClick='showid(\"" + myid + "\");return false;' CLASS='"+ ((localStorage["beenhere."+myid])?"been":"notbeen") + "'>"+(i+1)
					+ " <B>REFID:</B> " + trd(myid+".refid")
					+ " </A><B>DATE:</B> " + trd(myid+".date")
					+ " <B>ORIGIN:</B> " + trd(myid+".origin")
					+ " <B>CLASS:</B> " + trd(myid+".class")
					+ " <B>DEST:</B> " + trd(myid+".dest")
					+ " <BR><B>SUBJECT:</B> " + trd(myid+".subj")
					+ " <BR>" + s + "<HR><BR>";
				e.appendChild(div);
			}
			
			e.innerHTML += navigation;
		}	
//		alert("LEN:"+idx.length + " = " + idx);
	}
	
//Export function	
	function myexport(b,p) {
		var e = document.getElementById("srch");
		var sch = e.value;
		sch = sch.replace(/^\s+/,"").replace(/\s+$/,"");
		var w = sch.split(" ");
		var idx;
		if (baski==undefined) loadbaski(b);
		
		if(b) {
		  idx = Object.keys(baski[b])  // Take the info from the published
		} else {
		  idx = srch(w);
		}
		
		e = document.getElementById("results");
		
		// Delete childrens of the old resuls
		var i;
		for (i=0;i<e.childNodes.length;i++) e.removeChild(e.childNodes[0]); // xxx
		
		
		if (idx.length<1) {
			e.innerHTML = "<DIV><H1>No documents has found!</H1></DIV>";
		} else {
			
			var div;
			e.innerHTML = "<H3>Found "+idx.length+" of "+ trd(".count") + " documents"+ ((b)?" from the "+b:"") +"</H3>";
			for (i=0;i<idx.length;i++) { // xxx
				var myid = idx[i];
				if (myid<1) continue;

				var div = document.createElement('div');
				div.innerHTML = "<pre>" +
				 trd(myid + ".data") + '\n=======================DATA ENDS============================\n</pre>';
				e.appendChild(div);
			}
		}
//		alert("LEN:"+idx.length + " = " + idx);
	}
	
	function myexportbasket(b,p) {
		var e = document.getElementById("srch");
		var sch = e.value;
		sch = sch.replace(/^\s+/,"").replace(/\s+$/,"");
		var w = sch.split(" ");
		var idx;
		if (baski==undefined) loadbaski(b);
		
		if(b) {
		  idx = Object.keys(baski[b])  // Take the info from the published
		} else {
		  idx = srch(w);
		}
		
		e = document.getElementById("results");
		
		// Delete childrens of the old resuls
		var i;
		for (i=0;i<e.childNodes.length;i++) e.removeChild(e.childNodes[0]); // xxx
		
		
		if (idx.length<1) {
			e.innerHTML = "<DIV><H1>No documents has found!</H1></DIV>";
		} else {
			e.innerHTML = "<H3>Exporting "+idx.length+" of "+ trd(".count") + " documents"+ ((b)?" from the "+b:"") +"</H3>";
			var div = document.createElement('div');
			var out = "Copy the following text and send it for import:<BR>";
			out +='<textarea cols=50 rows=5>';
			for (i=0;i<idx.length;i++) {
				var myid = idx[i];
				if (myid<1) continue;
				out += myid + ",";
			}
			e.innerHTML += out + "</textarea>";
		}
//		alert("LEN:"+idx.length + " = " + idx);
	}

//Import in basket function	

	function myimport(b) {
		var e = document.getElementById("timport");
		s = e.value.split(',');
		loadbaski(b);
		for (var i = 0; i<s.length; i++) //
			if(!baski[b][s[i]])
				addtobaski(b,s[i]);
		mysearch(0,20,b);
	}
	
	function bimport(b) {
		e = document.getElementById("results");
		e.innerHTML = "<form id='fimport'><textarea cols=50 rows=5 id='timport'></textarea><BR><input type='button' value='Import in "+b+"' onclick='myimport(\""+b+"\"); return false;'></form>";
		
	}
	
	function d2h(d) { return d.toString(16); }
	function h2d(h) { return parseInt(h,16); }
	function s2h(s) {
		var cr = "";
		for (var i = 0; i<s.length; i++) cr = cr + d2h(s.charCodeAt(i));
		return cr;
	}
	

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript (c) Chris Veness 2005-2011                                   */ 
/*   - see http://csrc.nist.gov/publications/PubsFIPS.html#197   
- http://www.movable-type.co.uk/scripts/aes.html*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Aes = {};  // Aes namespace

/**
 * AES Cipher function: encrypt 'input' state with Rijndael algorithm
 *   applies Nr rounds (10/12/14) using key schedule w for 'add round key' stage
 *
 * @param {Number[]} input 16-byte (128-bit) input state array
 * @param {Number[][]} w   Key schedule as 2D byte-array (Nr+1 x Nb bytes)
 * @returns {Number[]}     Encrypted output state array
 */
Aes.cipher = function(input, w) {    // main Cipher function [§5.1]
  var Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

  var state = [[],[],[],[]];  // initialise 4xNb byte-array 'state' with input [§3.4]
  for (var i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];

  state = Aes.addRoundKey(state, w, 0, Nb);

  for (var round=1; round<Nr; round++) {
    state = Aes.subBytes(state, Nb);
    state = Aes.shiftRows(state, Nb);
    state = Aes.mixColumns(state, Nb);
    state = Aes.addRoundKey(state, w, round, Nb);
  }

  state = Aes.subBytes(state, Nb);
  state = Aes.shiftRows(state, Nb);
  state = Aes.addRoundKey(state, w, Nr, Nb);

  var output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (var i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];
  return output;
}

/**
 * Perform Key Expansion to generate a Key Schedule
 *
 * @param {Number[]} key Key as 16/24/32-byte array
 * @returns {Number[][]} Expanded key schedule as 2D byte-array (Nr+1 x Nb bytes)
 */
Aes.keyExpansion = function(key) {  // generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2]
  var Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nk = key.length/4  // key length (in words): 4/6/8 for 128/192/256-bit keys
  var Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys

  var w = new Array(Nb*(Nr+1));
  var temp = new Array(4);

  for (var i=0; i<Nk; i++) {
    var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    w[i] = r;
  }

  for (var i=Nk; i<(Nb*(Nr+1)); i++) {
    w[i] = new Array(4);
    for (var t=0; t<4; t++) temp[t] = w[i-1][t];
    if (i % Nk == 0) {
      temp = Aes.subWord(Aes.rotWord(temp));
      for (var t=0; t<4; t++) temp[t] ^= Aes.rCon[i/Nk][t];
    } else if (Nk > 6 && i%Nk == 4) {
      temp = Aes.subWord(temp);
    }
    for (var t=0; t<4; t++) w[i][t] = w[i-Nk][t] ^ temp[t];
  }

  return w;
}

/*
 * ---- remaining routines are private, not called externally ----
 */
 
Aes.subBytes = function(s, Nb) {    // apply SBox to state S [§5.1.1]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) s[r][c] = Aes.sBox[s[r][c]];
  }
  return s;
}

Aes.shiftRows = function(s, Nb) {    // shift row r of state S left by r bytes [§5.1.2]
  var t = new Array(4);
  for (var r=1; r<4; r++) {
    for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb];  // shift into temp copy
    for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
  }          // note that this will work for Nb=4,5,6, but not 7,8 (always 4 for AES):
  return s;  // see asmaes.sourceforge.net/rijndael/rijndaelImplementation.pdf
}

Aes.mixColumns = function(s, Nb) {   // combine bytes of each col of state S [§5.1.3]
  for (var c=0; c<4; c++) {
    var a = new Array(4);  // 'a' is a copy of the current column from 's'
    var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
    for (var i=0; i<4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;

    }
    // a[n] ^ b[n] is a•{03} in GF(2^8)
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
  }
  return s;
}

Aes.addRoundKey = function(state, w, rnd, Nb) {  // xor Round Key into state S [§5.1.4]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
  }
  return state;
}

Aes.subWord = function(w) {    // apply SBox to 4-byte word w
  for (var i=0; i<4; i++) w[i] = Aes.sBox[w[i]];
  return w;
}

Aes.rotWord = function(w) {    // rotate 4-byte word w left by one byte
  var tmp = w[0];
  for (var i=0; i<3; i++) w[i] = w[i+1];
  w[3] = tmp;
  return w;
}

// sBox is pre-computed multiplicative inverse in GF(2^8) used in subBytes and keyExpansion [§5.1.1]
Aes.sBox =  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
             0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
             0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
             0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
             0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
             0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
             0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
             0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
             0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
             0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
             0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
             0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
             0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
             0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
             0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
             0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];

// rCon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
Aes.rCon = [ [0x00, 0x00, 0x00, 0x00],
             [0x01, 0x00, 0x00, 0x00],
             [0x02, 0x00, 0x00, 0x00],
             [0x04, 0x00, 0x00, 0x00],
             [0x08, 0x00, 0x00, 0x00],
             [0x10, 0x00, 0x00, 0x00],
             [0x20, 0x00, 0x00, 0x00],
             [0x40, 0x00, 0x00, 0x00],
             [0x80, 0x00, 0x00, 0x00],
             [0x1b, 0x00, 0x00, 0x00],
             [0x36, 0x00, 0x00, 0x00] ]; 


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES Counter-mode implementation in JavaScript (c) Chris Veness 2005-2011                      */
/*   - see http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

Aes.Ctr = {};  // Aes.Ctr namespace: a subclass or extension of Aes

/** 
 * Encrypt a text using AES encryption in Counter mode of operation
 *
 * Unicode multi-byte character safe
 *
 * @param {String} plaintext Source text to be encrypted
 * @param {String} password  The password to use to generate a key
 * @param {Number} nBits     Number of bits to be used in the key (128, 192, or 256)
 * @returns {string}         Encrypted text
 */
Aes.Ctr.encrypt = function(plaintext, password, nBits, mynonce) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  plaintext = Utf8.encode(plaintext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
        
  // use AES itself to encrypt password to get cipher key (using plain password as source for key 
  // expansion) - gives us well encrypted key (though hashed key might be preferred for prod'n use)
  var nBytes = nBits/8;  // no bytes in key (16/24/32)
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {  // use 1st 16/24/32 chars of password for key
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));  // gives us 16-byte key
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // initialise 1st 8 bytes of counter block with nonce (NIST SP800-38A §B.2): [0-1] = millisec, 
  // [2-3] = random, [4-7] = seconds, together giving full sub-millisec uniqueness up to Feb 2106
  var counterBlock = new Array(blockSize);
  
  var nonce = (new Date()).getTime();  // timestamp: milliseconds since 1-Jan-1970
  var nonceMs = nonce%1000;
  var nonceSec = Math.floor(nonce/1000);
  var nonceRnd = Math.floor(Math.random()*0xffff);
  
  for (var i=0; i<2; i++) counterBlock[i]   = (nonceMs  >>> i*8) & 0xff;
  for (var i=0; i<2; i++) counterBlock[i+2] = (nonceRnd >>> i*8) & 0xff;
  for (var i=0; i<4; i++) counterBlock[i+4] = (nonceSec >>> i*8) & 0xff;
  
  if (mynonce) for (var i=0;i<8;i++) counterBlock[i] = mynonce.charCodeAt(i);
  
  // and convert it to a string to go on the front of the ciphertext
  var ctrTxt = '';
  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
  var keySchedule = Aes.keyExpansion(key);
  
  var blockCount = Math.ceil(plaintext.length/blockSize);
  var ciphertxt = new Array(blockCount);  // ciphertext as array of strings
  
  for (var b=0; b<blockCount; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    // done in two stages for 32-bit ops: using two words allows us to go past 2^32 blocks (68GB)
    for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // -- encrypt counter block --
    
    // block size is reduced on final block
    var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;
    var cipherChar = new Array(blockLength);
    
    for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter char-by-char --
      cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b*blockSize+i);
      cipherChar[i] = String.fromCharCode(cipherChar[i]);
    }
    ciphertxt[b] = cipherChar.join(''); 
  }

  // Array.join is more efficient than repeated string concatenation in IE
  var ciphertext = ctrTxt + ciphertxt.join('');
  ciphertext = Base64.encode(ciphertext);  // encode in base64
  
  //alert((new Date()) - t);
  return ciphertext;
}

/** 
 * Decrypt a text encrypted by AES in counter mode of operation
 *
 * @param {String} ciphertext Source text to be encrypted
 * @param {String} password   The password to use to generate a key
 * @param {Number} nBits      Number of bits to be used in the key (128, 192, or 256)
 * @returns {String}          Decrypted text
 */
Aes.Ctr.decrypt = function(ciphertext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  ciphertext = Base64.decode(ciphertext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
  
  // use AES to encrypt password (mirroring encrypt routine)
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // recover nonce from 1st 8 bytes of ciphertext
  var counterBlock = new Array(8);
  ctrTxt = ciphertext.slice(0, 8);
  for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);
  
  // generate key schedule
  var keySchedule = Aes.keyExpansion(key);

  // separate ciphertext into blocks (skipping past initial 8 bytes)
  var nBlocks = Math.ceil((ciphertext.length-8) / blockSize);
  var ct = new Array(nBlocks);
  for (var b=0; b<nBlocks; b++) ct[b] = ciphertext.slice(8+b*blockSize, 8+b*blockSize+blockSize);
  ciphertext = ct;  // ciphertext is now array of block-length strings

  // plaintext will get generated block-by-block into array of block-length strings
  var plaintxt = new Array(ciphertext.length);

  for (var b=0; b<nBlocks; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    for (var c=0; c<4; c++) counterBlock[15-c] = ((b) >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (((b+1)/0x100000000-1) >>> c*8) & 0xff;

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // encrypt counter block

    var plaintxtByte = new Array(ciphertext[b].length);
    for (var i=0; i<ciphertext[b].length; i++) {
      // -- xor plaintxt with ciphered counter byte-by-byte --
      plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
      plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
    }
    plaintxt[b] = plaintxtByte.join('');
  }

  // join array of blocks into single plaintext string
  var plaintext = plaintxt.join('');
  plaintext = Utf8.decode(plaintext);  // decode from UTF8 back to Unicode multi-byte chars
  
  //alert((new Date()) - t);
  return plaintext;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Base64 class: Base 64 encoding / decoding (c) Chris Veness 2002-2011                          */
/*    note: depends on Utf8 class                                                                 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Base64 = {};  // Base64 namespace

Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param {String} str The string to be encoded as base-64
 * @param {Boolean} [utf8encode=false] Flag to indicate whether str is Unicode string to be encoded 
 *   to UTF8 before conversion to base64; otherwise string is assumed to be 8-bit characters
 * @returns {String} Base64-encoded string
 */ 
Base64.encode = function(str, utf8encode) {  // http://tools.ietf.org/html/rfc4648
  utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
  var b64 = Base64.code;
   
  plain = utf8encode ? str.encodeUTF8() : str;
  
  c = plain.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
   
  for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c+1);
    o3 = plain.charCodeAt(c+2);
      
    bits = o1<<16 | o2<<8 | o3;
      
    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into code string
    e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join('');  // join() is far faster than repeated string concatenation in IE
  
  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length-pad.length) + pad;
   
  return coded;
}


/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param {String} str The string to be decoded from base-64
 * @param {Boolean} [utf8decode=false] Flag to indicate whether str is Unicode string to be decoded 
 *   from UTF8 after conversion from base64
 * @returns {String} decoded string
 */ 
Base64.decode = function(str, utf8decode) {
  utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;
  var b64 = Base64.code;

  coded = utf8decode ? str.decodeUTF8() : str;
  
  
  for (var c=0; c<coded.length; c+=4) {  // unpack four hexets into three octets
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c+1));
    h3 = b64.indexOf(coded.charAt(c+2));
    h4 = b64.indexOf(coded.charAt(c+3));
      
    bits = h1<<18 | h2<<12 | h3<<6 | h4;
      
    o1 = bits>>>16 & 0xff;
    o2 = bits>>>8 & 0xff;
    o3 = bits & 0xff;
    
    d[c/4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
    if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
  }
  plain = d.join('');  // join() is far faster than repeated string concatenation in IE
   
  return utf8decode ? plain.decodeUTF8() : plain; 
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple          */
/*              single-byte character encoding (c) Chris Veness 2002-2011                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Utf8 = {};  // Utf8 namespace

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @param {String} strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String} strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  return strUni;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

-->
/*
Copyright (c) 2011, Daniel Guerrero
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Daniel Guerrero nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL DANIEL GUERRERO BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var Base64Binary = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = Math.ceil( (3*input.length) / 4.0);
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);

		return ab;
	},

	decode: function(input, arrayBuffer) {
		//get last chars to see if are valid
		var lkey1 = this._keyStr.indexOf(input.charAt(input.length-1));		 
		var lkey2 = this._keyStr.indexOf(input.charAt(input.length-1));		 

		var bytes = Math.ceil( (3*input.length) / 4.0);
		if (lkey1 == 64) bytes--; //padding chars, so skip
		if (lkey2 == 64) bytes--; //padding chars, so skip

		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;

		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}

		return uarray;	
	}
}