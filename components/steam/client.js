var Steam = require('steam');
var SteamUser = require('steam-user');
var fs = require('fs');
var steamClient = new Steam.SteamClient();
var steamUser = new SteamUser({
  autoRelogin: true,
  singleSentryfile: true,
  dataDirectory: null
});
var getSteamAPIKey = require('steam-web-api-key');
var offerClient = require('../offers/index').offerClient


// if we've saved a server list, use it
if (fs.existsSync('servers')) {
  Steam.servers = JSON.parse(fs.readFileSync('servers'));
}
//CREDENTIALS
var logOnDetails = {
    "accountName": process.env.BOT_USERNAME,
    "password": process.env.BOT_PASSWORD,
};
// READ SENTRY FILE
if(fs.existsSync('./sentryfile')){
  var sentry = fs.readFileSync('./sentryfile')
    steamUser.setSentry(sentry)
}

//CONNECT TO STEAM
function Client(){
  steamClient.connect();
  steamClient.on('connected', function(error){
    console.log("BOT: Connected to Steam")
    steamUser.logOn(logOnDetails)
  });
  steamUser.on('loggedOn', function(response){
    if(response.eresult == Steam.EResult.OK){
      console.log("BOT: Logged IN!")
      steamUser.setPersona(SteamUser.Steam.EPersonaState.Online, (process.env.BOT_NAME || "Austral"));
    }
  });
  steamClient.on('error', function(error){
    console.log(error);
  });
  steamClient.on('servers', function(servers) {
    fs.writeFile('servers', JSON.stringify(servers));
  });
  steamUser.on('webSession', function(webSessionID, cookies){
    console.log("BOT: Logged on Web");
    //GET API KEY
    getSteamAPIKey({sessionID: webSessionID, webCookie: cookies}, function(error,apiKey){
      if(apiKey){
        console.log("BOT: API Key Received");
        offerClient(webSessionID,cookies,apiKey);
      }else{
        console.log(error);
        console.log("BOT: API Key Access Denied")
      }
      //START OFFERS MODULE
    });
  });
  steamUser.on('friendMessage',function(senderID,message){
    console.log(senderID.getSteamID64());
    console.log("Message: ",message);
  });
  //LIMITATIONS
  steamUser.on('accountLimitations', function(limited, communityBanned, locked, canInviteFriends) {
  	var limitations = [];

  	if(limited) {
  		limitations.push('LIMITED');
  	}

  	if(communityBanned) {
  		limitations.push('COMMUNITY BANNED');
  	}

  	if(locked) {
  		limitations.push('LOCKED');
  	}

  	if(limitations.length === 0) {
  		console.log("BOT: Our account has no limitations.");
  	} else {
  		console.log("BOT: Our account is " + limitations.join(', ') + ".");
  	}

  	if(canInviteFriends) {
  		console.log("BOT: Our account can invite friends.");
  	}
  });
}

module.exports = Client
