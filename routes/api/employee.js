const express = require('express');
const router = express.Router()
const employeeRoutes = require('../../controllers/employeesController')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
  .get(employeeRoutes.getAllEmployee)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeRoutes.createEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeRoutes.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), employeeRoutes.deleteEmployee);

router.route('/:id')
  .get(employeeRoutes.getEmployee)

module.exports = router