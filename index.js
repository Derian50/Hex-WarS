var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var path = require('path')
var fs = require('fs')
// Отслеживание порта
server.listen(3000)
var countGames = 0
// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', function(request, respons) {	
	app.use(express.static(path.join(__dirname, '/public')))
	respons.sendFile(__dirname + '/index.html')
})

// Массив со всеми подключениями
connections = []
// Массив со всеми комнатами, которые еще не запустились (внутри айдишники участников)
roomsId = []
// Массив со всеми играми, которые уже идут (внутри айдишники участников)
gamesId = []
// Массив с информацией о всех объектах
gamesData = [] // [id,[units][builds][arrows]]
// Массив с инфой о комнатах
//[Название, Кол-во игроков, макс кол-во игроков, тип игры, карта, дата создания, хост]
roomsData = [] 
roomsDataAboutPlayers = []
roomsDataAboutSockets = []
hexArr = []

lobbyesData = [] //[айдишник комнаты, хост или нет, имя, команда, цвет]
// Функция, которая сработает при подключении к странице
// Считается как новый пользователь


io.sockets.on('connection', function(socket) {
	
	file = fs.readFileSync('mapInfo.json')
	hexArr = JSON.parse(file)
	io.sockets.emit('loadPage', 'title')
	
	socket.on('getMapInfo', function(){
		socket.emit('setMapInfo', hexArr)
	})
	socket.on('getSide', function(data){
		console.log('Он хочет узнать свою сторону!')
		// for(var i = 0; i < roomsDataAboutSockets.length; i++){
		// 	for(var j = 1; j < roomsDataAboutSockets[i].length; j++){
		// 		console.log(roomsDataAboutSockets[i].length)
		// 		console.log(j)
		// 		console.log(roomsDataAboutSockets[i][j].id)
		// 		socket.to(roomsDataAboutSockets[i][j].id).emit('setSide', j-1)
		// 	}
		// }
		tempId = data[0]
		tempNickname = data[1]
		for(var i = 0; i < lobbyesData.length; i++){
			for(var j = 0; j < lobbyesData[i].length; j++){
				console.log('id ' + lobbyesData[i][j][0])
				if(lobbyesData[i][j][0] == tempId){
					console.log('nick ' + lobbyesData[i][j][2])
					if(lobbyesData[i][j][2] == tempNickname){
						
						socket.emit('setSide', lobbyesData[i][j][3])
					}
				}
			}
		}
		
	})
	socket.on('editMapInfo', function(newHexArr){
		hexArr = newHexArr
		fs.writeFileSync('mapInfo.json', JSON.stringify(hexArr))
		
	})
	// Добавление нового соединения в массив
	connections.push(socket)
	socket.on('updateInfoAboutGame', function(data){
		console.log('updateInfoAboutGame')
		gamesData = data
		socket.broadcast.emit('sentInfoAboutGame', gamesData)
	})
	socket.on('startGame', function(lobbyesInfo, roomsInfo){
		var destroyInfoAboutSockets = null
		socket.emit('startGame')
		socket.emit('loadPage','main')
		for(var i = 0; i < roomsDataAboutSockets.length; i++){
			if(roomsDataAboutSockets[i][0] == lobbyesInfo[0][0]){

				for(var j = 1; j < roomsDataAboutSockets[i].length; j++){
					socket.to(roomsDataAboutSockets[i][j].id).emit('startGame')
					socket.to(roomsDataAboutSockets[i][j].id).emit('loadPage', 'main')
				}
				//roomsData.splice(i, 1)
				//lobbyesData.splice(i, 1)
				
				io.sockets.emit('setRoomsData', roomsData, countGames)
				destroyInfoAboutSockets = i
				
				//roomsDataAboutSockets.splice(destroyInfoAboutSockets, 1)
				//roomsDataAboutPlayers.splice(destroyInfoAboutSockets, 1)
			}
		}
	})
	socket.on('getDataAboutPlayers', function(roomId){
		for(var i = 0; i < roomsDataAboutPlayers.length; i++){
			console.log(roomId, i, roomsData)
			console.log(roomsDataAboutPlayers)
			if(roomId == roomsData[i][0]){
				console.log('emit')
				socket.emit('setDataAboutPlayers', roomsDataAboutPlayers[i])
				
			}
		}
	})
	socket.on('updateLobbyesData', function(roomId, lobbyesInfo){
		for(var i = 0; i < lobbyesData.length; i++){
			if(roomId == lobbyesData[i][0][0]){
				lobbyesData[i] = lobbyesInfo.slice()
				socket.emit('setLobbyesData', lobbyesData[i])
				for(var j = 1; j < roomsDataAboutSockets[i].length; j++){
					socket.to(roomsDataAboutSockets[i][j].id).emit('setLobbyesData', lobbyesData[i])
				}
			}
		}
	})
	socket.on('getLobbyesData', function(roomId){
		for(var i = 0; i < lobbyesData.length; i++){
			if(roomId == lobbyesData[i][0][0]){
				
				
				socket.emit('setLobbyesData', lobbyesData[i])
			}
		}
	})
	socket.on('pageIsLoad', function(){
		socket.emit('setRoomsData', roomsData, countGames)
	})
	var getFreeTeamNumber = function(lobbyesInfo, playerPerTeam){
		var result = 1
		var t = 0
			for(var i = 0; i < lobbyesInfo.length; i++){
				if(lobbyesInfo[i][3] == result) t++
				if(t == playerPerTeam){
					t = 0
					result++
					i = 0
				} 
			}
		return result
	}
	
	var getFreeColor = function(lobbyesInfo){
		var arrColor = ['color: blue;',
		'color: red;',
		'color: yellow;',
		'color: aqua;',
		'color: indigo;',
		'color: orange;',
		'color: green;',
		'color: hotpink;',
		'color: silver;',
		'color: LightSteelBlue;',
		'color: DarkGreen;',
		'color: saddlebrown;']

		colorStart = 0
		for(var i = 0; i < lobbyesInfo.length; i++){
			if(arrColor[colorStart] == lobbyesInfo[i][4]){
				colorStart++
			}
		}
		return arrColor[colorStart]
	}
	socket.on('connectToRoom', function(roomId, data){
		for(var i = 0; i < roomsData.length; i++){
			if(roomId == roomsData[i][0]){
				playerPerTeam = howMuchCanBePlayersPerTeam(roomsData[i])
				roomsData[i][2]++
				roomsDataAboutPlayers[i].push(data[6])
				roomsDataAboutSockets[i].push(socket)	
				teamNumber = getFreeTeamNumber(lobbyesData[i], playerPerTeam)
				color = getFreeColor(lobbyesData[i])
				lobbyesData[i].push([data[0], lobbyesData[i].length, data[6], teamNumber, color])
				io.sockets.emit('setRoomsData', roomsData, countGames)
				for(var j = 1; j < roomsDataAboutSockets[i].length; j++){
					socket.to(roomsDataAboutSockets[i][j].id).emit('setLobbyesData', lobbyesData[i])
				}
			}
		}
		
	})
	var howMuchCanBePlayersPerTeam = function(roomInfo){
		switch(roomInfo[4]){
			case '1x1':
				return 1
				break
			case '2x2':
				return 2
				break
			case '3x3':
				return 3
				break
			case '4x4':
				return 4
				break
			case '2x2x2':
				return 2
				break
			case '2x2x2x2':
				return 2
				break
			case 'FFA':
				return 1
				break
		}
	}
	socket.on('createRoom', function(data){
		countGames++
		roomsData.push(data)
		roomsDataAboutPlayers.push([data[0], data[6]])
		roomsDataAboutSockets.push([data[0], socket]) //data[0] - это айдишник комнаты
		lobbyesData.push([[data[0], 0, data[6], 1, 'color: blue;']])
		io.sockets.emit('setRoomsData', roomsData, countGames)
	})

	var leave = function(roomId){
		for(var i = 0; i < roomsData.length; i++){
			console.log('1..')
			console.log(roomId, roomsData)
			if(roomId == roomsData[i][0]){		
				console.log('2..')			
				for(var j = 0; j < roomsDataAboutSockets[i].length; j++){	
					console.log('3..')			
					if(roomsDataAboutSockets[i][j].id == socket.id){
						console.log('Ливай нахуй')
						roomsData[i][2]--
						roomsDataAboutPlayers[i].splice(j, 1)
						roomsDataAboutSockets[i].splice(j, 1)
						lobbyesData[i].splice(j-1, 1)
						if(roomsData[i][2] < 1){ 
							roomsData.splice(i ,1)
							lobbyesData.splice(i, 1)
							roomsDataAboutPlayers.splice(i, 1)
							roomsDataAboutSockets.splice(i, 1)
						}
						break
					}
				}
			}
			if(lobbyesData[i]){
				for(var j = 0; j < lobbyesData[i].length; j++){

					lobbyesData[i][j][1] = j
					lobbyesData[i][j][1] = j
					/* for(var k = 0; k < lobbyesData[i][j].length; k++){
						lobbyesData[i][j][1] = k
					} */
				}
			}
			if(roomsDataAboutSockets[i]){
				for(var j = 1; j < roomsDataAboutSockets[i].length; j++){
					socket.to(roomsDataAboutSockets[i][j].id).emit('setRoomsData', roomsData, countGames)
					socket.to(roomsDataAboutSockets[i][j].id).emit('setLobbyesData', lobbyesData[i])
				}
			}
			
		}
		io.sockets.emit('setRoomsData', roomsData, countGames)
	}
	socket.on('playerLeave', function(roomId){
		console.log('Готовься ливать нахуй')
		leave(roomId)
	})
		// Функция, которая срабатывает при отключении от сервера
	socket.on('disconnect', function(data) {
		// Удаления пользователя из массива
		roomId = -1
		//найти сокет в массиве сокетов
		for(var i = 0; i < roomsDataAboutSockets.length; i++){
			for(var j = 0; j < roomsDataAboutSockets[i].length; j++){
				if(socket.id == roomsDataAboutSockets[i][j].id){
					roomId = roomsDataAboutSockets[i][0]
				}
			}
		}
		leave(roomId)
		connections.splice(connections.indexOf(socket), 1)
		console.log("Отключились")
	})
})