const CALENDAR_ID = PropertiesService.getScriptProperties().getProperty('CALENDAR_ID'); //カレンダーID

function getCalendarEvents() {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);  
  const startTime = new Date('2022/03/01 00:00:00');
  const endTime = new Date('2023/02/28 00:00:00');
   
  const events = calendar.getEvents(startTime, endTime);
 
  const values = [];
  for(const event of events){
    const record = [
      event.getTitle(),
      event.getStartTime(),
      event.getEndTime()
    ];
    values.push(record);
  }
 
  SpreadsheetApp.getActiveSheet().getRange(2, 1, values.length, values[0].length).setValues(values);
 
}
