const router = require('express').Router();
const Notess = require("../models/Notess");
var fetchuser = require("../middleware/Fetchuser")
const { body, validationResult } = require('express-validator');

// route : 1 get all notes using get:"/api/auth/fetchallnotes".login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notess.find({ user: req.user.id })
        res.json(notes)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("internel server problem some problem in *try^ in *auth.js^")
    }
})
// route : 2 add a new note using "post: /api/auth/addnote".login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notess({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// route : 3  Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it
    let note = await Notess.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notess.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });

})
// route : 4  delete an existing Note using: delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {   
    // Find the note to be deleted and delete it
    let note = await Notess.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
//allow deletaion if this note is own
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
//
    note = await Notess.findByIdAndDelete(req.params.id)
    res.json({"success": "Your note have been deleted", note:note });

})

module.exports = router