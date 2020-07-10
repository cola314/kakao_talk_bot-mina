function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    var com = msg.split(' ');
    if(com[0] == '솔브드') {
        try {
            var data=org.jsoup.Jsoup.connect("https://solved.ac/profile/" + String(com[1])).get();
            name = data.select('div.ProfileHeaderCardstyles__ProfileHeaderCardTop-s3gh4u-0.lhnHLG > div > div > div:nth-child(4)')+"";
            name = formating(innerText(name));
            
            replier.reply(name);
        }
        catch(err) {
            replier.reply(err);
        }
    }
    else if(com[0] == '백준') {
        try {
            var data=org.jsoup.Jsoup.connect("https://solved.ac/search?query=" + String(com[1])).get();
            name = data.select('.StickyTable__Table-akg1ak-0.ciabyS.sticky-table-table')+"";
            name = innerText(name);
            
            replier.reply(name);
        }
        catch(err) {
            replier.reply(err);
        }
    }
}

function formating(str) {
    var ret = "";
    var tmp = "";
    var ignore = 0;
    for(var i=0; i<str.length; i++) {
        if(str[i] == '%') ignore = 1;
        if(str[i] == '●') ignore = 0;
        while(i + 1 < str.length && str[i] == ' ' && str[i+1] == ' ') i++;
        if(!ignore) tmp += str[i];
    }
    tmp = tmp.split('\n');
    for(var i=0; i<tmp.length; i++) {
        if(tmp[i] != ' ' && tmp[i] != '') {
            if(tmp[i].indexOf('nbsp;') != -1) tmp[i] = tmp[i].substr(tmp[i].indexOf('nbsp;') + 5);
            ret += tmp[i];
            if(i != 3 && i == tmp.length - 1) ret += '\n';
        }
    }
    return ret.trim();
}

function innerText(str) {
    var open = 0;
    var ret = "";
    for(var i=0; i<str.length; i++) {
        if(str[i] == '<') open++;
        else if(str[i] == '>') open--;
        else if(open == 0) ret += str[i];
    }
    return ret;
}
