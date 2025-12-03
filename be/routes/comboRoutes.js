const express = require('express');
const { body } = require('express-validator');
const comboController = require('../controllers/comboController');
const { auth, isStaff } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

// Validation rules
const comboValidation = [
  body('combo_name').trim().notEmpty().withMessage('Combo name is required'),
  body('description').optional().trim(),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('image_url').optional().trim(),
  body('available').optional().isBoolean().withMessage('Available must be a boolean')
];

// Public routes
router.get('/', comboController.getAllCombos);
router.get('/:id', comboController.getComboById);

// Staff routes
router.post('/', auth, isStaff, comboValidation, validate, comboController.createCombo);
router.put('/:id', auth, isStaff, comboValidation, validate, comboController.updateCombo);
router.delete('/:id', auth, isStaff, comboController.deleteCombo);
router.patch('/:id/toggle', auth, isStaff, comboController.toggleAvailability);

module.exports = router;
