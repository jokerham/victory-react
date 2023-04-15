import FirebaseBaseClass from "./base";
import Institutes from "./institutes";

export default class Users extends FirebaseBaseClass {
  constructor() {
    super('Users');
  }

  async selectAll() {
    try {
      let records = [];
      let tempRecords = await this.select(
        [], [{ field: 'name' }]);
      tempRecords.forEach(async record => {
        if (record.hasOwnProperty('instituteId') && record.instituteId !== null && record.instituteId !== '') {
          const dbInstitute = new Institutes();
          record.user = await dbInstitute.selectById(record.instituteId);
        }
        records.push(record);
      });
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async selectByApproved(approved) {
    try {
      let records = [];
      let tempRecords = await this.select(
        [{expression: 'approved', value: approved}], 
        [{ field: 'name' }]);
      for (let i in tempRecords) {
        let record = tempRecords[i];
        if (record.hasOwnProperty('instituteId') && record.instituteId !== null && record.instituteId !== '') {
          const dbInstitute = new Institutes();
          record.institute = await dbInstitute.selectById(record.instituteId);
        }
        records.push(record);
      }
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async selectByName(name) {
    try {
      let records = [];
      let tempRecords = await this.selectAll();
      tempRecords.forEach(record => {
        if (record.name.includes(name)) {
          records.push(record);
        }
      })
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async approveUser(id) {
    try {
      let user = await this.selectById(id);
      user.approved = true;
      await this.update(id, user);
    } catch (error) {
      console.log(error);
    }
  }

  async setRandomWeight() {
    const mean = 50;
    const standardDeviation = 5;
    try {
      let users = await this.selectAll();
      users.forEach(async user => {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const weight = mean + z0 * standardDeviation;
        user.weight = weight;
        await this.update(user.id, user);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
