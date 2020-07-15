/*
'내일' 포함이면 내일의 급식 정보
'어제' 포함이면 어제의 급식 정보
숫자 1개 z 포함이면 z일 급식 정보
숫자 2개 y z 포함이면 y월 z일 급식 정보
숫자 3개 x y z 포함이면 x년 y월 z일 급식 정보
그밖의 경우는 오늘 급식 정보가 나옵니다
'중식' 또는 '점심' 포함이면 점심 정보만
'석식' 또는 '저녁' 포함이면 저녁 정보만
그밖의 경우는 둘다 나옵니다
명령어의 순서는 상관 없습니다
*/
var memo = {};

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
/*
var cmd = ["ㅎㅇ", "ㅂㅇㄹ", "보이루", "하이루", "안녕", "네", "맞아요", "아니요", "긋긋긋"];
for(var i = 0; i < cmd.length; i++){
  if(msg.indexOf(cmd[i]) != -1) {
replier.reply(cmd[i]);
return;
}
}*/
if(msg.indexOf('미나') != -1 || msg.indexOf('민아') != -1) {
    replier.reply("왜 " + sender.substr(1));
    return;
}
if(msg.indexOf('라고') != -1) {
    replier.reply(msg.substr(0, msg.indexOf('라고')));
    return;
}
if(msg[msg.length-1] == '!') {
    replier.reply(msg.substr(0, msg.length-1));
    return;
}
if(msg.indexOf('예시') != -1){
    replier.reply("간단한 예시)\n오늘\n중식\n석식\n점심\n저녁\n오늘 저녁\n어제 점심\n내일\n5 21\n5 22 중식\n20 석식");
    return;
}
if(msg.indexOf('몰라') != -1){
    replier.reply("간단한 예시)\n오늘\n중식\n석식\n점심\n저녁\n오늘 저녁\n어제 점심\n내일\n5 21\n5 22 중식\n20 석식");
    replier.reply("\'내일\' 포함이면 내일의 급식 정보\n\'어제\' 포함이면 어제의 급식 정보\n숫자 1개 z 포함이면 z일 급식 정보\n숫자 2개 y z 포함이면 y월 z일 급식 정보\n숫자 3개 x y z 포함이면 x년 y월 z일 급식 정보\n그밖의 경우는 오늘 급식 정보가 나옵니다\n\n\'중식\' 또는 \'점심\' 포함이면 점심 정보만\n\'석식\' 또는 \'저녁\' 포함이면 저녁 정보만\n그밖의 경우는 둘다 나옵니다\n\n명령어의 순서는 상관 없습니다\n");
    return;
}
if(msg.indexOf('급식') == -1) return;
	date = getDate(new Date(), 0);
	dateInput = dateParse(msg);
	if(dateInput.length >= 3) {
		date = dateInput;
	}
	else if(dateInput.length >= 2) {
		date[1] = dateInput[0];
		date[2] = dateInput[1];
	}
	else if(dateInput.length >= 1) {
		date[2] = dateInput[0];
	}
	else if(msg.indexOf('내일') != -1) {
		date = new Date();
		date.setDate(date.getDate() + 1);
		date = getDate(date, 0);
	}
	else if(msg.indexOf('어제') != -1) {
		date = new Date();
		date.setDate(date.getDate() - 1);
		date = getDate(date, 0);
	}
	replier.reply(date[0] + '년 ' + date[1] + '월 ' + date[2] + '일' + ' 급식 정보야');
	var meal = dataParse(date);
	if(msg.indexOf('저녁') == -1 && msg.indexOf('석식') == -1) {
		replier.reply(mealfunc(meal)[0]);
	}
	if(msg.indexOf('점심') == -1 && msg.indexOf('중식') == -1) {
		replier.reply(mealfunc(meal)[1]);
	}
}

function dataParse(dinfo) {
    if(memo[dinfo]) return memo[dinfo];
	var url = 'http://www.sht.hs.kr/?_page=41&yy='+ dinfo[0] +'&mm='+ dinfo[1] +'&dd='+ dinfo[2] +'&_action=view&_view=view';
	var data=org.jsoup.Jsoup.connect(url).get().select('dd,dt') + "";
    	var ret = data.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi," ");
	return memo[dinfo] = ret;
}


function getDate(date, isStr) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if(isStr) {
		return year + '년 ' + month + '월 ' + day + '일';
	}
	return [year, month, day];
}

function mealfunc(s) {
	var list = [];
	var ret = '';

	for(var i = 0; i < s.length; i++) {
		t = '';
		while(i < s.length && s[i] == ' ') i++;
		while(i < s.length && s[i] != ' ') {
			t += s[i];
			i++;
		}
		if(t != '') {
			list.push(t);
		}
	}

	for(var i = 0; i < list.length; i++) {
		ret += list[i];
		if(list[i] == '중식' || list[i] == '석식') ret += '은 ';
		if(i + 1 != list.length) {
			ret += ' ';
		}
	}
	var cursor = ret.indexOf("석식");
	var re1 = ret.substr(0, cursor).trim();
	var re2 = ret.substr(cursor, ret.length).trim();
	if(re1 == '중식은') re1 = '중식 정보가 없어';
	if(re2 == '석식은') re2 = '석식 정보가 없어';
	return [re1, re2];
}

function dateParse(s) {
	var list = [];

	for(var i = 0; i < s.length; i++) {
		t = '';
		while(i < s.length && !(s[i]>='0' && s[i]<='9')) i++;
		while(i < s.length && (s[i]>='0' && s[i]<='9')) {
			t += s[i];
			i++;
		}
		if(t != '') {
			list.push(t);
		}
	}
	return list;
}
