import FirebaseBaseClass from './base';

export default class ApplicableMatches extends FirebaseBaseClass {

  constructor() {
    super('ApplicableMatches');
  }

  async selectAll(id) {
    try {
      let records = [];
      let tempRecords = await this.select(
        [{expression: 'tournamentId', value: id}], 
        [{field: 'weight', direction: 'asc' }]);
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
