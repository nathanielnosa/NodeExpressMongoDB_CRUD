const Employee = require('../model/Employee')


const getAllEmployee = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.sendStatus(204)
  res.json(employees)
}

const createEmployee = async (req, res) => {
  if (!req.body?.firstname || !req.body?.department) {
    return res.status(400).json({ "Message": "Fields cannot be empty" })
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      department: req.body.department,
    });
    res.status(201).json(result)
  } catch (error) {
    console.log(error.message);
  }
}

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) return res.sendStatus(400)
  const employee = await Employee.findOne({ _id: req.body.id }).exec()
  if (!employee) {
    return res.status(204).json({ "Message": "No employee with this id" })
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname
  if (req.body?.department) employee.department = req.body.department
  const result = await employee.save()
  res.json(result)
}

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) return res.sendStatus(400)
  const employee = await Employee.findOne({ _id: req.body.id }).exec()
  if (!employee) {
    return res.status(204).json({ "Message": "No employee with this id" })
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result)
}

const getEmployee = async (req, res) => {
  if (!req?.params?.id) return res.sendStatus(400)
  const employee = await Employee.findOne({ _id: req.params.id }).exec()
  if (!employee) {
    return res.status(204).json({ "Message": "No employee with this id" })
  }
  res.json(employee)
}

module.exports = { getAllEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployee }