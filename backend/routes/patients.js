const express = require('express');
const User = require('../models/User');
const { auth, patientAuth } = require('../middleware/auth');

const router = express.Router();

// Get patient profile
router.get('/profile', patientAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update patient profile
router.put('/profile', patientAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const updatedUser = await user.update(req.body);
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
