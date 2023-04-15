import FirebaseBaseClass from './base';

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
}
