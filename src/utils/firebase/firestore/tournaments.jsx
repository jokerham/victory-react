import FirebaseBaseClass from './base';
import ScheduledMatches from './scheduledMatches';

export default class Tournaments extends FirebaseBaseClass {

  constructor() {
    super('Tournaments');
  }

  async selectAll() {
    try {
      let records = [];
      let tempRecords = await this.select([], [{ field: 'eventDate', direction: 'asc' }]);
      for (let i in tempRecords) {
        let record = tempRecords[i];
        records.push(record);
      }
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async selectByTitle(title) {
    try {
      let records = [];
      let tempRecords = await this.selectAll();
      tempRecords.forEach(record => {
        if (record.title.includes(title)) {
          records.push(record);
        }
      })
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async selectByUnscheduled() {
    try {
      let scheduledMatches = new ScheduledMatches();
      let records = [];
      let tempRecords = await this.selectAll();
      for (let i in tempRecords) {
        let record = tempRecords[i];
        let scheduleMatched = await scheduledMatches.existsWhere([{expression: 'tournamentId', value: record.id}]);
        if (scheduleMatched === false) {
          records.push(record);
        }
      };
      return records;
    } catch (error) {
      console.log(error);
    }
  }
}
