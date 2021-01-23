const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('helpers/role');
const bcrypt = require('bcrypt');
const db = require('helpers/db');
const User = db.User;
const UserAuth = db.UserAuth;

module.exports = {
    authenticate,
    create,
    getAll
};

async function authenticate({ email, password }) {
    const user = await UserAuth.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.userId,role:user.role }, config.secret, { expiresIn: '7d' });
        const userWithoutPass = await User.findOne({email});
        const res = {...userWithoutPass._doc,token}
        return res;
    }
}

//function create a new profile in users and usersAuth
async function create(Param){
    // validate if email is available or not
    if (await User.findOne({ email: Param.email })) {
        throw `email ${Param.email} is already taken`;
    }
    //createing an user instance based on the form input
    const user = new User({
        name: Param.name,
        email:Param.email,
        teamName:Param.teamName,
        salary:Param.salary
    });
    //saving the above input in mongodb
    await user.save();
    const crUser = await User.findOne({email:Param.email});
    //creating instance of authentication for the above user details
    const user_auth = new UserAuth({
        email:Param.email,
        password:bcrypt.hashSync(Param.password, 10),
        role:crUser.role,
        userId:crUser._id
    });
    //saving the user authentication details in the userAuth collection
    await user_auth.save();
}

//function to get data all employees
async function getAll(){
    return await User.find();
 }
