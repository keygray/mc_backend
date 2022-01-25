const Model = require("../model/admin.model");

const getAllAdmin = async (req, res) => {
    const result = await Model.Admin.find();
    return res.status(200).send({ data: result });
}

const getOneAdmin = async (req, res) => {
    const {id} = req.params;
    const result = await Model.Admin.findById(id);
    if(!result){
        return res.status(500).send({message: "Không tìm thấy"})
    }
    return res.status(200).send(result);
}

const deleteAdmin = async (req, res) => {
    const {id} = req.params;
    await Model.Admin.findByIdAndDelete(id);
    return res.status(200).send({success: true});
}

const updateAdmin = async (req, res) => {
    const {id} = req.params;
    const update = await Model.Admin.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        image: req.body.image,
        numberPhone: req.body.numberPhone
    }, {new: true})
    if(!update)
        return res.status(500).send('the product cannot be updated!')
    res.send(update);
}

const createAdmin = async (req, res) => {
    const { name, email, address, image, numberPhone } = req.body
    const result = await Model.Admin.create({
        name, 
        email,
        address, 
        image,
        numberPhone
    });
    return res.status(200).send(result);
}

module.exports = {
    getAllAdmin,
    getOneAdmin,
    deleteAdmin,
    updateAdmin,
    createAdmin
}