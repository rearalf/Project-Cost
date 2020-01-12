const router = require('express').Router();

// Models
const User = require('../models/User');
const Project = require('../models/Project');

const auth = require('../middleware/auth');

router.get('/', (req, res) => {
	res.send('Hello Word');
});

// See all users
router.get('/signin', async (req, res) => {
	const allUsers = await User.find();
	res.json(allUsers);
});

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
	const regExp = new RegExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/
	);
	const valiPassword = regExp.test(password);
	if (emailUser) {
		res.status(401).json({ message: 'The email already exists' });
	}
	else {
		if (!valiPassword) {
			res.status(401).json({
				message:
					'The password does not meet the parameters, have at least 1 lowercase, 1 uppercase, 1 number and character ($ @ $!% *? &)',
			});
		}
		else {
			vali = true;
			newUser.password = await newUser.encryptPassword(password);
			await newUser
				.save()
				.then(res.status(200).json({ message: 'User successfully saved' }))
				.catch(err => {
					res.status(401).json({ message: 'Save failed', err });
				});
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
		return res.send({ message: 'The email dosent exists' });
	}

	const verficPassword = await user.matchPassword(password);
	if (!verficPassword) {
		return res.status(401).json({ message: 'Wrong password' });
	}
	const token = await user.generateAuthToken(user.email);
	return res.status(200).json({ token });
});

router.get('/project', auth, async (req, res) => {
	const allProjects = await Project.find();
	res.json(allProjects);
});

router.post('/project', auth, async (req, res) => {
	const { title, description } = req.body;
	const newProject = new Project({ title, description });
	await newProject
		.save()
		.then(res.status(200).json({ message: 'Project successfully saved' }))
		.catch(err => {
			res.status(401).json({ message: 'Save failed', err });
		});
});

router.delete('/project/:id', auth, async (req, res) => {
	await Project.findByIdAndDelete(req.params.id);
	res.json({ message: 'Project successfull removed' });
});

module.exports = router;
