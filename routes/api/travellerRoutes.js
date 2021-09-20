const router = require('express').Router();
const { Traveller, Trip, Location } = require('../../models');

// GET all travellers
router.get('/', async (req, res) => {
    
    try {
        const userData =  await Traveller.findAll()
        res.status(200).json(userData);
    } catch {
        res.status(500).json(err);
    }

});

// GET a single traveller
router.get('/:id', async (req, res) => {
  try {
    const userData = await Traveller.findByPk(req.params.id, {
        include: [ {model: Location, through: Trip, as: 'planned_trips'}]
    });
    if (!userData){
        res.status(404).json({ message: "User does not exist"});
    }
    res.status(200).json(userData);

  } catch {
    res.status(500).json({ message: "Server Failure"});
  }
});

// CREATE a traveller
router.post('/', async (req, res) => {
  try {
    const userData = await Traveller.create(req.body);
    res.status(200).json(userData);
  } catch {
    res.status(400).json(err);
  }
});

// DELETE a traveller
router.delete('/:id', async (req, res) => {
 try {
    const userData = await Traveller.destroy({
        where: {
            id: req.params.id
        }
    });

    if (!userData){
        res.status(404).json({ message: 'User not found!'});
    }

    res.status(200).json(userData);
    res.status(200).json({ message: 'Success! User Deleted'});

 } catch {

    res.status(500).json(err);
 }
});

module.exports = router;
