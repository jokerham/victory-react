import FirebaseBaseClass from './base';

export default class ScheduledMatches extends FirebaseBaseClass {

  constructor() {
    super('ScheduledMatches');
  }

  async selectAll(tournamentId) {
    try {
      let records = [];
      let tempRecords = await this.select([], [{ field: 'startTiem', direction: 'asc' }]);
      for (let i in tempRecords) {
        let record = tempRecords[i];
        records.push(record);
      }
      return records;
    } catch (error) {
      console.log(error);
    }
  }
}
