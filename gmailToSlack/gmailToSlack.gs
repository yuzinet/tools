const SLACK_WEBHOOK = "https://hooks.slack.com/services/${YOUR_TOCKEN}";
const SLACK_POSTUSER = "Gmail"; // You can set sender name 

function gMailSendEachChannel(){
  var sendMailList = [["label:youser", "gmail_slack_channel"], // serch key word and slack channel
                      ["${keyword}", "${slack_channel}"] // you can add condition
                    　];
  
  // get send condition from list
  for (var i = sendMailList.length - 1; i >= 0; i--){
      gMailFilter(sendMailList[i][0], sendMailList[i][1]);
  };

}

function gMailFilter(key_word, channel_name) {
  // serch keyword from your gmail
  var strTerms = key_word;
  var myThreads = GmailApp.search(strTerms, 0, 50); // get match condition
  Logger.log(myThreads);
  var myMsgs = GmailApp.getMessagesForThreads(myThreads); // get mail from thred to list
  
  for (var i = myMsgs.length - 1; i >= 0; i--) {
    var msgsInThread = myMsgs[i];
    for (var j = 0; j < msgsInThread.length; j++) {
      var msg = msgsInThread[j];

      // if unread
      if (msg.isUnread()) {
        // change to Already read
        msg.markRead();

        // create message （you can use emoji :) ）
        var msgBody = ":pencil:*" + msg.getSubject() + "*\n" +
                      msg.getFrom() + "\n\n" + "```" +
                      msg.getPlainBody().slice(0,512) + "```" + "\n\n" +
                      msg.getDate() + "\n";

        var msgJson = {
          "username": SLACK_POSTUSER,
          'channel'   : channel_name,   // Slack channnel name
          "text": msgBody
        };
        var payload = JSON.stringify(msgJson);
        Logger.log(payload);

        // send to Slack
        var options = {
          "method": "post",
          "contentType": "application/json",
          "payload": payload
        };

        UrlFetchApp.fetch(SLACK_WEBHOOK, options);        
      }
    }
  }
}
