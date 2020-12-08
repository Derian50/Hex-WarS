var cvs = document.getElementById('canvas')
var ctx = cvs.getContext('2d')
var width = 0,
    height = 0
cvs.width = width
cvs.height = height


var mainMenu = document.getElementById('mainMenu')
var lobbyPage = document.getElementById('lobbyPage')
var editorPage = document.getElementById('editorPage')

var container = document.getElementById('container')
var inputName = document.getElementById('inputName')
var inputMap = document.getElementById('inputMap')
var mapType = document.getElementById('mapType')
var createGame = document.getElementById('createGame')
var saveName = document.getElementById('saveName')

var mapType_1x1 = document.getElementById('mapType_1x1')
var mapType_2x2 = document.getElementById('mapType_2x2')
var mapType_3x3 = document.getElementById('mapType_3x3')
var mapType_4x4 = document.getElementById('mapType_4x4')
var mapType_2x2x2 = document.getElementById('mapType_2x2x2')
var mapType_2x2x2x2 = document.getElementById('mapType_2x2x2x2')
var mapType_FFA = document.getElementById('mapType_FFA')
var playersCountArr = []
for(var i = 2; i <= 12; i++){
    playersCountArr.push(document.getElementById('playersCount_' + i))
}
var playersCount = document.getElementById('playersCount')
var blockPlayersCount = document.getElementById('blockPlayersCount')

var mapSize_Duel = document.getElementById('mapSize_Duel' )
var mapSize_VerySmall = document.getElementById('mapSize_VerySmall' )
var mapSize_Small = document.getElementById('mapSize_Small')
var mapSize_Medium = document.getElementById('mapSize_Medium')
var mapSize_Large = document.getElementById('mapSize_Large')
var mapSize_VeryLarge = document.getElementById('mapSize_VeryLarge')

var mapSize = document.getElementById('mapSize')
var mapPlayerCount = document.getElementById('mapPlayerCount')
var table = document.getElementById('table')

var tbody = document.getElementById('tbody')
var connectButton = document.getElementById('connectButton')

var leaveButton = document.getElementById('leaveButton')
var teamDiv = document.getElementById('teamDiv')
var teamButton = document.getElementById('teamButton')

var colorDiv = document.getElementById('colorDiv')
var colorButton = document.getElementById('colorButton')

var tbody2 = document.getElementById('tbody2')
var startGameButton = document.getElementById('startGameButton')

var editorButton = document.getElementById('editorButton')
var tbody3 = document.getElementById('tbody3')
var changeMapButton = document.getElementById('changeMapButton')
var createNewMapButton = document.getElementById('createNewMapButton')
var inputMapName = document.getElementById('inputMapName')

var mapEditId
var infoAboutMaps = []
    var arrWithMapsId = []
document.onclick = function(e){
    target = e.target
    var teamDiv = document.getElementById('teamDiv')
    var colorDiv = document.getElementById('colorDiv')
    
    var teamButton = document.getElementById('teamButton')
    var buttonColor = document.getElementById('buttonColor')
    if(teamDiv){
        
        var roomId = -1
        if(lobbyesData.length > 0) roomId = lobbyesData[0][0]
        var roomsIndex = -1
        for(var i = 0; i < roomsData.length; i++){
            if(roomsData[i][0] == roomId) roomsIndex = i
        }
        for(var i = 0; i < 12; i++){
            if(target == teamDiv.childNodes[i]){
                if(getCanChangeTeam(e.target.innerHTML, roomsData[roomsIndex], lobbyesData, infoAboutGame[6])){
                    teamButton.innerHTML = e.target.innerHTML
                    changeTeam(e.target.innerHTML, lobbyesData, infoAboutGame[6])
                    socket.emit('updateLobbyesData', roomId, lobbyesData)
                }
                
            }else if(target == colorDiv.childNodes[i]){
                if(getCanChangeColor(lobbyesData, e.target.attributes.style.value)){
                    buttonColor.style = e.target.attributes.style.value + '; background-' + e.target.attributes.style.value
                    for(var j = 0; j < lobbyesData.length; j++){
                        if(infoAboutGame[6] == lobbyesData[j][2]){
                            lobbyesData[j][4] = e.target.attributes.style.value
                            socket.emit('updateLobbyesData', roomId, lobbyesData)
                        }
                    }
                }
                
            }
        }
    }
}
socket.emit('getInfoAboutMaps')
	
socket.on('setInfoAboutMaps', function(data){ //[[name, size, type][name,size,type]]
    infoAboutMaps = data.slice()
    console.log('я знаю о ', infoAboutMaps.length, ' картах')
    console.log('Первая из них ', infoAboutMaps[0][0], infoAboutMaps[0][1], infoAboutMaps[0][2])
})
socket.on('startGame', function(){
    console.log('Начать игру', lobbyesData, roomsData)
    
    mainMenu.className = 'row d-none'
    lobbyPage.className = 'row d-none'
    editorPage.className = 'row d-none'
    
})
startGameButton.onclick = function(){
	socket.emit('startGame', lobbyesData, roomsData, selectedRoomId)
    
}
var checkStartGame = function(lobbyesInfo, roomsInfo){
    if(roomsInfo[2] == roomsInfo[3]){
            if(infoAboutGame[6] == roomsInfo[6] || infoAboutGame.host == roomsInfo[6]){
                startGameButton.className = 'btn btn-secondary btn-lg'
            }else{
                startGameButton.className = 'btn btn-secondary btn-lg d-none'
            }
    }
}
var getCanChangeColor = function(lobbyesInfo, color){
    for(var i = 0; i < lobbyesInfo.length; i++){
        if(color == lobbyesInfo[i][4]) return false
    }
    return true
}

   
var getRoomIndex = function(id){
    for(var i = 0 ; i < roomsData.length; i++){
        if(roomsData[i][0] == id){
            return i
        }
    }
}
var createRandomNick = function(){
    min = 10000000;
    max = 99999999;
    return 'Москит №' + (Math.floor(Math.random() * (max - min)) + min)
}
var setTeamsInfo = function(roomId){
    index = getRoomIndex(roomId)
    console.log(roomsData, index, roomId)
    var count = howMuchCanBeTeams(roomsData[index])
    if(count > 10) count = 10
    var teamDiv = document.getElementById('teamDiv')
    if(teamDiv){
        for(var i = 0; i < count; i++){
            teamDiv.childNodes[i].className = "dropdown-item d-none"
        }
        for(var i = 0; i < count; i++){
            teamDiv.childNodes[i].className = "dropdown-item"
        }
    }
    
}
var howMuchCanBeTeams = function(roomInfo){
    console.log(roomInfo)
    switch (roomInfo[4]){
        case '1x1':
            return 2
            break
        case '2x2':
            return 2
            break
        case '3x3':
            return 2
            break
        case '4x4':
            return 2
            break
        case '2x2x2':
            return 3
            break
        case '2x2x2x2':
            return 4
            break
        case 'FFA':
            return roomInfo[3]
            break
        
    }
}
var howMuchCanBePlayersPerTeam = function(roomInfo){
    console.log(roomInfo)
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
var changeTeam = function(newTeam, lobbyesInfo, nickname){
    for(var i = 0; i < lobbyesInfo.length; i++){
        if(nickname == lobbyesInfo[i][2]){
            lobbyesData[i][3] = newTeam
        }
    }
    
}
var getCanChangeTeam = function(currentTeam, roomInfo, lobbyesInfo, nickname){
    var playerPerTeam = howMuchCanBePlayersPerTeam(roomInfo)
   // var currentTeam = -1
    var countOfCurrentTeam = 0
    for(var i = 0; i < lobbyesInfo.length; i++){
        if(lobbyesInfo[i][3] == currentTeam) countOfCurrentTeam++
    }
    if(countOfCurrentTeam < playerPerTeam){
        return true
    }else{
        return false
    }

}
var infoAboutGame = {
    id: 0,
    name: inputMap.value,
    currentPlayersCount: 1,
    playersCount: 2,
    gameType: '1x1',
    mapSize: 'Duel',
    host: inputName.value
}
inputName.value = createRandomNick()
var currentRoomsTable = []
var countGames = 0
var roomsData = []
var lobbyesData = [] //
//[айдишник комнаты, хост или нет, имя, команда, цвет]
var selectedRoomId = -1

socket.emit('pageIsLoad')
socket.on('setRoomsData', function(myRoomsData, gamesCount){
    
    countGames = gamesCount
    infoAboutGame.id = countGames-1
    roomsData = myRoomsData.slice()
   /*  for(var i = 0; i < roomsData.length; i++){
        console.log(lobbyesData, roomsData)
        if(lobbyesData[0][0] == roomsData[i][0]){
            checkStartGame(lobbyesData, roomsData)
        }
    } */
    createTable()
    createIdTable()
    createSpectrator()
    
})


var createIdTable = function(){
    
    currentRoomsTable = []
    for(var i = 0; i < roomsData.length; i++){
        var a = document.getElementById(roomsData[i][0])
        currentRoomsTable.push(a)
    }
}
var getCanICoonnectToThisRoom = function(id){
    for(var i = 0; i < roomsData.length; i++){
        if(roomsData[i][0] == id){
            if(roomsData[i][2] < roomsData[i][3]){
                return true
            }else{
                return false
            }
        }
    }
}
var createSpectrator = function(){

    for(var i = 0; i < currentRoomsTable.length; i++){
       /*  currentRoomsTable[i].style = ' ' */
        currentRoomsTable[i].onclick = function(e){
            for(var j = 0; j < currentRoomsTable.length; j++){
                currentRoomsTable[j].style = 'background-color: rgb(255, 255, 255);'

            }
            document.getElementById(e.target.parentNode.id).style = 'background-color: rgba(0, 0, 0, 0.15);'
            roomId = e.target.parentNode.id
            selectedRoomId = roomId
        }
    }
    
}
var createMapsHandler = function(){
    for(var i = 0; i < infoAboutMaps.length; i++){
        arrWithMapsId[i].onclick = function(e){
            for(var j = 0; j < infoAboutMaps.length; j++){
                arrWithMapsId[j].style = 'background-color: rgb(255, 255, 255);'

            }
            document.getElementById(e.target.parentNode.id).style = 'background-color: rgba(0, 0, 0, 0.15);'
            mapEditId = e.target.parentNode.id
        }
    }
}
if(localStorage.getItem('name')){
    if(localStorage.getItem('name')){
        inputName.value = localStorage.getItem('name')
    }else{
        inputName.value = createRandomNick()
    }
    
}
leaveButton.onclick = function(){
    infoAboutGame.id = selectedRoomId
    console.log(infoAboutGame.id)
    socket.emit('playerLeave', infoAboutGame.id)
    infoAboutGame = {
        id: 0,
        name: inputMap.value,
        currentPlayersCount: 1,
        playersCount: 2,
        gameType: '1x1',
        mapSize: 'Duel',
        host: inputName.value
    }
    
    tbody2.innerHTML = ''
    playersCount.innerHTML = '2'
    mapType.innerHTML = '1x1'
    mapSize.innerHTML = 'Duel'
    blockPlayersCount.className = 'row d-none'
    inputMap.value = ''
    infoAboutGame.playersCount = 2
    socket.emit('pageIsLoad')
    mainMenu.className = 'row'
    lobbyPage.className = 'row d-none'
    editorPage.className = 'row d-none'
}

saveName.onclick = function(){
    localStorage.clear()
    localStorage.setItem('name', inputName.value)
}
createGame.onclick = function(){
    infoAboutGame.host = inputName.value
    infoAboutGame.name = inputMap.value
    makeGame()
}
mapType_1x1.onclick = function(){
    showMapSize()
    mapType.innerHTML = '1x1'
    infoAboutGame.gameType = '1x1'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 2
}
mapType_2x2.onclick = function(){
    showMapSize('Duel')
    mapType.innerHTML = '2x2'
    infoAboutGame.gameType = '2x2'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 4
}
mapType_3x3.onclick = function(){
    showMapSize('Very Small')
    mapType.innerHTML = '3x3'
    infoAboutGame.gameType = '3x3'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 6
}
mapType_4x4.onclick = function(){
    showMapSize('Small')
    mapType.innerHTML = '4x4'
    infoAboutGame.gameType = '4x4'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 8
}
mapType_2x2x2.onclick = function(){
    showMapSize('Very Small')
    mapType.innerHTML = '2x2x2'
    infoAboutGame.gameType = '2x2x2'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 6
}
mapType_2x2x2x2.onclick = function(){
    showMapSize('Small')
    mapType.innerHTML = '2x2x2x2'
    infoAboutGame.gameType = '2x2x2x2'
    blockPlayersCount.className = 'row d-none'
    infoAboutGame.playersCount = 8
}
mapType_FFA.onclick = function(){
    showMapSize('All')
    mapType.innerHTML = 'FFA'
    infoAboutGame.gameType = 'FFA'
    blockPlayersCount.className = 'row block'
}

mapSize_Duel.onclick = function(){
    mapSize.innerHTML = 'Duel'
    infoAboutGame.mapSize = 'Duel'
    showPlayersCount(2)
}
mapSize_VerySmall.onclick = function(){
    mapSize.innerHTML = 'VerySmall'
    infoAboutGame.mapSize = 'VerySmall'
    showPlayersCount(4)
}
mapSize_Small.onclick = function(){
    mapSize.innerHTML = 'Small'
    infoAboutGame.mapSize = 'Small'
    showPlayersCount(6)
}
mapSize_Medium.onclick = function(){
    mapSize.innerHTML = 'Medium'
    infoAboutGame.mapSize = 'Medium'
    showPlayersCount(8)
}
mapSize_Large.onclick = function(){
    mapSize.innerHTML = 'Large'
    infoAboutGame.mapSize = 'Large'
    showPlayersCount(10)
}
mapSize_VeryLarge.onclick = function(){
    mapSize.innerHTML = 'VeryLarge'
    infoAboutGame.mapSize = 'VeryLarge'
    showPlayersCount(12)
}

editorButton.onclick = function(){
        mainMenu.className = 'row d-none'
        editorPage.className = 'row'
        lobbyPage.className = 'row d-none'
        createEditorTable()
        createMapsHandler()

}

createNewMapButton.onclick = function(){
    console.log('Ты сейчас создашь новую карту с айдишником ', infoAboutMaps.length)
    socket.emit('createNewMap', [infoAboutMaps.length, inputMapName.value])
}
changeMapButton.onclick = function(){
    console.log('Ты сейчас изменишь карту с айдишником ', mapEditId)

    socket.emit('startEditMap', [mapEditId, infoAboutMaps[mapEditId][3]])
}
var createEditorTable = function(){
    tbody3.innerHTML = ''
    for(var i = 0; i < infoAboutMaps.length; i++){
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        td1.innerHTML = infoAboutMaps[i][0]
        td2.innerHTML = infoAboutMaps[i][1]
        td3.innerHTML = infoAboutMaps[i][2]
        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        arrWithMapsId.push(tr)
        tr.id = i
        tbody3.append(tr)
    }
    
    
}

var showMapSize = function(mapSizeName){
    mapSize_Duel.className = 'dropdown-item d-block'
    mapSize_VerySmall.className = 'dropdown-item d-block'
    mapSize_Small.className = 'dropdown-item d-block'
    mapSize_Medium.className = 'dropdown-item d-block'
    mapSize_Large.className = 'dropdown-item d-block'
    mapSize_VeryLarge.className = 'dropdown-item d-block'

    switch(mapSizeName){

        case 'Duel':
            mapSize.innerHTML = 'Very Small'
            infoAboutGame.mapSize = 'Very Small'
            mapSize_Duel.className = 'dropdown-item d-none'
            break
        case 'Very Small':
            
            mapSize.innerHTML = 'Small'
            infoAboutGame.mapSize = 'Small'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            break
        case 'Small':
            
            mapSize.innerHTML = 'Medium'
            infoAboutGame.mapSize = 'Medium'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            mapSize_Small.className = 'dropdown-item d-none'
            break
        case 'Medium':
            
            mapSize.innerHTML = 'Large'
            infoAboutGame.mapSize = 'Large'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            mapSize_Small.className = 'dropdown-item d-none'
            mapSize_Medium.className = 'dropdown-item d-none'
            break
        case 'Large':
            
            mapSize.innerHTML = 'Very Large'
            infoAboutGame.mapSize = 'Very Large'
            mapSize_Duel.className = 'dropdown-item d-none'
            mapSize_VerySmall.className = 'dropdown-item d-none'
            mapSize_Small.className = 'dropdown-item d-none'
            mapSize_Medium.className = 'dropdown-item d-none'
            mapSize_Large.className = 'dropdown-item d-none'
            break
        default:
            break;
        
    }
}
playersCountArr[0].onclick = function(){
    infoAboutGame.playersCount = 2
    playersCount.innerHTML = '2'
}
playersCountArr[1].onclick = function(){
    infoAboutGame.playersCount = 3
    playersCount.innerHTML = '3'
}
playersCountArr[2].onclick = function(){
    infoAboutGame.playersCount = 4
    playersCount.innerHTML = '4'
}
playersCountArr[3].onclick = function(){
    infoAboutGame.playersCount = 5
    playersCount.innerHTML = '5'
}
playersCountArr[4].onclick = function(){
    infoAboutGame.playersCount = 6
    playersCount.innerHTML = '6'
}
playersCountArr[5].onclick = function(){
    infoAboutGame.playersCount = 7
    playersCount.innerHTML = '7'
}
playersCountArr[6].onclick = function(){
    infoAboutGame.playersCount = 8
    playersCount.innerHTML = '8'
}
playersCountArr[7].onclick = function(){
    infoAboutGame.playersCount = 9
    playersCount.innerHTML = '9'
}
playersCountArr[8].onclick = function(){
    infoAboutGame.playersCount = 10
    playersCount.innerHTML = '10'
}
playersCountArr[9].onclick = function(){
    infoAboutGame.playersCount = 11
    playersCount.innerHTML = '11'
}
playersCountArr[10].onclick = function(){
    infoAboutGame.playersCount = 12
    playersCount.innerHTML = '12'
}


var showPlayersCount = function(maxPlayersCount){
    for(var i = 0; i < 10; i++){
        playersCountArr[i].className = 'dropdown-item d-none'
    }
    for(var i = 0; i < maxPlayersCount-2; i++){
        playersCountArr[i].className = 'dropdown-item d-block'
    }
}

var createLobbyTable = function(lobbyesInfo){
    
    tbody2.innerHTML = ''
    playerIndex = -1
    for(var i = 0; i < lobbyesInfo.length; i++){
        if(infoAboutGame[6] == lobbyesInfo[i][2]) playerIndex = lobbyesInfo[i][1]
    }
    for(var i = 0; i < lobbyesInfo.length; i++){
        
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
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        td1.innerHTML = lobbyesInfo[i][2]
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        var divButtonColor = document.createElement('div')
        divButtonColor.className = "dropdown"
        var buttonColor = document.createElement('button')

        buttonColor.innerHTML = '█████████'
        buttonColor.style = lobbyesInfo[i][4] + '; background-' + lobbyesInfo[i][4]
        buttonColor.className = "border-0 dropdown-toggle "
        buttonColor.type = "button"
        buttonColor.setAttribute('disabled', true)
        buttonColor.setAttribute('data-toggle', "dropdown") 
        buttonColor.setAttribute('aria-haspopup', "false")
        buttonColor.setAttribute('aria-expanded', "true")
        if(lobbyesInfo[i][1] == playerIndex){
            buttonColor.id = 'buttonColor'
            var divButtonTeam = document.createElement('div')
            divButtonTeam.className = "dropdown"
            var buttonTeam = document.createElement('button')
            buttonTeam.innerHTML = lobbyesData[i][3]
            buttonTeam.id = 'teamButton'
            buttonTeam.className = "btn-secondary dropdown-toggle"
            buttonTeam.type = "button"
            buttonTeam.setAttribute('data-toggle', "dropdown") 
            buttonTeam.setAttribute('aria-haspopup', "false")
            buttonTeam.setAttribute('aria-expanded', "true")
            divButtonTeam.append(buttonTeam)
            var teamDiv = document.createElement('div')
            teamDiv.id = 'teamDiv'
            teamDiv.className = 'dropdown-menu'
            for(var j = 1; j < 11; j++){
                var a = document.createElement('a')
                a.className = 'dropdown-item'
                a.innerHTML = j
                teamDiv.append(a)
            }
            divButtonTeam.append(teamDiv)
            td2.append(divButtonTeam)
            var colorDiv = document.createElement('div')
            
            colorDiv.id = 'colorDiv'
            colorDiv.className = 'dropdown-menu'
            divButtonColor.append(buttonColor)
            for(var j = 0; j < 12; j++){
                var a = document.createElement('a')
                a.innerHTML = '█████████ '
                a.className = "dropdown-item "
                a.style = arrColor[j]
                colorDiv.append(a)
            }
            buttonColor.removeAttribute('disabled')
            divButtonColor.append(colorDiv)
        }else{   
            divButtonColor.append(buttonColor)
            td2.innerHTML = lobbyesInfo[i][3]
        }
        tr.append(td1)
        tr.append(td2)
        td3.append(divButtonColor)
        tr.append(td3)
        tbody2.append(tr)
    }
    
}
var createTable = function(){
    tbody.innerHTML = ''
    for(var i = 0; i < roomsData.length; i++){
        var tr = document.createElement('tr')
        tr.id = roomsData[i][0]
        for(var j = 1; j < 7; j++){
            var td = document.createElement('td')
            if(j === 2){
                td.innerHTML = roomsData[i][j] + '/' + roomsData[i][j+1]
                j++
            }else{
                td.innerHTML = roomsData[i][j]
            }
            tr.append(td)
        }
        tbody.append(tr)
    }
}
connectButton.onclick = function(){
    if(getCanICoonnectToThisRoom(selectedRoomId)){
        console.log(infoAboutGame.id)
        infoAboutGame = Object.values(infoAboutGame)
        //infoAboutGame[0]++
        infoAboutGame[6] = inputName.value
        infoAboutGame.id = selectedRoomId
        console.log(infoAboutGame.id)
        freeTeamNumber = getFreeTeamNumber(selectedRoomId)
        socket.emit('connectToRoom', selectedRoomId, infoAboutGame)
        socket.emit('getLobbyesData', selectedRoomId)
        
        mainMenu.className = 'row d-none'
        editorPage.className = 'row d-none'
        lobbyPage.className = 'row'

        createLobby()
    }
}
var getFreeTeamNumber = function(selectedRoomId){
}

var makeGame = function(){
    selectedRoomId = countGames
    
    if(infoAboutGame.name.length > 16){
        infoAboutGame.name = infoAboutGame.name.slice(0, 16)
    }
    if(infoAboutGame.host.length > 16){
        infoAboutGame.host = infoAboutGame.host.slice(0, 16)
    }
    
    infoAboutGame = Object.values(infoAboutGame)
    /* if(infoAboutGame.length > 7){
        infoAboutGame.splice(1,6)
    } */
    infoAboutGame[0]++
    socket.emit('createRoom', infoAboutGame)
    socket.emit('getLobbyesData', infoAboutGame[0])
    mainMenu.className = 'row d-none'
    editorPage.className = 'row d-none'
    lobbyPage.className = 'row'
    createLobby()
}

var dataAboutPlayers = []
socket.on('setDataAboutPlayers', function(data){
    dataAboutPlayers = data
})
socket.on('setLobbyesData', function(data){
    lobbyesData = data
    console.log(data, infoAboutGame)
    createLobbyTable(lobbyesData)
    if(!infoAboutGame[0]){
        setTeamsInfo(infoAboutGame.id)
    }else{
        setTeamsInfo(infoAboutGame[0])
    }
    for(var i = 0; i < roomsData.length; i++){
        if(lobbyesData[0][0] == roomsData[i][0]){
            checkStartGame(lobbyesData, roomsData[i])
        }
    }
    
})
var createLobby = function(){
    socket.emit('getDataAboutPlayers', infoAboutGame[0])
    
   // createTable2()
}
var switchColor = function(roomId, playerNumber){

}