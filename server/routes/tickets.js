
const router = require('express').Router();
let Ticket = require('../models/Ticket');

router.route('/').get((req, res) => {
  Ticket.find()
    .populate('user')
    .populate('match')
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const match = req.body.match;
  const seatNumber = req.body.seatNumber;

  const newTicket = new Ticket({
    user,
    match,
    seatNumber
  });

  newTicket.save()
    .then(() => res.json('Ticket added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Ticket.findById(req.params.id)
    .populate('user')
    .populate('match')
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ticket deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      ticket.user = req.body.user;
      ticket.match = req.body.match;
      ticket.seatNumber = req.body.seatNumber;
      ticket.status = req.body.status;

      ticket.save()
        .then(() => res.json('Ticket updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
