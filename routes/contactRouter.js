const express = require('express')
const { contactModel } = require('../module/contact')


const contactRouter = express.Router()

contactRouter.get('/', async (req, res) => {

    try {
        let filter = {};
        // Check if a name query parameter is provided
        if (req.query.name) {
            // Case-insensitive regex match for the name
            filter.name = { $regex: new RegExp(req.query.name, 'i') };
        }

        const contact = await contactModel.find(filter)
        res.status(200).json({ msg: 'All contact details', contact })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

contactRouter.post('/add', async (req, res) => {

    try {
        const contact = new contactModel(req.body)
        await contact.save()
        res.status(200).json({ msg: 'New User has been added', contact })

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})


contactRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const post = await contactModel.findOne({ _id: id })
            await contactModel.findByIdAndDelete(id)
            res.status(200).send({ "msg": "User has been successfully deleted" })
    } catch (err) {
        res.status(400).send({ "msg": "post not found" })
    }
})

contactRouter.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await contactModel.findByIdAndDelete(id);
      res.status(200).json({ msg: 'User has been successfully deleted' });
    } catch (err) {
      res.status(400).json({ msg: 'User not found' });
    }
  });
  
  contactRouter.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const updatedContact = await contactModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res
        .status(200)
        .json({ msg: 'User successfully updated', contact: updatedContact });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  contactRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('Fetching user with ID:', id);

    try {
        const contact = await contactModel.findById(id);
        res.status(200).json({ msg: 'User details', contact });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = { contactRouter }