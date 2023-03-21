import FirebaseBaseClass from './base';
import Users from './users';


export default class Institutes extends FirebaseBaseClass {

  constructor() {
    super('Institutes');
  }

  async selectAll() {
    const dbUsers = new Users();
    try {
      let records = [];
      let tempRecords = await this.select([], [{ field: 'title' }]);
      for (let i in tempRecords) {
        let record = tempRecords[i];
        if (record.hasOwnProperty('userId') && record.userId != null && record.userId != '') {
          record.user = await dbUsers.selectById(record.userId);
        }
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
