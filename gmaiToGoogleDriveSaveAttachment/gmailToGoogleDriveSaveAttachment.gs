// refer this site : https://tonari-it.com/gas-gmail-attachment-drive/

const SEARCH_KEYWORD = 'from:xxxx@xxxx.co.jp has:attachment subject:xxxx label:unread '; // you want to save attachment mail serch key word
// please check you want to save folder id
const FOLDER_ID = 'xxxxxxxxx'; //フォルダID 



function fetchFile(){
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const threads = GmailApp.search(SEARCH_KEYWORD, 0, 10);
  const messages = GmailApp.getMessagesForThreads(threads);

  // save attachment file to goole drive
  for(const thread of messages){
    for(const message of thread){
      const attachments = message.getAttachments();
      for(const attachment of attachments){
        folder.createFile(attachment);
      }
    }
  }
}
