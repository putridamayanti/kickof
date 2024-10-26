const {UserService} = require("../services/user.service");
const {ValidatePassword, GenerateToken, GeneratePassword} = require("../utils/jwt");
const moment = require("moment");
const {v4: uuid} = require("uuid");
const {RoleService} = require("../services/role.service");
const Login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.GetUser({email})
    if (!user) {
        return res.status(404).send({data: "Account not found"});
    }

    const passwordValid = ValidatePassword(password, user.data?.password)
    if (!passwordValid) {
        return res.status(400).send({data: 'Wrong password!'});
    }

    user.lastActive = moment();
    await UserService.UpdateUser({id: user.id}, user);

    const role = await RoleService.GetRole({id: user.roleId});

    const token = GenerateToken(email);

    return res.status(200).send({data: {
        token: token,
        id: user.data?.id,
        name: user.data?.name,
        email: user.data?.email,
        role: role?.data?.code,
    }});
};

const Register = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.GetUser({email})
    if (user.data) {
        return res.status(404).send({data: "Email already exist"});
    }

    const userRole = await RoleService.GetRole({code: 'user'});

    const params = {
        id: uuid(null, null, null),
        roleId: userRole?.data?.id,
        ...req.body,
        password: GeneratePassword(password),
        lastActive: moment()
    };
    await UserService.CreateUser(params);

    const token = GenerateToken(email);

    return res.status(200).send({data: {
            token: token,
            id: params.id,
            name: params.name,
            email: params.email,
            role: userRole?.data?.code,
        }});
};

exports.AuthController = {
    Login,
    Register
}