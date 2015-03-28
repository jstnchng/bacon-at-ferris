if (Meteor.isClient) {
Template.body.helpers({
	response: function(){
		Meteor.call("getTime", function(err, result){
			var n = result.search("Pork Bacon");
			if(n == -1)
				Session.set("bacon", "NO");
			else
				Session.set("bacon", "YES");	
		});
		return Session.get("bacon");
	}
});
}



if (Meteor.isServer) {
//  Meteor.startup(function () {
    // code to run on server at startup
//  });

var cheerio = Npm.require('cheerio');
Meteor.methods({
    getTime: function () {
	var date = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var dayOfWeek = days[date.getDay()];	
	
	
/*
        result1 = Meteor.http.get("http://dining.columbia.edu/43week-tenfridaybreakfast-fbc");
        $ = cheerio.load(result1.content);
        menu1 = $('#main-wrapper').text();
*/        

	result2 = Meteor.http.get("http://dining.columbia.edu/43week-ten-friday-breakfast-fbc");
	$ = cheerio.load(result2.content);
	menu2 = $('#main-wrapper').text();
	
//	var menu = menu1.concat(menu2);

	return menu2;
    }
});
}
