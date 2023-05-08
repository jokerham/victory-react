import FirebaseBaseClass from './base';
import Registrations from './registrations';

export default class ApplicableMatches extends FirebaseBaseClass {

  constructor() {
    super('ApplicableMatches');
  }

  async selectAll(id) {
    try {
      let records = [];
      let tempRecords = await this.select(
        [{expression: 'tournamentId', value: id}], 
        [{field: 'matchType', direction: 'asc' },{field: 'weight', direction: 'asc' }]);
      let dbRegistrations = new Registrations();
      for (let record of tempRecords) {
        record.users = await dbRegistrations.selectAll(record.id);
        records.push(record);
      }
      return records;
    } catch (error) {
      console.log(error);
    }
  }
}
