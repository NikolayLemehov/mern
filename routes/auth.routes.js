const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
      check('email', 'Не корректный email').isEmail(),
      check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Не корректные данные при регистрации',
          });
        }
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
          return res.status(400).json({message: 'Такой пользователь уже существует'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});
        await user.save();
        return res.status(201).json({message: 'Пользователь создан'});
      } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
      }
    });

// /api/auth/login
router.post(
    '/login',
    [
      check('email', 'Не корректный email').normalizeEmail().isEmail(),
      check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
      try {
        console.log('/login');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Не корректные данные при входе в систему',
          });
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
          return res.status(400).json({message: 'Пользователь не найден'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({message: 'Не верный пароль'});
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );
        return res.status(200).json({token, userId: user.id});
      } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так /login, попробуйте снова'});
      }
    });

module.exports = router;
