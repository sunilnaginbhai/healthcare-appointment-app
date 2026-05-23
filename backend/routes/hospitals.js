const express = require('express');
const Hospital = require('../models/Hospital');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all hospitals
router.get('/', async (req, res) => {
  try {
    const { city, search } = req.query;
    let where = {};
    if (city) where.city = city;
    if (search) {
      where.name = { [require('sequelize').Op.like]: `%${search}%` };
    }

    const hospitals = await Hospital.findAll({ where });
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get hospital by ID
router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findByPk(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create hospital (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update hospital (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const hospital = await Hospital.findByPk(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }
    const updatedHospital = await hospital.update(req.body);
    res.json(updatedHospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
