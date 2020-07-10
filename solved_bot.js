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
            name = data.select('StickyTable__Table-akg1ak-0 ciabyS sticky-table-table')+"";
            name = innerText(name);
            
            replier.reply(name);
        }
        catch(err) {
            replier.reply(err);
        }
    }
}
