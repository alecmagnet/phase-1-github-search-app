document.addEventListener('DOMContentLoaded', () => {
	listenFormUserName()
})

//EVENT LISTENER 
function listenFormUserName () {
	document.querySelector('#github-form').addEventListener('submit', (e) => {
		e.preventDefault()
		console.log(e)
		console.log(e.target.search.value)
		let userName = e.target.search.value
		fetchByUserName(userName)
	})
}

//QUERY API AND FOREACH TO A RENDER CALLBACK
function fetchByUserName (userName) {
	fetch(`https://api.github.com/search/users?q=${userName}`)
	.then(res => res.json())
	.then(json => {
		console.log(json)
		json.items.forEach(renderQueryResults)
		//CALLBACK TO RENDER
	})
}

//RENDER CALLBACK
function renderQueryResults (user) {
	let liName = document.createElement('li')
	liName.textContent = `User Login: ${user.login}`

	let ulUserInfo = document.createElement('ul')
	liName.append(ulUserInfo)

	let avatar = document.createElement('img')
	avatar.src = user.avatar_url
	avatar.alt = `${user.login}'s avatar`
	avatar.style.maxWidth = 150
	//avatar.style.border = black
	let liAvatar = document.createElement('li')
	liAvatar.append(avatar)

	let aUrl = document.createElement('a')
	aUrl.href = user.html_url
	aUrl.textContent = user.html_url
	//console.log(aUrl)
	let liUrl = document.createElement('li')
	liUrl.style.paddingBottom = 20
	liUrl.textContent = (`${user.login}'s URL:`)
	liUrl.append(aUrl)
	
	//APPEND ELEMENTS TO CONTAINERS
	ulUserInfo.append(liAvatar, liUrl)
	liName.append(ulUserInfo)
	document.querySelector('#user-list').append(liName)

	liName.addEventListener('click', () => {
		console.log(liName)
		fetch(`https://api.github.com/users/${user.login}/repos`)
		.then(res => res.json())
		.then(json => json.forEach(fetchRepo))
	})

	function fetchRepo(arr) {
		console.log(arr.name)
		console.log(arr.html_url)
		console.log(liName)
		console.log(aUrl)

		liUrl.style.paddingBottom = 0

		let liRepo = document.createElement('li')
		liRepo.textcontent = 'Repos:'
		liRepo.style.paddingBottom = 20
		liName.append(liRepo)

		// let ulRepos = document.createElement('ul')
		// liRepo.appendChild(ulRepos)

		// let liRepoName = document.createElement('li')
		// ulRepos.appendChild(liRepoName)

		// liRepoName.textContent = `${arr.name}: `
		
		// //let liRepoURL = document.createElement('li')
		// let aRepoUrl = document.createElement('a')
		// aRepoUrl.href = arr.html_url
		// aRepoUrl.textContent = arr.html_url
		// liRepoName.append(aRepoUrl)
	}
}