const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const {from} = req.body;
    const code = shortid.generate();
    const existing = await Link.findOne({from});
    if (existing) {
      return res.json({link: existing});
    }
    const to = baseUrl + '/t/' + code;
    const link = new Link({
      code, to, from, owner: req.user.userId,
    });
    await link.save();
    return res.status(201).json({link});
  } catch (e) {
    return res.status(500).json({message: 'Что-то пошло не так link /generate, попробуйте снова'});
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId});
    return res.json(links);
  } catch (e) {
    return res.status(500).json({message: 'Что-то пошло не так link /, попробуйте снова'});
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    return res.json(link);
  } catch (e) {
    return res.status(500).json({message: 'Что-то пошло не так link /:id, попробуйте снова'});
  }
});

module.exports = router;
