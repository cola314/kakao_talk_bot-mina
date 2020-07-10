var list = {};

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
   if(msg.indexOf('is') != -1) {
      var left = msg.substr(0, msg.indexOf('is')).trim();
      var right = msg.substr(msg.indexOf('is') + 2, msg.length).trim();
      list[left] = right;
   }
   else if(msg in list) {
      replier.reply(list[msg]);
   }
   if(msg == "미나기억삭제") {
      list = {};
   }
}
