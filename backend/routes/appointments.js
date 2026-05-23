const express = require('express');
const Appointment = require('../models/Appointment');
const { auth, patientAuth } = require('../middleware/auth');

const router = express.Router();

// Book appointment
router.post('/', patientAuth, async (req, res) => {
  try {
    const { doctorId, hospitalId, appointmentDate, timeSlot, reason } = req.body;

    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      where: {
        doctorId,
        appointmentDate,
        timeSlot,
        status: 'scheduled',
      },
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Time slot is not available' });
    }

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      hospitalId,
      appointmentDate,
      timeSlot,
      reason,
    });

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient appointments
router.get('/patient/my-appointments', patientAuth, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patientId: req.user.id },
      include: [
        { model: Doctor, include: [{ model: User, attributes: ['firstName', 'lastName'] }] },
        { model: Hospital, attributes: ['name', 'city', 'phone'] },
      ],
      order: [['appointmentDate', 'DESC']],
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointment by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: Doctor, include: [{ model: User, attributes: ['firstName', 'lastName', 'phone'] }] },
        { model: Hospital },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel appointment
router.put('/:id/cancel', patientAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.patientId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedAppointment = await appointment.update({
      status: 'cancelled',
      cancelledAt: new Date(),
      cancellationReason: req.body.reason,
    });

    res.json({
      message: 'Appointment cancelled successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reschedule appointment
router.put('/:id/reschedule', patientAuth, async (req, res) => {
  try {
    const { appointmentDate, timeSlot } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.patientId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedAppointment = await appointment.update({
      appointmentDate,
      timeSlot,
    });

    res.json({
      message: 'Appointment rescheduled successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
