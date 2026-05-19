const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE NOTE
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({
            title,
            content,
            userId: req.user.id
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET USER NOTES
router.get("/", authMiddleware, async (req, res) => {
    try {
        const notes = await Note.findAll({
            where: {
                userId: req.user.id
            }
        });

        res.json(notes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE NOTE
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Note.destroy({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        res.json({
            message: "Note deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// UPDATE NOTE
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const { title, content } = req.body;

        const note = await Note.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        note.title = title;
        note.content = content;

        await note.save();

        res.json({
            message: "Note updated successfully",
            note
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;