const Combo = require('../models/Combo');

//get all combos
exports.getAllCombos = async (req, res, next) => {
  try {
    const { available } = req.query;
    
    const combos = await Combo.getAll(available === 'true');
    console.log('Retrieved combos:', combos.length);

    res.json({
      count: combos.length,
      combos
    });
  } catch (error) {
    next(error);
  }
};

// Get combo by ID
exports.getComboById = async (req, res, next) => {
  try {
    const combo = await Combo.findById(req.params.id);

    if (!combo) {
      console.log(`Combo with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Combo not found' });
    }
    console.log(`Combo with ID ${req.params.id} retrieved`);

    res.json({ combo });
  } catch (error) {
    next(error);
  }
};

//create combo (Staff only)
exports.createCombo = async (req, res, next) => {
  try {
    const comboData = req.body;

    const comboId = await Combo.create(comboData);

    const combo = await Combo.findById(comboId);

    console.log(`Combo with ID ${comboId} created successfully`);

    res.status(201).json({
      message: 'Combo created successfully',
      combo
    });
  } catch (error) {
    next(error);
  }
};

//update combo (Staff only)
exports.updateCombo = async (req, res, next) => {
  try {
    const comboData = req.body;

    const updated = await Combo.update(req.params.id, comboData);

    if (!updated) {
      console.log(`Combo with ID ${req.params.id} not found for update`);
      return res.status(404).json({ error: 'Combo not found' });
    }

    const combo = await Combo.findById(req.params.id);
    console.log(`Combo with ID ${req.params.id} updated successfully`);
    
    res.json({
      message: 'Combo updated successfully',
      combo
    });
  } catch (error) {
    next(error);
  }
};

// Delete combo (Staff only)
exports.deleteCombo = async (req, res, next) => {
  try {
    const deleted = await Combo.delete(req.params.id);

    if (!deleted) {
      console.log(`Combo with ID ${req.params.id} not found for deletion`);
      return res.status(404).json({ error: 'Combo not found' });
    }

    console.log(`Combo with ID ${req.params.id} deleted successfully`);
    res.json({
      message: 'Combo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

//toggle combo availability (Staff only)
exports.toggleAvailability = async (req, res, next) => {
  try {
    const updated = await Combo.toggleAvailability(req.params.id);

    if (!updated) {
      console.log(`Combo with ID ${req.params.id} not found for availability toggle`);
      return res.status(404).json({ error: 'Combo not found' });
    }

    const combo = await Combo.findById(req.params.id);
    console.log(`Combo with ID ${req.params.id} availability toggled successfully to ${combo.available}`);
    
    res.json({
      message: 'Combo availability updated',
      combo
    });
  } catch (error) {
    next(error);
  }
};
