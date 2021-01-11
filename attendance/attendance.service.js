const config = require('config.json');
const Role = require('helpers/role');
const db = require('helpers/db');
const Attendance = db.Attendance;

module.exports = {
    entry
};


//function create a new entry in attendance document in mongodb
async function entry(Param){
    let att=await Attendance.findOne({empID:Param.userId,attDate:Date.now});
    console.log(att);
    if(att){
         if(Param.type === "Entry"){
             att.Entry = Param.entryTime;
         }else{
             att.Exit = Param.exitTime;
         }
    }else{
         att = new Attendance({
            empID:Param.userId,
            teamName:Param.teamName,
            Attdate:Date.now,
            Entry:Param.entryTime
         });
    }
    await att.save();
}
