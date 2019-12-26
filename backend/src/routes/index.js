const router = require('express').Router();

// Models
const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Hello Word');
});

// See all users
router.get('/signup', async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers);
});

// For register in the api
router.post('/signup', async (req, res) => {
    let vali = false;
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const emailUser = await User.findOne({ email: email });
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/);
    const valiPassword = regExp.test(password);
    if (emailUser) {
        res.json({ message: 'The email already exists', vali });
    } else {
        if (!valiPassword) {
            res.json({ message: 'The password does not meet the parameters, have at least 1 lowercase, 1 uppercase, 1 number and character ($ @ $!% *? &)', vali })
        }
        else {
            vali = true;
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            const token = jwt.sign({ _id: newUser._id }, 'secretkey');
            res.status(200).json({ token, messege: 'User succefull saved', vali });
        }
    }
});

router.delete('/signup/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User successfull removed' });
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).send('The email dosen0t exists');
    }

    const verficPassword = await user.matchPassword(password);
    if (!verficPassword) {
        return res.status(401).json({ message: 'Wrong password' });
    }

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token });
});

router.get('/project', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'Lorem ipsum',
            date: '2019-11-17T20:39:05.211Z',
        },
        {
            _id: 1,
            name: 'Task two',
            description: 'Lorem ipsum',
            date: '2019-11-17T20:39:05.211Z',
        },
        {
            _id: 1,
            name: 'Task three',
            description: 'Lorem ipsum',
            date: '2019-11-17T20:39:05.211Z',
        },
    ]);
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'Lorem ipsum',
            date: '2019-11-17T20:39:05.211Z',
        },
        {
            _id: 1,
            name: 'Task two',
            description: 'Lorem ipsum',
            date: '2019-11-17T20:39:05.211Z',
        },
        {
            _id: 1,
            name: 'Task three',
            description: 'Lorem ipsum',
            date: '2019-11-17T20:39:05.211Z',
        },
    ]);
});

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Aunthorize Request');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Aunthorize Request');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}
