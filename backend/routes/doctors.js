const express = require('express');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Hospital = require('../models/Hospital');
const { auth, doctorAuth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const { specialization, hospitalId } = req.query;
    let where = {};
    if (specialization) where.specialization = specialization;
    if (hospitalId) where.hospitalId = hospitalId;

    const doctors = await Doctor.findAll({
      where,
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email', 'phone'] },
        { model: Hospital, attributes: ['id', 'name', 'city'] },
      ],
    });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email', 'phone'] },
        { model: Hospital, attributes: ['id', 'name', 'city', 'phone'] },
      ],
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create doctor (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { userId, hospitalId, specialization, experience, consultationFee, bio } = req.body;

    const doctor = await Doctor.create({
      userId,
      hospitalId,
      specialization,
      experience,
      consultationFee,
      bio,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update doctor (Doctor or Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const updatedDoctor = await doctor.update(req.body);
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
