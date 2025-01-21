

const LOGGED_USER = 'loggedInUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
	getLoggedInUser,
	saveLoggedInUser,
}

function getUsers() {
	console.log('getUsers called')
	// return httpService.get(`user`)
}

async function getById(userId) {
	console.log('getById called with userId:', userId)
	// const user = await httpService.get(`user/${userId}`)
	// return user
}

function remove(userId) {
	console.log('remove called with userId:', userId)
	// return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
	console.log('update called with _id:', _id, 'and score:', score)
	// const user = await httpService.put(`user/${_id}`, { _id, score })

	// When admin updates other user's details, do not update loggedInUser
	const loggedInUser = getLoggedInUser() // Might not work because its defined in the main service???
	if (loggedInUser._id === user._id) saveLoggedInUser(user)

	// return user
}

async function login(userCred) {
	console.log('login called with userCred:', userCred)
	// const user = await httpService.post('auth/login', userCred)
	// if (user) return saveLoggedInUser(user)
}

async function signup(userCred) {
	console.log('signup called with userCred:', userCred)
	if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	userCred.score = 10000

	// const user = await httpService.post('auth/signup', userCred)
	// return saveLoggedInUser(user)
}

async function logout() {
	console.log('logout called')
	sessionStorage.removeItem(LOGGED_USER)
	// return await httpService.post('auth/logout')
}

function getLoggedInUser() {
	return JSON.parse(sessionStorage.getItem(LOGGED_USER))
}

function saveLoggedInUser(user) {
	user = { 
		_id: user._id, 
		fullname: user.fullname, 
		imgUrl: user.imgUrl, 
		score: user.score, 
		isAdmin: user.isAdmin 
	}
	sessionStorage.setItem(LOGGED_USER, JSON.stringify(user))
	return user
}
