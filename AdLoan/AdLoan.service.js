const db = require('helpers/db');
const AdLoan = db.AdLoan;

module.exports={
    getById,
    entry,
    getAll,
    updateByID
};

//function to retrive loan and advance details of an employee by their email id
async function getById(email){
    return AdLoan.findOne({email:email});
}

//function to update an loan and advance request from the employess in db
async function entry(Param){
    Param.type = (Param.type).toLowerCase();
    if(/^\d+$/.test(Param.amount)==false){
        throw "amount should be in numbers";
    }
    if(Param.type !== "loan" && Param.type !== "advance"){
        throw "Invalid type request";
    }
    if(await AdLoan.findOne({empEmail:Param.email,type:Param.type,isPending:true})){
         throw `looks like you have already applied for an ${Param.type}`;
    }
    const record = new AdLoan({
        empEmail:Param.email,
        type:Param.type,
        amount:Param.amount
    });
    await record.save();
}

//function to get data of all employees
async function getAll(){
    return await AdLoan.find();
}

//function to update advance and loan record by its id
async function updateByID(Param){
    let data = await AdLoan.findById(Param.id);
    //if type ok then loan or advance approval will be true else false
    data.approved = (Param.type === "ok") ? true:false;
    //updating the pending status
    data.isPending = false;
    await data.save();
}