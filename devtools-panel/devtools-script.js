function do_something(msg) {
    var urlValue = "https://sstats.bnpparibasfortis.be/b/ss/bnp.be.all.global.all.prod/1/JS-2.17.0-LAWA/s54460799920171?AQB=1&ndh=1&pf=1&t=13%2F0%2F2021%2016%3A23%3A45%203%20-60&mid=52851691650116901182544064212120934332&aamlh=6&ce=UTF-8&pageName=fb%3Apriv%3Ageneral%3Alogin&g=https%3A%2F%2Fwww.bnpparibasfortis.be%2Ffr%2FPublic%2FConnexion%3Faxes4%3Dpriv&r=https%3A%2F%2Fwww.bnpparibasfortis.be%2F&cc=EUR&ch=fb%3Aeasybanking%20web&events=event72%3D10%2Cevent180%2Cevent160%3D0.11%2Cevent161%3D0.00%2Cevent162%3D0.00%2Cevent163%3D0.00%2Cevent164%3D0.07%2Cevent165%3D0.03%2Cevent166%3D1.30%2Cevent167%3D0.02%2Cevent168%3D1.74%2Cevent169&aamb=RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y&c1=fr&c2=fb&v2=fb&c3=priv&v3=1%3B1%3B1%3B3&c4=general&v4=0&c6=fb%3Apriv%3Ageneral%3Alogin&c12=52&c13=0&v18=fb%3Apriv%3Adaily%20banking%3Ahome%20individuals%3Aindex&c30=public&c55=fb%3Apriv%3Ageneral%3Alogin&c57=10&c62=1%3B1%3B1%3B3&c63=0%3B0&v63=https%3A%2F%2Fwww.bnpparibasfortis.be%2Ffr%2FPublic%2FConnexion%3Faxes4%3Dpriv&v91=Mozilla%2F5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2011_1_0%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F87.0.4280.88%20Safari%2F537.36&v121=cookie%20consent%20tag%20%5BPL%20-%20AA%20CC%5D&c.&a.&activitymap.&page=fb%3Apriv%3Adaily%20banking%3Ahome%20individuals%3Aindex&link=S%27identifier&region=1439907186386&pageIDType=1&.activitymap&.a&.c&s=1680x1050&c=30&j=1.6&v=N&k=Y&bw=1633&bh=519&mcorgid=F46824205476152E0A4C98A2%40AdobeOrg&AQE=1";
    formatAdobeAnalyticsPixel.pageData = msg;
    formatAdobeAnalyticsPixel.init(msg);

}

var formatAdobeAnalyticsPixel = {

    output: [],
    path: [],
    params: [],
    query: {},
    query_string: '',
    server_call_length: 0,
    no: 1,
    pageData: null,

    init: function (details) {

        this.setData(details);

        this.setTitle();
        this.setHeader();
        this.setMainBody();
        this.setFooter();
        this.setContextVars();
        this.setAdobeLaunch();

        this.printInfo();
    },

    setData: function (details) {
        this.path = details.url.split('/');

        this.params = [];
        this.server_call_length = 0;
        this.query_string = '';

        if (details.method == 'POST' && details.post_query) {
            this.query_string = details.post_query;
            this.server_call_length = (details.url + details.post_query).length;
        }
        else if (details.url) {
            this.query_string = details.url.split('?')[1] ? details.url.split('?')[1] : '';
            this.server_call_length = details.url.length;
        }
        this.params = this.query_string ? this.query_string.split('&') : [];

        this.query = {};
        for (var k in this.params) {
            if (this.params.hasOwnProperty(k)) {
                var tmp = this.params[k].split('=');
                this.query[tmp[0]] = decodeURIComponent(tmp[1]);
            }
        }
    },

    printInfo: function () {
        var myTable = document.getElementById("myRecordedAnalyticsTable");
        var row1 = myTable.insertRow(-1);
        var cell1 = row1.insertCell(-1);
        cell1.setAttribute('colspan', '2');
        cell1.setAttribute('class', 'lite-header');
        cell1.innerHTML = this.output[0];
        for (var i = 1; i < this.output.length; i++) {
            if (this.output[i]['info']) {
                var row2 = myTable.insertRow(-1);
                var cell2 = row2.insertCell(-1);
                cell2.setAttribute('colspan', '2');
                cell2.innerHTML = this.output[i]['info'];
            } else {
                var row3 = myTable.insertRow(-1);
                var cell3 = row3.insertCell(-1);
                var cell4 = row3.insertCell(-1);
                cell3.innerHTML = this.output[i]['line'].split(':')[0];
                cell4.innerHTML = this.output[i]['line'].slice(this.output[i]['line'].indexOf(':')+1);
            }
        }
        this.output = [];
        this.no++;
    },

    setTitle: function () {
        this.output[0] = 'Adobe Analytics Server Call NO - ' + this.no;
    },

    setHeader: function () {
        if (this.query['pe']) {
            var types = {
                'lnk_o': 'CUSTOM LINK',
                'lnk_e': 'EXIT LINK',
                'lnk_d': 'DOWNLOAD LINK',
                'm_i': 'MEDIA',
                'm_s': 'MEDIA'
            }
            var type = types[this.query['pe']] || 'Unknown';
            this.output.push({
                'info': type + Array(20 - type.length).join(' ') + ': ' + (this.query['pev2'] || this.query['pev3']),
                'css': this.css['info']
            });
        }

        this.output.push({
            'line': 'Report Suite ID    : ' + this.path[5]
        });
    },

    setMainBody: function () {
        for (var k in this.dict) {
            if (this.dict.hasOwnProperty(k)) {
                for (var k1 in this.params) {
                    if (this.params.hasOwnProperty(k1)) {
                        var param = this.params[k1].split('=');
                        if (param[0].match('^' + k + '$')) {
                            param[1] = decodeURIComponent(param[1]);
                            var value = k == 'products' ? this.getProducts(param[1]) : param[1];
                            var key = this.dict[k] + (this.dict[k].match(/Hier|eVar|prop/) ? param[0].match(/[0-9]{1,3}/)[0] : '');
                            var spaces = key.length > 20 ? 30 - key.length : 20 - key.length;
                            this.output.push({
                                'line': key + Array(spaces).join(' ') + ': ' + value,
                            });
                            delete this.params[k1];
                        }
                    }
                }
            }
        }
    },

    getProducts: function (products) {

        dictProducts = {
            0: 'Category   : ',
            1: 'Product    : ',
            2: 'Quantity   : ',
            3: 'Price      : ',
            4: 'Events     : ',
            5: 'eVars      : '
        }

        var format = '\n';
        var products = products.split(',');
        for (var i = 0; i < products.length; i++) {
            format = format + (i == 0 ? '' : '\n') + '    #' + (i + 1) + '\n';
            item = products[i].split(';');
            for (var y = 0; y < item.length; y++) {
                if (item[y]) {
                    format += (y <= 5) ? '    ' + dictProducts[y] : '    ';
                    format += item[y] + '\n';
                }
            }
        }

        return format;
    },

    setFooter: function () {
        if (this.query['pe'])
            return;

        var dc = '';
        for (var k in this.dataCenters) {
            if (this.dataCenters.hasOwnProperty(k)) {
                if (this.path[2].match(k)) {
                    dc = ' - ' + this.dataCenters[k];
                    break;
                }
            }
        }

        if (this.query['ce'])
            this.output.push({ 'line': 'Char Set           : ' + this.query['ce'] });
        this.output.push({ 'line': 'Version of Code    : ' + this.path[7] });
        this.output.push({ 'line': 'Data Centre        : ' + this.path[2] + dc });

        if (this.query['mcorgid'])
            this.output.push({ 'line': 'Organisation ID    : ' + this.query['mcorgid'] });
        if (this.query['mid'])
            this.output.push({ 'line': 'Visitor ID         : ' + this.query['mid'] });
        if (this.query['aid'])
            this.output.push({ 'line': 'Legacy Analytics ID: ' + this.query['aid'] });
    },

    setContextVars: function () {
        var context = this.query_string.match(/(\&c\.\&)(.*?)(\&\.c\&)/gi) || [];

        if (context.length > 1 || (context.length == 1 && !/activitymap\./.test(context[0])))
            this.output.push({
                'line': 'Context Variables',
                'css': this.css['title']
            });

        for (var i = 0; i < context.length; i++) {
            var item = context[i].split('&');
            item = item.filter(function (x) {
                return !/^(\.a|a\.|\.c|c\.|\.activitymap)$|^$/.test(x);
            });
            for (var y = 0; y < item.length; y++) {
                var tmp = item[y].split('=');
                tmp[1] = tmp[1] ? decodeURIComponent(tmp[1]) : '';
                if (tmp[0] == 'activitymap.')
                    this.output.push({
                        'line': 'Activity Map',
                        'css': this.css['title']
                    });
                else
                    this.output.push({
                        'line': tmp[0] + ': ' + tmp[1]
                    });
            }
        }

    },

    setAdobeMarketingCloud: function () {
        if (this.query['pe'])
            return;

        var amc = [];
        if (this.query['mcorgid'])
            amc.push({ 'line': 'Organisation ID    : ' + this.query['mcorgid'] });
        if (this.query['mid'])
            amc.push({ 'line': 'Visitor ID         : ' + this.query['mid'] });
        if (this.query['aid'])
            amc.push({ 'line': 'Legacy Analytics ID: ' + this.query['aid'] });

        if (amc.length > 0) {
            this.output.push({
                'line': 'Adobe Experience Cloud',
                'css': this.css['title']
            });
            this.output = this.output.concat(amc);
        }
    },

    setAdobeLaunch: function () {
        if (this.query['pe'] || !this.pageData || !this.pageData.satellite)
            return;
        var sat = this.pageData.satellite

        var al = []
        al.push('Property: ' + decodeURIComponent(sat.name));
        al.push('Env: ' + sat.environment);
        al.push('Build: ' + sat.buildDate);

        this.output.push({
            'line': 'Adobe Launch',
            'css': this.css['title']
        });
        this.output.push({ 'line': al.join(' | ') });
    },

    css: {
        'body': 'all: initial',
        'title': 'font-weight: bold',
        'info': 'color: blue'
    },

    dict: {
        'pageName': 'Page Name',
        'pageType': 'Page Type',
        'ch': 'Site Section',
        'server': 'Server',
        'g': 'Current URL',
        'events': 'Events',
        'purchaseID': 'Purchase ID',
        'products': 'Products',
        'xact': 'Transaction ID',
        'v0': 'Campaign',
        'h([0-9]{1,2})': 'Hier',
        'l([0-9]{1,2})': 'List eVar',
        'v([0-9]{1,3})': 'eVar',
        'c([0-9]{1,3})': 'prop',
        'zip': 'Zip',
        'tnt': 'TnT Campaign',
        'cc': 'Currency Code',
        'vid': 'Manualy set visitor ID',
    },

    dataCenters: {
        '112.2o7.net': 'San Jose, California',
        '122.2o7.net': 'Dallas, Texas',
        'd1.sc.omtrdc.net': 'San Jose, California',
        'd2.sc.omtrdc.net': 'Dallas, Texas',
        'd3.sc.omtrdc.net': 'London, United Kingdom',
        'sc.omtrdc.net': 'Singapore and Pacific Northwest, United States'
    }
}

window.onload = function () {
    document.getElementById("downloadCSVFile").addEventListener("click", function () {
        var table = document.getElementById("myRecordedAnalyticsTable");

        var rowsLength = table.rows.length;

        var rows = table.rows;

        var fileData = [];

        for (var i = 0; i < rowsLength; i++) {
            var colsLength = rows[i].cells.length;
            var temp = [];
            for (var j = 0; j < colsLength; j++) {
                var col = rows[i].cells[j].innerText;
                temp.push(col)
                if(colsLength == 1) {
                    fileData.push(["--", "--"]);
                    temp.push(" - ");
                }  
            }
            fileData.push(temp);
        }

        csvContent = "data:text/csv;charset=utf-8,";
        fileData.forEach(function (rowArray) {
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var dateTime = '_'+date+'_'+time;   
        link.setAttribute("download", "Adobe_Analytics_Tracker"+dateTime+".csv");
        document.body.appendChild(link);
        link.click();
    });
}