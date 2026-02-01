//endpoints

const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');


router.post('/create', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem trying to create a task' });
    }
});


router.get('/', async (req, res) => {
    try {
        const task = await Task.find();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem trying to get tasks' })
    }
});

router.get("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: "invalid ID" });
    }
});
router.put("/markAsCompleted/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: "invalid ID" });
    }
});

router.put("/id/:_id", async (req, res) => {
    try {
        const { title } = req.body;
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.title = title;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task successfully deleted" });
    } catch (error) {
        res.status(400).json({ message: "invalid ID" });
    }
});


module.exports = router;
