
const router = require('express').Router();
let Match = require('../models/Match');

router.route('/').get((req, res) => {
  Match.find()
    .populate('teamA')
    .populate('teamB')
    .then(matches => res.json(matches))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const teamA = req.body.teamA;
  const teamB = req.body.teamB;
  const date = req.body.date;
  const venue = req.body.venue;

  const newMatch = new Match({
    teamA,
    teamB,
    date,
    venue
  });

  newMatch.save()
    .then(() => res.json('Match added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Match.findById(req.params.id)
    .populate('teamA')
    .populate('teamB')
    .then(match => res.json(match))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Match.findByIdAndDelete(req.params.id)
    .then(() => res.json('Match deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Match.findById(req.params.id)
    .then(match => {
      match.teamA = req.body.teamA;
      match.teamB = req.body.teamB;
      match.date = req.body.date;
      match.venue = req.body.venue;
      match.score = req.body.score;
      match.status = req.body.status;

      match.save()
        .then(() => res.json('Match updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
