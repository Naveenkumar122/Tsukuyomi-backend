const config = require('config.json');
const Role = require('helpers/role');
const db = require('helpers/db');
const Attendance = db.Attendance;

module.exports = {
    entry,
    getByIdtoDay,
    getAll,
    updateByID
};


//function create a new entry in attendance document in mongodb
async function entry(Param){
    const date = (new Date()).toLocaleDateString();
    let att;
    if (Param.entryTime != null) {
        att = await Attendance.findOne({ empID: Param.userId, Entry: Param.entryTime });
        if (Param.type === "Entry") {
            att.Entry = Param.Time;
        } else {
            att.Exit = Param.Time;
            att.Exitupdated = false
        }
    }
    else {
        att = new Attendance({
            empID: Param.userId,
            teamName: Param.teamName,
            Attdate: date,
            Entry: Param.Time,
            Entryupdated: false,
            empEmail: Param.email
        });
    }
    await att.save();
}

//function to get data by ID
async function getByIdtoDay(id){
    const data = await Attendance.findOne({empID:id,Attdate: (new Date()).toLocaleDateString()});
    const result = {
         entryTime : data.Entry,
         exitTime  : data.Exit
    }
    if (!data) return;
    return result;
}

//function to get data all employees
async function getAll(){
   return await Attendance.find();
}

//function to update attandance record by its id
async function updateByID(Param){
    let data = await Attendance.findById(Param.id);
      data.updated = true;
      //ok for accepted and not ok for rejected
      data.Accepted = (Param.type === "ok") ? true : false;
      //if user forget to update the exit time the time will be default 6.00 pm
      data.Exit = data.Exit == null ? "6.00.00 PM" : data.Exit;
      //let we update with the user provided time for the time being
      data.Entryupdated = true;
      data.Exitupdated = true;
    await data.save();
}