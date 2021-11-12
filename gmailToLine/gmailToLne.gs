var accessToken = LINE_TOCKEN;
var lineMessage = "";
var strTerms = ""

function lineSendFilters(){
  var sendMailList = ["label:youser", // key word 
                      "${keyword}"    // key word 
                    　];
  
  // get send condition from list
  for (var i = sendMailList.length - 1; i >= 0; i--){
      lineFilter(sendMailList[i]);
  };

}

function lineFilter(strTerms) {
  var message = "";
  //Gmailから特定条件のスレッドを検索しメールを取り出す
  var myThreads = GmailApp.search(strTerms, 0, 5); //条件にマッチしたスレッドを取得
  //Logger.log(myThreads);
  var myMsgs = GmailApp.getMessagesForThreads(myThreads); //スレッドからメールを取得する→二次元配列で格納
  
  //各スレッド×メール
  for (var i = myMsgs.length - 1; i >= 0; i--) {
    var msgsInThread = myMsgs[i];
    for (var j = 0; j < msgsInThread.length; j++) {
      var msg = msgsInThread[j];

      //未読のみ
      if (msg.isUnread()) {
        //メールを既読にする
        msg.markRead(); // 既読にする
        // LINEのメッセージにタイトルを入れる。
        lineMessage = '\n' + msg.getSubject();        
        Logger.log("getSubject:" + msg.getSubject())

        LINE();
      }
    }
  }
}

function LINE() {
        var options = {
          'method' : 'post',
          'headers': {
            'Authorization': 'Bearer ' + accessToken
          },
          'payload' : {
            'message': lineMessage
          }
        };
        var response = UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
        Logger.log(response);
}
