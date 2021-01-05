const express = require('express');
const router = express.Router();
const Writer = require('../models/writers.js');
const seed = require('../models/seed.js');

// SEED ROUTE
router.get('/seed', (req, res) => {
    Writer.create(seed, (error, data) => {
        res.redirect('/')
    })
});

// CREDITS PAGE
router.get('/credits', (req, res) => {
    res.render('credits.ejs')
});

//CREATE ROUTE
router.get('/new', (req, res) => {
    res.render('new.ejs')
});

router.post('/', (req, res) => {
    try {if(req.body.notableAwards) {
        req.body.notableAwards = true
      } else {
      req.body.notableAwards = false
      }} catch(e) {
        req.body.notableAwards = false
      }
    Writer.create(req.body, (error, createdWriter) => {
        res.redirect('/')
    })
}); 

// INDICES
router.get('/', (req, res) => {
    Writer.find({}, (error, allWriters) => {
        res.render('index.ejs', {
            writers: allWriters
        })
    })
});

router.get('/index_black_writers', (req, res) => {
    Writer.find({ identity: 'Black' }, (error, blackWriters) => {
        res.render('index_black_writers.ejs', {
            writers: blackWriters
        })
    })
});

router.get('/index_asian_writers', (req, res) => {
    Writer.find({ identity: 'Asian' },(error, asianWriters) => {
        res.render('index_asian_writers.ejs', {
            writers: asianWriters
        })
    })
});


router.get('/index_indigenous_writers', (req, res) => {
    Writer.find({ identity: 'Indigenous'}, (error, indigenousWriters) => {
        res.render('index_indigenous_writers.ejs', {
            writers: indigenousWriters
        })
    })
});

router.get('/index_latinx_writers', (req, res) => {
    Writer.find({identity: 'Latinx'}, (error, latinxWriters) => {
        res.render('index_latinx_writers.ejs', {
            writers: latinxWriters
        })
    })
});

router.get('/index_menasa_writers', (req, res) => {
    Writer.find({identity: 'MENASA'}, (error, menasaWriters) => {
        res.render('index_menasa_writers.ejs', {
            writers: menasaWriters
        })
    })
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    Writer.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/');
    })
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    Writer.findById(req.params.id, (error, foundWriter) => {
        res.render('show.ejs', {
            writer: foundWriter
        })
    })
});

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    Writer.findById(req.params.id, (error, foundWriter) => {
        res.render(
            'edit.ejs',
            {
                writer: foundWriter
            }
        )
    })
});

router.put('/:id', (req, res) => {
    if (req.body.notableAwards === '2020 Pulitzer Prize for Drama') {
        req.body.notableAwards = true;
      } else {
        req.body.notableAwards = false;
      }
    Writer.findByIdAndUpdate(req.params.id, req.body, (error, updatedModel) => {
        res.redirect('/:id')
    })
});

module.exports = router;