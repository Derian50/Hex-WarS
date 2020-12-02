var cvs = document.getElementById('canvas')
var ctx = cvs.getContext("2d")
var width = 2000,
    height = 1000
cvs.width = width
cvs.height = height
var menucvs = document.getElementById('menuCanvas')
var menuctx = menucvs.getContext('2d')
menucvs.width = width
menucvs.height = 84
var canBuildHex = new Image()
canBuildHex.src = 'assets/canBuildHex.png'
var emptyHex = new Image()
emptyHex.src = 'assets/emptyHex.png'
var falseHex = new Image()
falseHex.src = 'assets/FalseHex.png'
var mistHex = new Image()
mistHex.src = 'assets/mistHex.png'
var plainHex = new Image()
plainHex.src = 'assets/plainHex.png'
var forestHex = new Image()
forestHex.src = 'assets/forestHex.png'
var beachHex = new Image()
beachHex.src = 'assets/beachHex.png'
var hillHex = new Image()
hillHex.src = 'assets/hillHex.png'
var mountainHex = new Image()
mountainHex.src = 'assets/mountainHex.png'
var waterHex = new Image()
waterHex.src = 'assets/waterHex.png'
 
var howToPlayButton = new Image()
howToPlayButton.src = 'assets/howToPlayButton.jpg'

var plainHexExplored = new Image()
plainHexExplored.src = 'assets/plainHexExplored.png'
var forestHexExplored = new Image()
forestHexExplored.src = 'assets/forestHexExplored.png'
var beachHexExplored = new Image()
beachHexExplored.src = 'assets/beachHexExplored.png'
var hillHexExplored = new Image()
hillHexExplored.src = 'assets/hillHexExplored.png'
var mountainHexExplored = new Image()
mountainHexExplored.src = 'assets/mountainHexExplored.png'
var waterHexExplored = new Image()
waterHexExplored.src = 'assets/waterHexExplored.png'

var wantToBuildStructure = false
var whatBuildStructure = ''
var buildStructureHexX = null
var buildStructureHexY = null
var wantToBuildUnit = false
var whatBuildUnit = ''
var buildUnitHexX = null
var buildUnitHexY = null
var currentMouseX = 0
var currentMouseY = 0
var wood = 100
var food = 100
var gold = 100
var canMakeBuild = []
var canMakeUnit = []
var yourSide = 'Red'
var typeHex = []
var hexArr = null
var unitsArr = []
var buildsArr = []
var HEXWIDTH = 50
var HEXHEIGHT = 20
var TOPMENUSIZE = 64
var activeHexX = -1, activeHexY = -1, activeType = null
var falseHexX = -1, falseHexY = -1, timerFalseHex = -1
var TIMEFALSEHEX = 5
var mapEditor = false 
var currentEditorColor = 'rgb(147, 200, 83)'
var currentEditorColorName = 'plain'
var startXforBlue = 4
var startYforBlue = 16
var startXforRed = 46
var startYforRed = 2
var blueIsVirgin = true
var redIsVirgin = true
var idCount = 1
var tempBuildStructure = null
var activeKey = null
var tempBuildUnit = null
var arrows = [
]
var builds = [
    // {
    //     id: 0,
    //     type: 'C',
    //     side: 'Blue',
    //     active: false,
    //     color: '#808080',
    //     speed: 1,
    //     x: 222,
    //     y: 222,
    //     hexX: 2,
    //     hexY: 6,
    //     makeUnit: false,
    //     makeUnitType: null,
    //     makeUnitTimeToEnd: null,
    //     range: 3,
    //     inCooldown: false,
    //     cooldownAttack: null,
    //     canAttack: true
    // },
    // {
    //     id: 0,
    //     type: 'C',
    //     side: 'Blue',
    //     active: false,
    //     color: '#808080',
    //     x: 222,
    //     y: 222,
    //     speed: 1,
    //     hexX: 21,
    //     hexY: 5,
    //     makeUnit: false,
    //     makeUnitType: null,
    //     makeUnitTimeToEnd: null,
    //     range: 3,
    //     cooldownAttack: null,
    //     canAttack: true
    // },
    // {
    //     id: 0,
    //     type: 'B',
    //     side: 'Blue',
    //     active: false,
    //     color: '#808080',
    //     x: 222,
    //     y: 222,
    //     speed: 1,
    //     hexX: 10,
    //     hexY: 4,
    //     makeUnit: false,
    //     makeUnitType: null,
    //     makeUnitTimeToEnd: null,
    //     range: 3,
    //     cooldownAttack: null,
    //     canAttack: true
    // },
    // {
    //     id: 0,
    //     type: 'R',
    //     side: 'Blue',
    //     active: false,
    //     color: '#808080',
    //     x: 222,
    //     y: 222,
    //     speed: 1,
    //     hexX: 12,
    //     hexY: 4,
    //     makeUnit: false,
    //     makeUnitType: null,
    //     makeUnitTimeToEnd: null,
    //     range: 3,
    //     cooldownAttack: null,
    //     canAttack: true
    // },
    // {
    //     id: 0,
    //     type: 'S',
    //     side: 'Blue',
    //     active: false,
    //     color: '#808080',
    //     x: 222,
    //     y: 222,
    //     speed: 1,
    //     hexX: 14,
    //     hexY: 4,
    //     makeUnit: false,
    //     makeUnitType: null,
    //     makeUnitTimeToEnd: null,
    //     range: 3,
    //     cooldownAttack: null,
    //     canAttack: true
    // },
    // {
    //     id: 0,
    //     type: 'H',
    //     side: 'Blue',
    //     active: false,
    //     color: '#808080',
    //     x: 222,
    //     y: 222,
    //     speed: 1,
    //     hexX: 16,
    //     hexY: 4,
    //     makeUnit: false,
    //     makeUnitType: null,
    //     makeUnitTimeToEnd: null,
    //     range: 3,
    //     cooldownAttack: null,
    //     canAttack: true
    // }
]
var units = [
    {
        id: 0,
        type: 'W',
        speed: 2,
        range: 0,
        color: '#4671D5',
        active: false,
        x: startXforBlue*32+32,
        y: startYforBlue*48+32,
        hexX: startXforBlue,
        hexY: startYforBlue,
        finalHexX: 1,
        finalHexY: 3,
        move: false,
        direction: 'down-left',
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Blue',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        progressRes: 0
    },
    {
        id: 1,
        type: 'W',
        speed: 2,
        range: 0,
        color: '#4671D5',
        active: false,
        x: startXforRed*32+32,
        y: startYforRed*48+32,
        hexX: startXforRed,
        hexY: startYforRed,
        finalHexX: 1,
        finalHexY: 3,
        move: false,
        direction: 'down-left',
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: 'Red',
        inCooldown: false,
        canMove: true,
        cooldown: null,
        progressRes: 0
    }
    
]
var gameStart = 0
console.log('файл main.js загрузился')
socket.emit('whatTypeOfGame')
socket.on('startEditGame', function(data){
    
    console.log('началось редактирование')
    mapEditor = true
    mapEditId = data[0]
    hexArr = data[1]
    updateVisible()
    mainLoop()
})
socket.on('startNormalGame', function(newHexArr){
    hexArr = newHexArr
    console.log('началась нормальная игра')
    socket.emit('getSide', [roomsData[0], inputName.value])
})

socket.on('setSide', function(data){
    console.log('SIDE — ', yourSide)
    console.log(data)
    switch(data%2){
        case 0:
            yourSide = 'Blue'
            break
        case 1:
            yourSide = 'Red'
            break
            
    }
    console.log('SIDE — ', yourSide)
    console.log(hexArr)
    startGame()
})
socket.on('sentInfoAboutGame', function(data){
    updateInfoAboutGame(data)
    
})
var updateInfoAboutGame = function(data){
    // units = data[1]
    // builds = data[2]
    // arrows = data[3]
    switch(data[0]){
        case 'moveUnit': //units.id, stepToX[], stepToY[], dist
            for(var i = 0; i < units.length; i++){
                
                if(units[i].id == data[1]){
                    units[i].stepToX = data[2].slice()
                    units[i].stepToY = data[3].slice()
                    units[i].move = true
                    units[i].cooldown += data[4]*600/units[i].speed
                    units[i].direction = whatIsDirection(units[i].hexX, units[i].hexY, units[i].stepToX[0], units[i].stepToY[0])
                    units[i].globalToX = units[i].stepToX[units[i].stepToX.length-1]
                    units[i].globalToY = units[i].stepToY[units[i].stepToY.length-1]
                }
            }
            break
        case 'killUnit': //units.id
            for(var i = 0; i < units.length; i++){
                if(data[1] == units[i].id){
                    eatUnit(i)
                }
            }
            updateVisible()
            break
        case 'killBuild': //builds.id
            for(var i = 0; i < builds.length; i++){
                if(data[1] == builds[i].id){
                    builds.splice(i, 1)
                }
            }
            updateVisible()
            break
        case 'killArrow': //arrows.id
            for(var i = 0; i < arrows.length; i++){
                if(data[1] == arrows[i].id){
                    arrows.splice(i, 1)
                }  
            }
            updateVisible()
            break
        case 'createUnit': //id, hexX, hexY, unitType, side

            tempBuildUnit = whatBuildUnit
            buildUnitHexX = data[2]
            buildUnitHexY = data[3]
            whatBuildUnit = data[4]
            buildUnitSide = data[5]
            buildUnit(data[1])
            break
        case 'createBuild': //id, hexX, hexY, structureType, side
            tempBuildStructure = whatBuildStructure
            buildStructureHexX = data[2]
            buildStructureHexY = data[3]
            whatBuildStructure = data[4]
            buildStructureSide = data[5]
            buildStructure(data[1])
            break
        case 'createArrow': //currentHexX, currentHexY, toHexX, toHexY, dist, speed, type
            if(isCastleInThisHex(data[1], data[2])){
                builds[whatIsBuildIndex(data[1], data[2])].cooldownAttack = 600
                builds[whatIsBuildIndex(data[1], data[2])].inCooldown = true
            }else{
                units[whatIsUnitIndex(data[1],data[2])].inCooldown = true
                units[whatIsUnitIndex(data[1],data[2])].cooldown += (600/data[6].speed)
            }
            createArrowAndShot(data[1], data[2], data[3], data[4], data[5], data[6], data[7])
            break
        }
    }
var updateVisible = function(){
    for(var i = 0; i < HEXWIDTH; i++){
        for(var j = 0; j < HEXHEIGHT; j++){
            if((i%2) == (j%2)){
                if(mapEditor){
                    hexArr[i][j].visible = true
                }else{
                    hexArr[i][j].visible = false
                }
            }
        }
    }
    for(var i = 0; i < units.length; i++){
        visibleDist = 2
        if(units[i].side !== yourSide) continue
        if(hexArr[units[i].hexX][units[i].hexY].groundType == 'hill') visibleDist = 3
        var x = units[i].hexX
        var y = units[i].hexY
        startX = x-4
        startY = y-2
        for(var j = startX; j < startX+9; j++){
            for(var k = startY; k < startY+5; k++){
                if((j%2 == k%2) && j >= 0 && k >= 0 && j < HEXWIDTH && k < HEXHEIGHT){    
                    if(hexArr[j][k].visible) continue
                    if(checkDist(x,y,j,k) <= visibleDist && canThisUnitSeeThisHex(x, y, j, k)){
                        hexArr[j][k].visible = true
                        hexArr[j][k].explored = true
                    }
                }
            }
        }
    }
    for(var i = 0; i < builds.length; i++){
        if(builds[i].side !== yourSide) continue
        var x = builds[i].hexX
        var y = builds[i].hexY
        startX = x-6
        startY = y-3
        for(var j = startX; j < startX+13; j++){
            for(var k = startY; k < startY+7; k++){
                if(j >= 0 && k >= 0 && j < HEXWIDTH && k < HEXHEIGHT && (j%2 == k%2)){
                    if(builds[i].type == 'C'){
                        if(checkDist(x,y,j,k) < 4 && canThisUnitSeeThisHex(x, y, j, k)){
                            hexArr[j][k].visible = true
                            hexArr[j][k].explored = true
                        }
                    }else{
                        if(checkDist(x,y,j,k) < 2){
                            hexArr[j][k].visible = true
                            hexArr[j][k].explored = true
                        }
                    }
                }
            }
        }
    }
}
var createArrs = function(){
    for(var i = 0; i < HEXWIDTH; i++){
        
        typeHex[i] = []
        unitsArr[i] = []
        for(var j = 0; j < HEXHEIGHT; j++){
            if((i%2) === (j%2)){ 
                typeHex[i][j] = 0
                unitsArr[i][j] = 0
            }else{
                typeHex[i][j] = -1
                unitsArr[i][j] = -1
            }
        }
    }
}
var createUnitsArr = function(){
    for(var i = 0; i < units.length; i++){
        units[i].id = i
        units[i].finalHexX = units[i].hexX
        units[i].finalHexY = units[i].hexY
        units[i].x = units[i].hexX*32+32
        units[i].y = units[i].hexY*48+32
        units[i].direction = 'right'
    }
}
var createBuildsArr = function(){
    for(var i = 0; i < builds.length; i++){
        builds[i].id = i
        builds[i].x = builds[i].hexX*32+32
        builds[i].y = builds[i].hexY*48+32
    }
}
var drawHex = function(){
    for(var i = 0; i < HEXWIDTH; i++){
        for(var j = 0; j < HEXHEIGHT; j++){
            if((i%2) === (j%2)){        
                if(!hexArr[i][j].visible && !hexArr[i][j].explored){
                    ctx.drawImage(mistHex, 32*i, 48*j)
                    ctx.drawImage(emptyHex, 32*i, 48*j)
                    continue
                }
                switch(hexArr[i][j].groundType){
                    case 'plain':
                        if(hexArr[i][j].visible){
                            ctx.drawImage(plainHex, 32*i, 48*j)
                        }else{
                            ctx.drawImage(plainHexExplored, 32*i, 48*j)
                        }
                        break
                    case 'forest':
                        if(hexArr[i][j].visible){
                            ctx.drawImage(forestHex, 32*i, 48*j)
                        }else{
                            ctx.drawImage(forestHexExplored, 32*i, 48*j)
                        }
                        break
                    case 'hill':
                        if(hexArr[i][j].visible){
                            ctx.drawImage(hillHex, 32*i, 48*j)
                        }else{
                            ctx.drawImage(hillHexExplored, 32*i, 48*j)
                        }
                        break
                    case 'beach':
                        if(hexArr[i][j].visible){
                            ctx.drawImage(beachHex, 32*i, 48*j)
                        }else{
                            ctx.drawImage(beachHexExplored, 32*i, 48*j)
                        }
                        break
                    case 'mountain':
                        if(hexArr[i][j].visible){
                            ctx.drawImage(mountainHex, 32*i, 48*j)
                        }else{
                            ctx.drawImage(mountainHexExplored, 32*i, 48*j)
                        }
                        break
                    case 'water':
                        if(hexArr[i][j].visible){
                            ctx.drawImage(waterHex, 32*i, 48*j)
                        }else{
                            ctx.drawImage(waterHexExplored, 32*i, 48*j)
                        }
                        break
                    
                }
                ctx.drawImage(emptyHex, 32*i, 48*j)
            }
        }
    }
}
var getWoodCost = function(structureType){
    switch(structureType){
        case 'C':
            return 50
        case 'H':
            return 10
        default:
            return 20
    }
}
var buildStructure = function(id){
    if(idCount == id){
        console.log('Всё ок, айдишники сходятся')
    }else{
        console.log('Нихуя не ок, айдишники не сходятся')
    }
    builds.push({
        id: idCount++,
        type: whatBuildStructure,
        side: buildStructureSide,
        active: false,
        color: '#808080',
        speed: 1,
        x: buildStructureHexX*32+32,
        y: buildStructureHexY*48+32,
        hexX: buildStructureHexX,
        hexY: buildStructureHexY,
        makeUnit: false,
        makeUnitType: null,
        makeUnitTimeToEnd: null,
        range: 3,
        inCooldown: false,
        cooldownAttack: null,
        canAttack: true
    })
    if(yourSide == 'Blue' && blueIsVirgin){
        blueIsVirgin = false
    }
    if(yourSide == 'Red' && redIsVirgin){
        redIsVirgin = false
    }
    if(tempBuildStructure){
        whatBuildStructure = tempBuildStructure
    }
    updateVisible()
    //socket.emit('updateInfoAboutGame', [0, units, builds, arrows])
}
var getSpeed = function(unitType){
    switch(unitType){
        case 'C':
            return(4)
        case 'A': 
            return(2)
        case 'P':
            return(2)
        case 'S':
            return(3)
        case 'R':
            return(2)
        case 'D':
            return(4)
        case 'W':
            return(2)
    }
}
var getRange = function(unitType){
    switch(unitType){
        case 'D':
            return(3)
        case 'A':
            return(2)
        case 'R':
            return(3)
    }
}
var getFoodCost = function(unitType){
    switch(unitType){
        case 'C':
            return 20
        case 'S':
            return 15
        case 'D':
            return 20
        case 'W':
            return 5
        default:
            return 10
    }
}
var buildUnit = function(id){
    changeUnitsId = false
    console.log(idCount, id)
    if(idCount == id){
        console.log('Всё ок, айдишники сходятся')
    }else{
        console.log('Нихуя не ок, айдишники не сходятся')
        changeUnitsId = true
    }
    units.push({
        id: idCount++,
        type: whatBuildUnit,
        speed: getSpeed(whatBuildUnit),
        range: getRange(whatBuildUnit),
        color: '#4671D5',
        active: false,
        x: buildUnitHexX*32+32,
        y: buildUnitHexY*48+32,
        hexX: buildUnitHexX,
        hexY: buildUnitHexY,
        finalHexX: 1,
        finalHexY: 3,
        move: false,
        direction: 'down-left',
        stepToX: [],
        stepToY: [],
        globalToX: null,
        globalToY: null,
        side: buildUnitSide,
        inCooldown: false,
        canMove: true,
        cooldown: null,
        progressRes: 0
    })
    if(tempBuildUnit){
        whatBuildUnit = tempBuildUnit
    }
    if(changeUnitsId){
        var t = null
        t = units[units.length-1].id
        units[units.length-1].id = units[units.length-2].id
        units[units.length-2].id = t
    }
    updateVisible()
    //socket.emit('updateInfoAboutGame', ['createUnit', buildUnitHexX, buildUnitHexY, whatBuildUnit])
    //socket.emit('updateInfoAboutGame', [0, units, builds, arrows])
}
var wantBuildUnit = function(unitType){
    
    wantToBuildUnit = true
    whatBuildUnit = unitType
}
var wantBuildStructure = function(structureType){
    wantToBuildStructure = true
    whatBuildStructure = structureType
} 
var canBuild = function(toHexX, toHexY){
    if(checkDist(activeHexX, activeHexY, toHexX, toHexY) == 1 && hexArr[toHexX][toHexY].groundType !== 'mountain'&& hexArr[toHexX][toHexY].groundType !== 'water' && !whatIsBuildIndex(toHexX, toHexY) && !whatIsUnitIndex(toHexX, toHexY)){
        return true
    }else{
        return false
    }
}
var clickOnMenu = function(x,y){
    for(var i = 0; i < 12; i++){
        if(x > 200+i*70 && x < 264+i*70){
            switch(i){
                case 0:
                    if(canMakeBuild.includes('C')){
                        wantBuildStructure('C')
                    }
                    break
                case 1:
                    if(canMakeBuild.includes('B')){
                        wantBuildStructure('B')
                    }
                    break
                case 2:
                    if(canMakeBuild.includes('R')){
                        wantBuildStructure('R')
                    }
                    break
                case 3:
                    if(canMakeBuild.includes('S')){
                        wantBuildStructure('S')
                    }
                    break
                case 4: 
                    if(canMakeBuild.includes('H')){
                        wantBuildStructure('H')
                    }
                    break
                case 5:
                    if(canMakeUnit.includes('C')){
                        wantBuildUnit('C')
                    }
                    break
                case 6:
                    if(canMakeUnit.includes('A')){
                        wantBuildUnit('A')
                    }
                    break
                case 7:
                    if(canMakeUnit.includes('P')){
                        wantBuildUnit('P')
                    }
                    break
                case 8:
                    if(canMakeUnit.includes('S')){
                        wantBuildUnit('S')
                    }
                    break
                case 9:
                    if(canMakeUnit.includes('R')){
                        wantBuildUnit('R')
                    }
                    break
                case 10:
                    if(canMakeUnit.includes('D')){
                        wantBuildUnit('D')
                    }
                    break
                case 11:
                    if(canMakeUnit.includes('W')){
                        wantBuildUnit('W')
                    }
                    break
                
                
            }
            //Здесь надо вызвать функцию, которая строит здание или юнита
        }
    }
}
window.onkeydown = function(e){
    activeKey = e.key
    if(canMakeUnit.length > 0){
        switch(activeKey){
            case 'c':
                if(canMakeUnit.includes('C')){
                    wantBuildUnit('C')
                }
                break
            case 'a':
                if(canMakeUnit.includes('A')){
                    wantBuildUnit('A')
                }
                break
            case 'p':
                if(canMakeUnit.includes('P')){
                    wantBuildUnit('P')
                }
                break
            case 's':
                if(canMakeUnit.includes('S')){
                    wantBuildUnit('S')
                }
                break
            case 'r':
                if(canMakeUnit.includes('R')){
                    wantBuildUnit('R')
                }
                break
            case 'd':
                if(canMakeUnit.includes('D')){
                    wantBuildUnit('D')
                }
                break
            case 'w':
                if(canMakeUnit.includes('W')){
                    wantBuildUnit('W')
                }
                break
            
        }
    }else if(canMakeBuild.length > 0){
        switch(activeKey){
            case "c":
                    if(canMakeBuild.includes('C')){
                        wantBuildStructure('C')
                    }
                    break
                case "b":
                    if(canMakeBuild.includes('B')){
                        wantBuildStructure('B')
                    }
                    break
                case "r":
                    if(canMakeBuild.includes('R')){
                        wantBuildStructure('R')
                    }
                    break
                case "s":
                    if(canMakeBuild.includes('S')){
                        wantBuildStructure('S')
                    }
                    break
                case "h": 
                    if(canMakeBuild.includes('H')){
                        wantBuildStructure('H')
                    }
                    break
        }
    }
    
}
window.onkeyup = function(e){
    activeKey = null
}

window.onmousemove = function(e){
    if(e.clientY > 68){
        currentMouseX = e.layerX
        currentMouseY = e.layerY
    }
}
window.onmousedown = function(e){
    if(e.clientY < 68){
        clickOnMenu(e.layerX, e.layerY)
        return
    }
    if(this.mapEditor){
       if(e.layerX > 1500 && e.layerX < 1564){
           if(e.layerY > 148 && e.layerY < 212){
            this.currentEditorColor = 'rgb(147, 200, 83)'
            this.currentEditorColorName = 'plain'
           }else if(e.layerY > 212 && e.layerY < 276){
            this.currentEditorColor = 'rgb(31, 116, 16)'
            this.currentEditorColorName = 'forest'
           }else if(e.layerY > 276 && e.layerY < 340){
            this.currentEditorColor = 'rgb(255, 255, 130)'
            this.currentEditorColorName = 'beach'
           }else if(e.layerY > 340 && e.layerY < 404){
            this.currentEditorColor = 'rgb(176, 129, 21)'
            this.currentEditorColorName = 'hill'
           }else if(e.layerY > 404 && e.layerY < 468){
            this.currentEditorColor = 'rgb(105, 24, 4)'
            this.currentEditorColorName = 'mountain'
           }else if(e.layerY > 468 && e.layerY < 532){
            this.currentEditorColor = 'rgb(0, 6, 104)'
            this.currentEditorColorName = 'water'
           }
       }
    }
    XY = this.whatHexIsClicked(e.layerX, e.layerY)
    if(wantToBuildStructure && canBuild(XY[0], XY[1])){
        units[whatIsUnitIndex(activeHexX, activeHexY)].active = false
        wood -= getWoodCost(whatBuildStructure)
        
        socket.emit('updateInfoAboutGame', ['createBuild', idCount, buildStructureHexX, buildStructureHexY, whatBuildStructure, yourSide])
        buildStructureSide = yourSide
        buildStructure()
        activeType = null
        activeHexX = -1
        activeHexY = -1
        return
    }else if(wantToBuildUnit && canBuild(XY[0], XY[1])){
        builds[whatIsBuildIndex(activeHexX, activeHexY)].active = false
        food -= getFoodCost(whatBuildUnit)
        
        socket.emit('updateInfoAboutGame', ['createUnit', idCount, buildUnitHexX, buildUnitHexY, whatBuildUnit, yourSide])
        buildUnitSide = yourSide
        buildUnit(idCount)
        activeType = null
        activeHexX = -1
        activeHexY = -1
        return
    }
    doSomethingWithClick(XY)
    
}
var checkIsSimpleHex = function(x,y){
    for(var i = 0; i < HEXHEIGHT*2; i++){
        if(((y - i*48) > 16) && ((y - i*48) < 48)){
            col = Math.floor(x/32)
            row = Math.floor(y/48)
            return [col,row]
        }
    }
    return false
}
var isCastleInThisHex = function(x,y){
    for(var i = 0; i < builds.length; i++){
        if(builds[i].hexX === x && builds[i].hexY === y && builds[i].type == 'C'){
            return true
        }
    }
}
var isEnemyInThisHex = function(x,y){
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX === x && units[i].hexY === y && units[i].side !== yourSide){
            return true
        }
    }
}
var isBuildsInThisHex = function(x,y){
    for(var i = 0; i < builds.length; i++){
        if(builds[i].hexX === x && builds[i].hexY === y && builds[i].side == yourSide){
            return true
        }
    }
}
var isUnitsInThisHex = function(x,y){
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX === x && units[i].hexY === y && units[i].side === yourSide){
            return true
        }
    }
}
var castleAttack = function(currentHexX, currentHexY, x, y){
    if(isEnemyInThisHex(x, y)){
        var dist = checkDist(currentHexX, currentHexY, x, y)
        if(dist <= 3 && !builds[whatIsBuildIndex(currentHexX, currentHexY)].inCooldown){
            builds[whatIsBuildIndex(currentHexX, currentHexY)].cooldownAttack = 600
            builds[whatIsBuildIndex(currentHexX, currentHexY)].inCooldown = true
            socket.emit('updateInfoAboutGame', ["createArrow", currentHexX, currentHexY, x, y, dist, 3, 'justArrow'])
            createArrowAndShot(currentHexX, currentHexY, x, y, dist, 3, 'justArrow')
            activeType = null
            activeHexX = -1
            activeHexY = -1
        }else{
            
            builds[whatIsBuildIndex(currentHexX, currentHexY)].active = true
            activeType = 'build'
            falseHexX = x
            falseHexY = y
            timerFalseHex = TIMEFALSEHEX
        }
    }else{
            activeType = null
            activeHexX = -1
            activeHexY = -1
    }
}
var meleeMoveOrAttack = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitsIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist)){
        units[unitsIndex].active = false
        activeHexX = -1
        activeHexY = -1
        activeType = null
        
        createMovePath(currentHexX, currentHexY, x, y, dist, yourSide)
    }else{
        units[unitsIndex].active = true
        activeType = 'unit'
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }
    
    
}
var createArrowAndShot = function(currentHexX, currentHexY, toHexX, toHexY, dist, speed, type){
    
    if(type == 'dartArrow'){
        if(dist == 1){
            toHexX += (toHexX - currentHexX)*2
            toHexY += (toHexY - currentHexY)*2
        }else if(dist == 2){
            toHexX += (toHexX - currentHexX)/2
            toHexY += (toHexY - currentHexY)/2
        }
        dist = 3
    }
    index = arrows.length
    arrows.push({})
    arrows[index].id = index
    arrows[index].type = type
    arrows[index].x = currentHexX*32+32
    arrows[index].y = currentHexY*48+32
    arrows[index].toX = toHexX*32+32
    arrows[index].toY = toHexY*48+32
    arrows[index].toHexX = toHexX
    arrows[index].toHexY = toHexY
    arrows[index].speed = speed
    var deltaStepX = (arrows[index].toX-arrows[index].x)/60
    var deltaStepY = (arrows[index].toY-arrows[index].y)/60
    arrows[index].stepX = (arrows[index].speed/dist)*deltaStepX
    arrows[index].stepY = (arrows[index].speed/dist)*deltaStepY
}
var WMove = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist) && !isEnemyInThisHex(x,y) && !isCastleInThisHex(x,y)){
        units[unitIndex].active = false
        activeType = null
        activeHexX = -1
        activeHexY = -1
        //socket.emit('updateInfoAboutGame', ['moveUnit', currentHexX, currentHexY, x, y, dist])
        createMovePath(currentHexX, currentHexY, x, y, dist, yourSide)
    }else{
        units[unitIndex].active = true
        activeType = 'unit'
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }
}
var rangerMoveOrAttack = function(currentHexX, currentHexY, x, y){
    var dist = checkDist(currentHexX, currentHexY, x, y)
    var unitIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if(isEnemyInThisHex(x,y) && units[whatIsUnitIndex(x,y)].side !== yourSide && dist <= units[unitIndex].range && 600-units[unitIndex].cooldown >= 600/units[unitIndex].speed){
        units[unitIndex].active = false
        activeHexX = -1
        activeHexY = -1
        activeType = null
        if(y - currentHexY < 0){
            if(x - currentHexX < 0){
                units[unitIndex].direction = 'up-left'
            }else if(x - currentHexX > 0){
                units[unitIndex].direction = 'up-right'
            }else if(x == currentHexX){
                units[unitIndex].direction = 'up-right'
            }
        }else if(y == currentHexY){
            if(x - currentHexX < 0){
                units[unitIndex].direction = 'left'
            }else if(x - currentHexX > 0){
                units[unitIndex].direction = 'right'
            }
        }else if(y - currentHexY > 0){
            if(x - currentHexX < 0){
                units[unitIndex].direction = 'down-left'
            }else if(x - currentHexX > 0){
                units[unitIndex].direction = 'down-right'
            }else if(x == currentHexX){
                units[unitIndex].direction = 'down-right'
            }
        }
        
        if(rangerCanAttack(currentHexX, currentHexY, x, y, dist, units[unitIndex].speed, units[unitIndex].direction, units[unitIndex].type)){
            units[unitIndex].inCooldown = true
            units[unitIndex].cooldown += (600/units[unitIndex].speed)
            if(units[unitIndex].type == 'A' || units[unitIndex].type == 'D'){
                socket.emit('updateInfoAboutGame', ["createArrow", currentHexX, currentHexY, x, y, dist, units[unitIndex].speed, 'justArrow'])
                createArrowAndShot(currentHexX, currentHexY, x, y, dist, units[unitIndex].speed, 'justArrow')
            } else if(units[unitIndex].type == 'R'){
                socket.emit('updateInfoAboutGame', ["createArrow", currentHexX, currentHexY, x, y, dist, units[unitIndex].speed, 'dartArrow'])
                createArrowAndShot(currentHexX, currentHexY, x, y, dist, units[unitIndex].speed, 'dartArrow')
            }
        }
        else{
            falseHexX = x
            falseHexY = y
            timerFalseHex = TIMEFALSEHEX
        }
    }else if(canThisUnitGoToThisHex(currentHexX, currentHexY, x, y, dist)){
        
        units[unitIndex].active = false
        activeType = null
        activeHexX = -1
        activeHexY = -1
        //socket.emit('updateInfoAboutGame', ['moveUnit', currentHexX, currentHexY, x, y, dist])
        createMovePath(currentHexX, currentHexY, x, y, dist, yourSide)
    }else{
        units[unitIndex].active = true
        activeType = 'unit'
        falseHexX = x
        falseHexY = y
        timerFalseHex = TIMEFALSEHEX
    }
}
var rangerCanAttack = function(currentHexX, currentHexY, toHexX, toHexY, dist, speed, dir, type){
    deltaX = toHexX - currentHexX
    deltaY = toHexY - currentHexY
    if(dist == 2){
            if(deltaX == 0){
                if(hexArr[currentHexX-1][currentHexY+deltaY/2].groundType == 'forest' && hexArr[currentHexX+1][currentHexY+deltaY/2].groundType == 'forest'){
                    return false
                }
            }else if(deltaX == 3 && deltaY == 1){
                if(hexArr[currentHexX+2][currentHexY].groundType == 'forest' && hexArr[currentHexX+1][currentHexY+1].groundType == 'forest'){
                    return false
                }
            }else if(deltaX == 3 && deltaY == -1){
                if(hexArr[currentHexX+2][currentHexY].groundType == 'forest' && hexArr[currentHexX+1][currentHexY-1].groundType == 'forest'){
                    return false
                }
            }else if(deltaX == -3 && deltaY == 1){
                if(hexArr[currentHexX-2][currentHexY].groundType == 'forest' && hexArr[currentHexX-1][currentHexY+1].groundType == 'forest'){
                    return false
                }
            }else if(deltaX == -3 && deltaY == -1){
                if(hexArr[currentHexX-2][currentHexY].groundType == 'forest' && hexArr[currentHexX-1][currentHexY-1].groundType == 'forest'){
                    return false
                }
            }else if(deltaY == 0 && deltaX > 0){
                if(hexArr[currentHexX+2][currentHexY].groundType == 'forest'){
                    return false
                } 
            }else if(deltaY == 0 && deltaX < 0){
                if(hexArr[currentHexX-2][currentHexY].groundType == 'forest'){
                    return false
                }
            }else{
                if(hexArr[currentHexX+deltaX/2][currentHexY+deltaY/2].groundType == 'forest'){
                    return false
                }
            }
            if(type != 'A'){
                if(deltaX == 0){
                    if(hexArr[currentHexX-1][currentHexY+deltaY/2].groundType == 'hill' && hexArr[currentHexX+1][currentHexY+deltaY/2].groundType == 'hill'){
                        return false
                    }
                }else if(deltaX == 3 && deltaY == 1){
                    if(hexArr[currentHexX+2][currentHexY].groundType == 'hill' && hexArr[currentHexX+1][currentHexY+1].groundType == 'hill'){
                        return false
                    }
                }else if(deltaX == 3 && deltaY == -1){
                    if(hexArr[currentHexX+2][currentHexY].groundType == 'hill' && hexArr[currentHexX+1][currentHexY-1].groundType == 'hill'){
                        return false
                    }
                }else if(deltaX == -3 && deltaY == 1){
                    if(hexArr[currentHexX-2][currentHexY].groundType == 'hill' && hexArr[currentHexX-1][currentHexY+1].groundType == 'hill'){
                        return false
                    }
                }else if(deltaX == -3 && deltaY == -1){
                    if(hexArr[currentHexX-2][currentHexY].groundType == 'hill' && hexArr[currentHexX-1][currentHexY-1].groundType == 'hill'){
                        return false
                    }
                }else if(deltaY == 0 && deltaX > 0){
                    if(hexArr[currentHexX+2][currentHexY].groundType == 'hill'){
                        return false
                    } 
                }else if(deltaY == 0 && deltaX < 0){
                    if(hexArr[currentHexX-2][currentHexY].groundType == 'hill'){
                        return false
                    }
                }else{
                    if(hexArr[currentHexX+deltaX/2][currentHexY+deltaY/2].groundType == 'hill'){
                        return false
                    }
                }
            }
            
    }else if(dist == 3){
    }else if(dist == 4){
    }
    return true
    /* var deltaStepX = ((toHexX*32+32)-(currentHexX*32+32))/60
    var deltaStepY = ((toHexY*48+32)-(currentHexY*48+32))/60
    var stepX = speed/dist*deltaStepX/3
    var stepY = speed/dist*deltaStepY/3
    var tempArrowX = currentHexX*32+32
    var tempArrowY = currentHexY*48+32
    for(var i = 0; i < dist/speed*60*3; i++){
        tempArrowX += stepX
        tempArrowY += stepY
        for(var j = 0; j < builds.length; j++){
            if(builds[j].x == Math.round(tempArrowX) && builds[j].y == Math.round(tempArrowY) && builds[j].type == 'C'){
                return false
            }
        }
        /* for(var j = 0; j < HEXWIDTH; j++){
            for(var k = 0; k < HEXHEIGHT; k++){
                if(!(j%2 == k%2)) continue
                    if(Math.round(tempArrowX) == j*32 && Math.round(tempArrowX) == k*48){
                        console.log(j,k)
                        console.log(hexArr[j][k])
                        if(hexArr[j][k].groundType == 'forest'){
                            return false
                        }
                    }
                
            }
        } 
    }
    return true */
}
var whatIsDirection = function(currentHexX, currentHexY, toHexX, toHexY){
    deltaX = toHexX - currentHexX
    deltaY = toHexY - currentHexY
    if(deltaY == 0 && deltaX == 2){
        return 'right'
    }else if(deltaY == 0 && deltaX == -2){
        return 'left'
    }else if(deltaY == 1 && deltaX == 1){
        return 'down-right'
    }else if(deltaY == 1 && deltaX == -1){
        return 'down-left'
    }else if(deltaY == -1 && deltaX == 1){
        return 'up-right'
    }else if(deltaY == -1 && deltaX == -1){
        return 'up-left'
    }
}
var doSomethingWithClick = function(arrXY){ 
    
    x = arrXY[0]
    y = arrXY[1]
    
    if((x + y) % 2 === 1) x--
    if(mapEditor){
        hexArr[x][y].groundType = currentEditorColorName
        socket.emit('editMapInfo', [mapEditId, hexArr])
        return
    }
    if((activeHexX === x && activeHexY === y) || x < 0 || y < 0){
        if(activeType === 'build'){
            builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false
        }else if(activeType === 'unit'){
            units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
        }
        activeType = null   
        activeHexX = -1
        activeHexY = -1
        return
    }
    if(isUnitsInThisHex(x,y) && units[whatIsUnitIndex(x,y)].side === yourSide && units[whatIsUnitIndex(x,y)].canMove && units[whatIsUnitIndex(x,y)].move === false){
        
        if(activeHexX !== -1){   
            if(activeType === 'build'){
                builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false
            }else if(activeType === 'unit'){
                units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
            }
        }
        units[whatIsUnitIndex(x,y)].active = true
        activeType = 'unit'
        activeHexX = x
        activeHexY = y
        
    }else if(isBuildsInThisHex(x,y) && builds[whatIsBuildIndex(x,y)].side === yourSide && (!builds[whatIsBuildIndex(x,y)].makeUnit || builds[whatIsBuildIndex(x,y)].canAttack)){
        
        if(activeHexX !== -1){      
            if(activeType === 'build'){
                builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false
            }else if(activeType === 'unit'){
                units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
            }
        }
        builds[whatIsBuildIndex(x,y)].active = true
        activeType = 'build'
        activeHexX = x
        activeHexY = y
    }else if(activeHexX !== -1 && activeHexY !== -1 && !isUnitsInThisHex(x,y) && !isBuildsInThisHex(x,y)){
        
          
        if(activeType === 'build'){
            builds[whatIsBuildIndex(activeHexX,activeHexY)].active = false            
            if(builds[whatIsBuildIndex(activeHexX, activeHexY)].type === 'C'){
                castleAttack(activeHexX, activeHexY, x, y)
            }
            activeType = null
            activeHexX = -1
            activeHexY = -1
            //socket.emit('updateInfoAboutGame', [0, units, builds, arrows])
        }else if(activeType === 'unit'){
            
            units[whatIsUnitIndex(activeHexX,activeHexY)].active = false
            activeType = null
            if(units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'A' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'R' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'D'){
                rangerMoveOrAttack(activeHexX, activeHexY, x, y)
            }else if(units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'C' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'S' || units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'P'){
                meleeMoveOrAttack(activeHexX, activeHexY, x, y)
            }else if(units[whatIsUnitIndex(activeHexX, activeHexY)].type === 'W'){
                WMove(activeHexX, activeHexY, x, y)
            }
            //socket.emit('updateInfoAboutGame', [0, units, builds, arrows])
        }
    }else{
        
    }
    
}
var whatHexIsClicked = function(x, y){
    if(checkIsSimpleHex(x,y)){
        XY = checkIsSimpleHex(x,y)
        col = XY[0]
        row = XY[1]
        if((col + row) % 2 === 1) col--
        return [col,row]
    }
    var row, col
    col = Math.floor(x/32)
    row = Math.floor(y/16)
        
    for(var i = 0; i < HEXHEIGHT; i++){
        if(row >= -1+i*6  && row <= 4+i*6){
            row = i
        }
    }
    dir = 0
    //тут начинается магия, которую я сам не пойму через несколько дней
    x = x - col*32
    y = y - row*64 - 32*row
    row *= 2
    if((col % 2 === 1) && y <= 16){
        dir = 2
    }else if((col % 2 === 1) && y >= 48){
        dir = 1
        y-=48
    }else if((col % 2 === 0) && y <= 16){
        dir = 3
    }else if((col % 2 === 0) && y >= 48){
        dir = 4
        y-=48
    }
    if(dir === 2){ // 2 четверть
        x = -(x)
        y = (-y)*2
        if(x > y){
            if((col + row) % 2 === 1) col--
            return [col,row]
        } else {
            if((col + row) % 2 === 1) col--
            return [col+1,row-1]
        }
    }else if (dir === 1){ // 1 четверть
        x = 32 - x
        y = y * 2
        if(x > y){
            if((col + row) % 2 === 1) col--
            return [col,row]
        } else {
            if((col + row) % 2 === 1) col--
            return [col+1,row+1]
        }
    }else if(dir === 3){  //3 четверть
        x = -(32 - x)
        y = (-y)*2
         if(x > y){
            if((col + row) % 2 === 1) col--
            return [col,row]
        } else {
            if((col + row) % 2 === 1) col--
            return [col-1,row-1]
        }
    }else if (dir === 4){ //4 четверть
        x = x
        y = y*2
         if(x > y){
            if((col + row) % 2 === 1) col--
            return [col,row]
        } else {
            if((col + row) % 2 === 1) col--
            return [col-1,row+1]
        }
    }
}
var checkDist = function(currentHexX, currentHexY, toHexX, toHexY){
    var q = 0
    if(currentHexY === toHexY){
        q = Math.abs(currentHexX - toHexX)
    }else if(currentHexX === toHexX){
        q = Math.abs(currentHexY - toHexY)*2
    }else if(Math.abs(currentHexY - toHexY) > Math.abs(currentHexX - toHexX)){
       q = Math.abs(currentHexY - toHexY)*2
    } else{
        q = Math.abs(currentHexX - toHexX) + Math.abs(currentHexY - toHexY)
    }
        q = Math.ceil(q/2)
        return q
    
}
var whatIsSpeed = function(hexX, hexY){
    for(var i = 0; i < units.length; i++){
        if(hexX == units[i].hexX && hexY == units[i].hexY){
            return units[i].speed
        }
    }
}
var whatIsBuildIndex = function(hexX, hexY){
    for(var i = 0; i < builds.length; i++){
        if(hexX == builds[i].hexX && hexY == builds[i].hexY){
            return i
        }
    }
}
var whatIsUnitIndex = function(hexX, hexY){
    for(var i = 0; i < units.length; i++){
        if(hexX == units[i].hexX && hexY == units[i].hexY){
            return i
        }
    }
}
var makeNewStepInThePath = function(currentX, currentY, toHexX, toHexY, currentArrId, type){
    if(type == 'Range' || type == 'Melee'){
        unitIndex = whatIsUnitIndex(currentX, currentY)
        dist = checkDist(currentX, currentY, toHexX, toHexY)
        //speed = units[unitIndex].speed
        countOfEnemy = 0
        
        tstartX = currentX
        tstartY = currentY
        var tempFunc = function(arr){
            x = arr[0]
            y = arr[1]
            tempArr = [x,y,[],[],[],[],[],[]]
            tempArr[2].push(x+2, y)
            tempArr[3].push(x-2, y)
            tempArr[4].push(x+1, y+1)
            tempArr[5].push(x+1, y-1)
            tempArr[6].push(x-1, y+1)
            tempArr[7].push(x-1, y-1)
            return tempArr
        }
        tempArrPaths = [tstartX, tstartY]
        tempArrPaths = tempFunc([tempArrPaths[0], tempArrPaths[1]]) // первый шаг
        for(var i = 2; i < 8; i++){ // второй шаг
            tempArrPaths[i] = tempFunc([tempArrPaths[i][0], tempArrPaths[i][1]])
            for(var j = 2; j < 8; j++){ // третий шаг
                tempArrPaths[i][j] = tempFunc([tempArrPaths[i][j][0], tempArrPaths[i][j][1]])
                for(var k = 2; k < 8; k++){ // четвертый шаг      
                    tempArrPaths[i][j][k] = tempFunc([tempArrPaths[i][j][k][0], tempArrPaths[i][j][k][1]])
                }
            }
        }
        return tempArrPaths
    }else{
///ааа
///ааа
    
        //Путин не смотри сюда
        //Страшно
        if(isEnemyInThisHex(currentX, currentY) && units[whatIsUnitIndex(currentX, currentY)].side !== yourSide){
            arrPaths[currentArrId][0] += 1
        }
        deltaX = toHexX - currentX
        deltaY = toHexY - currentY
        if(currentX === toHexX && currentY === toHexY){
        }else if(deltaX === deltaY && deltaX > 0 && deltaY > 0){
            if(hexArr[currentX+1][currentY+1].groundType == 'water' || hexArr[currentX+1][currentY+1].groundType == 'mountain'){
                return
            }
            arrPaths[currentArrId].push(currentX+1, currentY+1)
            makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
        }else if(-deltaX === deltaY  && deltaX < 0 && deltaY > 0){
            if(hexArr[currentX-1][currentY+1].groundType == 'water' || hexArr[currentX-1][currentY+1].groundType == 'mountain'){
                return
            }
            arrPaths[currentArrId].push(currentX-1, currentY+1)
            makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, currentArrId)
            if(hexArr[currentX+1][currentY-1].groundType == 'water' || hexArr[currentX+1][currentY-1].groundType == 'mountain'){
                return
            }
        }else if(deltaX === -deltaY  && deltaX > 0 && deltaY < 0){
            arrPaths[currentArrId].push(currentX+1, currentY-1)
            makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
        }else if(deltaX === deltaY  && deltaX < 0 && deltaY < 0){
            if(hexArr[currentX-1][currentY-1].groundType == 'water' || hexArr[currentX-1][currentY-1].groundType == 'mountain'){
                return
            }
            arrPaths[currentArrId].push(currentX-1, currentY-1)
            makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, currentArrId)
        }else if(deltaX > 2 && deltaY > 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+2, currentY)
            arrPaths[arrPaths.length-1].push(currentX+1, currentY+1)
            makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+2, currentY, toHexX, toHexY, currentArrId)
        }else if(deltaX > 2 && deltaY < 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+2, currentY)
            arrPaths[arrPaths.length-1].push(currentX+1, currentY-1)
            makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+2, currentY, toHexX, toHexY, currentArrId)
        }else if(deltaX < -2 && deltaY > 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX-2, currentY)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
            makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX-2, currentY, toHexX, toHexY, currentArrId)
        }else if(deltaX < -2 && deltaY < 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX-2, currentY)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
            makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX-2, currentY, toHexX, toHexY, currentArrId)
        }else if(deltaY === 0 && deltaX > 0){
            if(hexArr[currentX+2][currentY].groundType == 'water' || hexArr[currentX+2][currentY].groundType == 'mountain'){
                return
            }
            arrPaths[currentArrId].push(currentX+2, currentY)
            makeNewStepInThePath(currentX+2, currentY, toHexX, toHexY, currentArrId)
        }else if(deltaY === 0 && deltaX < 0){
            if(hexArr[currentX-2][currentY].groundType == 'water' || hexArr[currentX-2][currentY].groundType == 'mountain'){
                return
            }
            arrPaths[currentArrId].push(currentX-2, currentY)
            makeNewStepInThePath(currentX-2, currentY, toHexX, toHexY, currentArrId)
        }else if(deltaX === 0 && deltaY < 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+1, currentY-1)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
            makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
        }else if(deltaX === 0 && deltaY > 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+1, currentY+1)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
            makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
        }else if((deltaX === 1 || deltaX === 2) && deltaY > 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+1, currentY+1)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
            makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
        }else if((deltaX === 1 || deltaX === 2) && deltaY < 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+1, currentY-1)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
            makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
        }else if((deltaX === -1 || deltaX === -2)  && deltaY > 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+1, currentY+1)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY+1)
            makeNewStepInThePath(currentX-1, currentY+1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+1, currentY+1, toHexX, toHexY, currentArrId)
        }else if((deltaX === -1 || deltaX === -2)  && deltaY < 0){
            arrPaths.push(0, arrPaths[currentArrId].slice())
            arrPaths[currentArrId].push(currentX+1, currentY-1)
            arrPaths[arrPaths.length-1].push(currentX-1, currentY-1)
            makeNewStepInThePath(currentX-1, currentY-1, toHexX, toHexY, arrPaths.length-1)
            makeNewStepInThePath(currentX+1, currentY-1, toHexX, toHexY, currentArrId)
        }
    }
}
var canThisUnitSeeThisHex = function(unitX, unitY, hexX, hexY){
    //aaa
    arrPaths = makeNewStepInThePath(unitX, unitY, hexX, hexY, 0, 'Range')
    toHexX = hexX
    toHexY = hexY
    result = []
    currentDist = 999
    if(unitX == hexX && unitY == hexY) return true
    for(var i = 2; i < 8; i++){
        if(arrPaths[i][0] < 0 || arrPaths[i][1] < 0) continue
        if(hexArr[unitX][unitY].groundType == 'hill'){
            if(hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'mountain'){
                if(toHexX == arrPaths[i][0] && toHexY == arrPaths[i][1]){
                    return true
                }else{
                    continue
                }
            }
        }else{
            if(hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'mountain' || hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'hill' || hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'forest'){
                if(toHexX == arrPaths[i][0] && toHexY == arrPaths[i][1]){
                    return true
                }else{
                    continue
                }
            }
        }
        
        if(toHexX == arrPaths[i][0] && toHexY == arrPaths[i][1]){
            result = [arrPaths[i][0], arrPaths[i][1]]
            currentDist = 1
            break
        }
        for(var j = 2; j < 8; j++){
            if(arrPaths[i][j][0] < 0 || arrPaths[i][j][1] < 0) continue
            
            if(hexArr[unitX][unitY].groundType == 'hill'){
                if(hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'mountain'){
                    if(toHexX == arrPaths[i][j][0] && toHexY == arrPaths[i][j][1]){
                        return true
                    }else{
                        continue
                    }
                }
            }else{
                if(hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'mountain' || hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'hill' || hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'forest'){
                    if(toHexX == arrPaths[i][j][0] && toHexY == arrPaths[i][j][1]){
                        return true
                    }else{
                        continue
                    }
                }
            }
            if(toHexX == arrPaths[i][j][0] && toHexY == arrPaths[i][j][1]){
                result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1]]
                currentDist = 2
                break
            }
            
                // for(var k = 2; k < 8; k++){
                //     if(arrPaths[i][j][k][0] < 0 || arrPaths[i][j][k][1] < 0) continue
                    
                //     if(hexArr[arrPaths[i][j][k][0]][arrPaths[i][j][k][1]].groundType == 'water' || hexArr[arrPaths[i][j][k][0]][arrPaths[i][j][k][1]].groundType == 'mountain') continue
                //     if(toHexX == arrPaths[i][j][k][0] && toHexY == arrPaths[i][j][k][1]){
                //         result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1], arrPaths[i][j][k][0], arrPaths[i][j][k][1]]
                //         currentDist = 3
                //         break
                //     }
                // }
            
            
        }
    }
    if(currentDist > 10){
        return false
    }else{
        return true
    }
    
    //aaa
}
var canThisUnitGoToThisHex = function(currentHexX, currentHexY, toHexX, toHexY, dist){
    unitIndex = whatIsUnitIndex(currentHexX, currentHexY)
    if((units[unitIndex].speed-Math.ceil(units[unitIndex].cooldown/(600/units[unitIndex].speed))) < dist){
        return false
        
    }else{
        for(var i = 0; i < units.length; i++){
            if(units[i].globalToX == toHexX && units[i].globalToY == toHexY && units[i].side == yourSide){
                return false
            }
        }
        return true
    }
}
var createMovePath = function(hexX, hexY, toHexX, toHexY, dist){
    unitIndex = whatIsUnitIndex(hexX, hexY)
    if(!canThisUnitGoToThisHex(hexX, hexY, toHexX, toHexY, dist)){
        falseHexX = toHexX
        falseHexY = toHexY
        timerFalseHex = TIMEFALSEHEX
        return
    }
   
    resultPath = []
    resultCountOfEnemy = -1
    resultArrIndex = -1
    arrPaths = [[0]]
    currentX = hexX
    currentY = hexY
    deltaX = toHexX - currentX
    deltaY = toHexY - currentY
    
    if(units[whatIsUnitIndex(hexX, hexY)].type === 'A' || units[whatIsUnitIndex(hexX, hexY)].type === 'R' || units[whatIsUnitIndex(hexX, hexY)].type === 'D' || units[whatIsUnitIndex(hexX, hexY)].type === 'W'){
        arrPaths = makeNewStepInThePath(currentX, currentY, toHexX, toHexY, 0, 'Range')
        result = []
        currentDist = 999
        out: for(var i = 2; i < 8; i++){
            if(arrPaths[i][0] < 0 || arrPaths[i][1] < 0) continue
            if((units[whatIsUnitIndex(hexX, hexY)].type === 'A' || units[whatIsUnitIndex(hexX, hexY)].type === 'R' || units[whatIsUnitIndex(hexX, hexY)].type === 'D' || units[whatIsUnitIndex(hexX, hexY)].type === 'W') && isEnemyInThisHex(arrPaths[i][0], arrPaths[i][1])) continue
            if(hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'water' || hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'mountain') continue
            if(toHexX == arrPaths[i][0] && toHexY == arrPaths[i][1] && currentDist > 1){
                result = [arrPaths[i][0], arrPaths[i][1]]
                currentDist = 1
                break
            }
            for(var j = 2; j < 8; j++){
                if(arrPaths[i][j][0] < 0 || arrPaths[i][j][1] < 0) continue
                if((units[whatIsUnitIndex(hexX, hexY)].type === 'A' || units[whatIsUnitIndex(hexX, hexY)].type === 'R' || units[whatIsUnitIndex(hexX, hexY)].type === 'D' || units[whatIsUnitIndex(hexX, hexY)].type === 'W') && isEnemyInThisHex(arrPaths[i][j][0], arrPaths[i][j][1])) continue
                if(hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'water' || hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'mountain') continue
                if(toHexX == arrPaths[i][j][0] && toHexY == arrPaths[i][j][1]  && currentDist > 2){
                    result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1]]
                    currentDist = 2
                    break
                }
                for(var k = 2; k < 8; k++){
                    if(arrPaths[i][j][k][0] < 0 || arrPaths[i][j][k][1] < 0) continue
                    if((units[whatIsUnitIndex(hexX, hexY)].type === 'A' || units[whatIsUnitIndex(hexX, hexY)].type === 'R' || units[whatIsUnitIndex(hexX, hexY)].type === 'D' || units[whatIsUnitIndex(hexX, hexY)].type === 'W') && isEnemyInThisHex(arrPaths[i][j][k][0], arrPaths[i][j][k][1])) continue
                    if(hexArr[arrPaths[i][j][k][0]][arrPaths[i][j][k][1]].groundType == 'water' || hexArr[arrPaths[i][j][k][0]][arrPaths[i][j][k][1]].groundType == 'mountain') continue
                    if(toHexX == arrPaths[i][j][k][0] && toHexY == arrPaths[i][j][k][1] && currentDist > 3){
                        result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1], arrPaths[i][j][k][0], arrPaths[i][j][k][1]]
                        currentDist = 3
                        break
                    }
                    for(var z = 2; z < 8; z++){
                        if(arrPaths[i][j][k][z][0] < 0 || arrPaths[i][j][k][z][1] < 0) continue
                        if((units[whatIsUnitIndex(hexX, hexY)].type === 'A' || units[whatIsUnitIndex(hexX, hexY)].type === 'R' || units[whatIsUnitIndex(hexX, hexY)].type === 'D' || units[whatIsUnitIndex(hexX, hexY)].type === 'W') && isEnemyInThisHex(arrPaths[i][j][k][z][0], arrPaths[i][j][k][z][1])) continue
                        if(hexArr[arrPaths[i][j][k][z][0]][arrPaths[i][j][k][z][1]].groundType == 'water' || hexArr[arrPaths[i][j][k][z][0]][arrPaths[i][j][k][z][1]].groundType == 'mountain') continue
                        if(toHexX == arrPaths[i][j][k][z][0] && toHexY == arrPaths[i][j][k][z][1] && currentDist > 4){
                            result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1], arrPaths[i][j][k][0], arrPaths[i][j][k][1], arrPaths[i][j][k][z][0], arrPaths[i][j][k][z][1]]
                            currentDist = 4
                            break
                        }
                    }
                }
            }
        }
        dist = currentDist
        
        var t = 600/units[unitIndex].speed
        var countPower = units[unitIndex].speed-Math.ceil(units[unitIndex].cooldown/t)
        if(countPower < dist){
            activeHexX = hexX
            activeHexY = hexY
            activeType = 'unit'
            units[unitIndex].active = true
            falseHexX = toHexX
            falseHexY = toHexY
            timerFalseHex = TIMEFALSEHEX
            return
        }
        result.unshift(0)
        arrPaths = []
        arrPaths.push(result)
        resultArrIndex = 0
    }else if(units[whatIsUnitIndex(hexX, hexY)].type === 'C' || units[whatIsUnitIndex(hexX, hexY)].type === 'S' || units[whatIsUnitIndex(hexX, hexY)].type === 'P'){
        arrPaths = makeNewStepInThePath(currentX, currentY, toHexX, toHexY, 0, 'Melee')
        result = []
        currentDist = 999
        previousCountOfEnemies = 0 
        currentCountOfEnemies = 0
        tempCountOfEnemies = 0
        for(var i =  2; i < 8; i++){
            
            currentCountOfEnemies = 0
            if(isEnemyInThisHex(arrPaths[i][0], arrPaths[i][1])) currentCountOfEnemies++
            if(arrPaths[i][0] < 0 || arrPaths[i][1] < 0) continue
            if(hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'water' || hexArr[arrPaths[i][0]][arrPaths[i][1]].groundType == 'mountain') continue
            if(toHexX == arrPaths[i][0] && toHexY == arrPaths[i][1] && currentDist >= 1){
                if(currentCountOfEnemies < previousCountOfEnemies && currentDist == 1) continue
                result = [arrPaths[i][0], arrPaths[i][1]]
                currentDist = 1
                previousCountOfEnemies = currentCountOfEnemies
                currentCountOfEnemies = 0
                continue
            }for(var j = 2; j < 8; j++){
                currentCountOfEnemies = 0
                if(isEnemyInThisHex(arrPaths[i][0], arrPaths[i][1])) currentCountOfEnemies++
                if(isEnemyInThisHex(arrPaths[i][j][0], arrPaths[i][j][1])) currentCountOfEnemies++
                if(arrPaths[i][j][0] < 0 || arrPaths[i][j][1] < 0) continue
                if(hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'water' || hexArr[arrPaths[i][j][0]][arrPaths[i][j][1]].groundType == 'mountain') continue
                
                if(toHexX == arrPaths[i][j][0] && toHexY == arrPaths[i][j][1]  && currentDist >= 2){
                    if(currentCountOfEnemies < previousCountOfEnemies && currentDist == 2) continue
                    result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1]]
                    currentDist = 2
                    previousCountOfEnemies = currentCountOfEnemies
                    currentCountOfEnemies = 0
                    continue
                }
                for(var k = 2; k < 8; k++){
                    currentCountOfEnemies = 0
                    if(isEnemyInThisHex(arrPaths[i][0], arrPaths[i][1])) currentCountOfEnemies++
                    if(isEnemyInThisHex(arrPaths[i][j][0], arrPaths[i][j][1])) currentCountOfEnemies++
                    if(isEnemyInThisHex(arrPaths[i][j][k][0], arrPaths[i][j][k][1])) currentCountOfEnemies++
                    if(arrPaths[i][j][k][0] < 0 || arrPaths[i][j][k][1] < 0) continue
                    if(hexArr[arrPaths[i][j][k][0]][arrPaths[i][j][k][1]].groundType == 'water' || hexArr[arrPaths[i][j][k][0]][arrPaths[i][j][k][1]].groundType == 'mountain') continue
                    
                    if(toHexX == arrPaths[i][j][k][0] && toHexY == arrPaths[i][j][k][1] && currentDist >= 3){
                        if(currentCountOfEnemies < previousCountOfEnemies && currentDist == 3) continue
                        result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1], arrPaths[i][j][k][0], arrPaths[i][j][k][1]]
                        currentDist = 3
                        previousCountOfEnemies = currentCountOfEnemies
                        currentCountOfEnemies = 0
                        continue
                    }
                    for(var z = 2; z < 8; z++){
                        currentCountOfEnemies = 0
                        if(isEnemyInThisHex(arrPaths[i][0], arrPaths[i][1])) currentCountOfEnemies++
                        if(isEnemyInThisHex(arrPaths[i][j][0], arrPaths[i][j][1])) currentCountOfEnemies++
                        if(isEnemyInThisHex(arrPaths[i][j][k][0], arrPaths[i][j][k][1])) currentCountOfEnemies++
                        if(isEnemyInThisHex(arrPaths[i][j][k][z][0], arrPaths[i][j][k][z][1])) currentCountOfEnemies++
                        if(arrPaths[i][j][k][z][0] < 0 || arrPaths[i][j][k][z][1] < 0) continue
                        if(hexArr[arrPaths[i][j][k][z][0]][arrPaths[i][j][k][z][1]].groundType == 'water' || hexArr[arrPaths[i][j][k][z][0]][arrPaths[i][j][k][z][1]].groundType == 'mountain') continue
                       
                        if(toHexX == arrPaths[i][j][k][z][0] && toHexY == arrPaths[i][j][k][z][1] && currentDist >= 4){
                            if(currentCountOfEnemies < previousCountOfEnemies && currentDist == 4) continue
                            result = [arrPaths[i][0], arrPaths[i][1], arrPaths[i][j][0], arrPaths[i][j][1], arrPaths[i][j][k][0], arrPaths[i][j][k][1], arrPaths[i][j][k][z][0], arrPaths[i][j][k][z][1]]
                            
                            currentDist = 4
                            previousCountOfEnemies = currentCountOfEnemies
                            currentCountOfEnemies = 0
                            continue
                        }
                    }
                }
            }
        }
        dist = currentDist
        
        var t = 600/units[unitIndex].speed
        var countPower = units[unitIndex].speed-Math.ceil(units[unitIndex].cooldown/t)
        if(countPower < dist){
            activeHexX = hexX
            activeHexY = hexY
            activeType = 'unit'
            units[unitIndex].active = true
            falseHexX = toHexX
            falseHexY = toHexY
            timerFalseHex = TIMEFALSEHEX
            return
        }
        result.unshift(0)
        arrPaths = []
        arrPaths.push(result)
        resultArrIndex = 0
        //resultArrIndex = -1
        /* console.log(arrPaths)
        console.log(arrPaths[0])
        console.log(arrPaths[0][arrPaths[0].length-2],arrPaths[0][arrPaths[0].length-1])
        for(var i = 0; i < arrPaths.length; i++){
            if(arrPaths[i][arrPaths[i].length-2] !== toHexX || arrPaths[i][arrPaths[i].length-1] !== toHexY){
                //resultArrIndex = -1
                continue
            }
            if(arrPaths[i][0] > resultCountOfEnemy){
                resultCountOfEnemy = arrPaths[i][0]
                resultArrIndex = i
            }
        } */
    }
    if(resultArrIndex > -1){
        resultPath = arrPaths[resultArrIndex].slice(1)
        for(var i = 0; i < resultPath.length; i++){
            if(i % 2) units[unitIndex].stepToY.push(resultPath[i])
            if(!(i % 2)) units[unitIndex].stepToX.push(resultPath[i])
        }
        sentUnit(toHexX, toHexY, dist)
    }else{
        falseHexX = toHexX
        falseHexY = toHexY
        timerFalseHex = TIMEFALSEHEX
    }
        
}
var sentUnit = function(toHexX, toHexY, dist){
    socket.emit('updateInfoAboutGame', ['moveUnit', units[unitIndex].id, units[unitIndex].stepToX,  units[unitIndex].stepToY, dist])
    units[unitIndex].move = true
    units[unitIndex].globalToX = toHexX
    units[unitIndex].globalToY = toHexY
    units[unitIndex].cooldown += dist*600/units[unitIndex].speed
    units[unitIndex].direction = whatIsDirection(units[unitIndex].hexX, units[unitIndex].hexY, units[unitIndex].stepToX[0], units[unitIndex].stepToY[0])
}
var PEatEnemyIfCan = function(x, y){
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX == x && units[i].hexY == y && units[i].side != yourSide){
            fight(whatIsUnitIndex(x,y),i)
            //eatUnit(i)
            return true
        }
    }
}
var checkRangerInTheHill = function(unitIndex){
    if(hexArr[units[unitIndex].hexX][units[unitIndex].hexY].groundType == 'hill' && units[unitIndex].type == 'A'){
        units[unitIndex].range = 3
    }else if(units[unitIndex].type == 'A'){
        units[unitIndex].range = 2
    }
}
var moveUnits = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].move){
            if(units[i].type === 'P'){
                if(PEatEnemyIfCan(units[i].stepToX[0], units[i].stepToY[0])){
                    if(units[i].stepToX.length == 1){ 
                        units[i].globalToX = units[i].hexX
                        units[i].globalToY = units[i].hexY
                        units[i].stepToX.shift()
                        units[i].stepToY.shift()
                        units[i].move = false
                        units[i].inCooldown = true
                        checkCollision(i)
                        break
                    }
                }
            }
            var oneStepX, oneStepY
            if(Math.round(units[i].x) === units[i].stepToX[0]*32+32 && Math.round(units[i].y) === units[i].stepToY[0]*48+32){
                
                units[i].hexX = units[i].stepToX[0]
                units[i].hexY = units[i].stepToY[0]
                units[i].stepToX.shift()
                units[i].stepToY.shift()
                if(units[i].stepToX.length === 0){
                    checkRangerInTheHill(i)
                    units[i].move = false
                    units[i].inCooldown = true
                    checkCollision(i)
                    updateVisible()
                    break
                } 
                units[i].direction = whatIsDirection(units[i].hexX, units[i].hexY, units[i].stepToX[0], units[i].stepToY[0])
                checkCollision(i)
                updateVisible()
                
                break
                
                
            }
            deltaX = (units[i].stepToX[0] - units[i].hexX) * 32
            deltaY = (units[i].stepToY[0] - units[i].hexY) * 48
            oneStepX = deltaX/60*units[i].speed
            oneStepY = deltaY/60*units[i].speed
            units[i].x += oneStepX
            units[i].y += oneStepY
        }
    }
}
var checkCooldown = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].inCooldown){
            units[i].cooldown--
            if(units[i].cooldown < 1) units[i].inCooldown = false
        }
    }
    for(var i = 0; i < builds.length; i++){
        if(builds[i].inCooldown){
            builds[i].cooldownAttack--
            if(builds[i].cooldownAttack < 1) builds[i].inCooldown = false
        }
    }
}
var fight = function(unitIndexAttack, unitIndexDefend, isArrow){
    if(isArrow){
        if(unitIndexDefend == 'W' || unitIndexDefend == 'S'){
            eatUnit(unitIndexDefend)
        }else{
            chance = 0.75
            if(isAttackerWinInTheFight(chance)){
                eatUnit(unitIndexDefend)
            }
        }
        return
    }
    typeAttack = null //сзади, сбоку, спереди(front, flank, back)
    attackerDir = units[unitIndexAttack].direction
    defenderDir = units[unitIndexDefend].direction
    attackerType = units[unitIndexAttack].type
    defenderType = units[unitIndexDefend].type
    if(
    (attackerDir == 'right' && defenderDir == 'left') ||
    (attackerDir == 'left' && defenderDir == 'right') ||
    (attackerDir == 'down-right' && defenderDir == 'up-left') ||
    (attackerDir == 'down-left' && defenderDir == 'up-right') ||
    (attackerDir == 'up-right' && defenderDir == 'down-left') ||
    (attackerDir == 'up-left' && defenderDir == 'down-right')
    ){
        typeAttack = 'front'
    }else if(
    (attackerDir == 'right' && (defenderDir == 'up-left' || defenderDir == 'down-left')) ||
    (attackerDir == 'left' && (defenderDir == 'up-right' || defenderDir == 'down-right')) ||
    (attackerDir == 'down-right' && (defenderDir == 'left' || defenderDir == 'up-right')) ||
    (attackerDir == 'down-left' && (defenderDir == 'right' || defenderDir == 'up-left')) ||
    (attackerDir == 'up-right' && (defenderDir == 'left' || defenderDir == 'down-right')) ||
    (attackerDir == 'up-left' && (defenderDir == 'right' || defenderDir == 'down-left'))
    ){
        typeAttack = 'flank'
    }else{
        typeAttack = 'back'
    }
    attackerChanceToWin = getChanceToWin(typeAttack, attackerType, defenderType)
    if(isAttackerWinInTheFight(attackerChanceToWin)){
        eatUnit(unitIndexDefend)
    }else{
        eatUnit(unitIndexAttack)
    }
}
var isAttackerWinInTheFight = function(chance){
    if(Math.random() < chance){
        return true
    }else{
        return false
    }
}
var getChanceToWin = function(typeAttack, attackerType, defenderType){
    
    chance = 0.5
    
    if(typeAttack == 'back') chance += 0.5
    if(typeAttack == 'flank') chance += 0.25
    if(defenderType == 'W') chance += 0.25
    if(defenderType == 'D' && (attackerType == 'C' || attackerType == 'P')) chance += 0.5
    if(defenderType == 'D' && attackerType == 'S') chance -= 0.25
    if(attackerType == 'P' && defenderType == 'C') chance += 0.5
    if(attackerType == 'C' && defenderType == 'P' && typeAttack == 'front') chance += -0.5
    if(attackerType == 'C' && defenderType == 'P' && typeAttack == 'flank') chance += -0.25
    if(attackerType == 'C' && defenderType == 'P' && typeAttack == 'back') chance += 0.5
    if(attackerType == 'C' && defenderType == 'S') chance += 0.25
    if(attackerType == 'S' && defenderType == 'C') chance += -0.25
    if(defenderType == 'A' || defenderType == 'R') chance += 0.5
    if(chance > 1) chance = 1
    if(chance < 0) chance = 0
    return chance
}
var eatUnit = function(index){
    socket.emit('updateInfoAboutGame', ['killUnit', units[index].id])
    units.splice(index, 1)
    //socket.emit('updateInfoAboutGame', [0, units, builds, arrows])
        
}
var fightVsStructure = function(unit, structure){
    
    if(builds[structure].type == 'C'){
        socket.emit('updateInfoAboutGame', ['killBuild', builds[structure].id])
        socket.emit('updateInfoAboutGame', ['killUnit', units[unit].id])
        builds.splice(structure, 1)
        units.splice(unit, 1)
    }else{
        socket.emit('updateInfoAboutGame', ['killBuild', builds[structure].id])
        builds.splice(structure, 1)
    }
    //socket.emit('updateInfoAboutGame', [0, units, builds, arrows])
        
}
var checkCollision = function(unitWhoEat){
        for(var i = 0; i < units.length; i++){
            
                if(units[unitWhoEat].hexX === units[i].hexX && units[unitWhoEat].hexY === units[i].hexY && units[unitWhoEat].side !== units[i].side){
                   
                    fight(unitWhoEat, i)
                    //eatUnit(j)
                    return
                }
        }
        for(var i = 0; i < builds.length; i++){
            if(units[unitWhoEat].hexX === builds[i].hexX && units[unitWhoEat].hexY === builds[i].hexY &&  units[unitWhoEat].side !== builds[i].side){
                fightVsStructure(unitWhoEat, i)
                return
            }
        }
            // if(units[i].move){
            //     if(i !== j && units[i].hexX === units[j].hexX && units[i].hexY === units[j].hexY && !units[j].move && units[i].side !== units[j].side){
            //         console.log('Бой между ', unitWhoEat, j)
            //         console.log('До')
            //         console.log(units)
            //         fight(unitWhoEat,j)
            //         console.log('После')
            //         console.log(units)
            //         //eatUnit(j)
            //         return
            // }
            // }
      
}
var renderBattery = function(){
    for(var i = 0; i < builds.length; i++){
        if(!hexArr[builds[i].hexX][builds[i].hexY].visible) continue
        if(builds[i].type === 'C'){
            var t = 600/builds[i].speed
            var countPower = builds[i].speed-Math.ceil(builds[i].cooldownAttack/t)
            var k = t/6
            for(var j = 0; j <= countPower; j++){
                if(j !== countPower){
                    
                    ctx.fillStyle = ctx.fillStyle = 'rgba(29, 176, 0, 0.5)'
                    ctx.fillRect(builds[i].x+16, builds[i].y + 10 - 8*j, 13, 6)
                }else if(builds[i].cooldownAttack % t){
                    ctx.fillStyle = 'rgba(255,142,0,0.5)'
                    ctx.fillRect(builds[i].x+16, (builds[i].y + 10 - 8*j) + (builds[i].cooldownAttack - (builds[i].speed-1 - countPower)*t)/k, 13, 6 - (builds[i].cooldownAttack - (builds[i].speed-1 - countPower)*t)/k)
                }
            }
        }
    }
    for(var i = 0; i < units.length; i++){
        if(!hexArr[units[i].hexX][units[i].hexY].visible) continue
        var t = 600/units[i].speed
        var countPower = units[i].speed-Math.ceil(units[i].cooldown/t)
        var k = t/6
        for(var j = 0; j <= countPower; j++){
            if(j !== countPower){
                ctx.fillStyle = ctx.fillStyle = 'rgba(29, 176, 0, 0.5)'
                ctx.fillRect(units[i].x+16, units[i].y + 10 - 8*j, 13, 6)
            }else if(units[i].cooldown % t){
                ctx.fillStyle = 'rgba(255,142,0,0.5)'
                ctx.fillRect(units[i].x+16, (units[i].y + 10 - 8*j) + (units[i].cooldown - (units[i].speed-1 - countPower)*t)/k, 13, 6 - (units[i].cooldown - (units[i].speed-1 - countPower)*t)/k)
            }
        }
    }
}
var checkFalseHex = function(){
    if(falseHexX !== -1 && falseHexY !== -1 && timerFalseHex > 0){
        ctx.drawImage(falseHex, 32*falseHexX, 48*falseHexY)
        timerFalseHex--
        if(timerFalseHex <= 0){
            falseHexX = -1
            falseHexY = -1
        }
    }
}
var moveAndCheckArrows = function(){
    
    for(var i = 0; i < arrows.length; i++){
        arrows[i].x += arrows[i].stepX
        arrows[i].y += arrows[i].stepY
        
        if(arrows[i].type == 'dartArrow'){
            for(var j = 0; j < units.length; j++){
                if(Math.round(arrows[i].x) == Math.round(units[j].x) && Math.round(arrows[i].y) == Math.round(units[j].y)){
                    eatUnit(j)
                    break
                }
            }
        }
        if(arrows[i].toX === Math.round(arrows[i].x) && arrows[i].toY === Math.round(arrows[i].y)){
            if(isEnemyInThisHex(arrows[i].toHexX, arrows[i].toHexY) || isUnitsInThisHex(arrows[i].toHexX, arrows[i].toHexY)){
                if(arrows[i].speed > 2){
                    eatUnit(whatIsUnitIndex(arrows[i].toHexX, arrows[i].toHexY))
                }else{
                    fight(null, whatIsUnitIndex(arrows[i].toHexX, arrows[i].toHexY), true)
                }
                
            }
            socket.emit('updateInfoAboutGame', ['killArrow', i])
            arrows.splice(i, 1)
            //socket.emit('updateInfoAboutGame', [0, units, builds, arrows])
        
        }
    }
}
var renderArrows = function(){
    for(var i = 0; i < arrows.length; i++){
        ctx.fillRect(arrows[i].x, arrows[i].y, 4, 4)
    }
}
var renderBuilds = function(){
    for(var i = 0; i < builds.length; i++){
        if(!hexArr[builds[i].hexX][builds[i].hexY].visible) continue
        if(builds[i].side == 'Blue'){
            if(builds[i].active){
                builds[i].color = '#4671D5'
            }else{
                builds[i].color = '#505050'
            }
        }else if(builds[i].side == 'Red'){
            if(builds[i].active){
                builds[i].color = '#2671D5'
            }else{
                builds[i].color = '#502050'
            }
        }
            ctx.fillStyle = builds[i].color
            ctx.font = "bold 32px Courier"
            switch(builds[i].type){
                case 'C':
                    ctx.fillText('C', builds[i].x-12, builds[i].y+12)
                    break
                case 'B':
                    ctx.fillText('B', builds[i].x-12, builds[i].y+12)
                    break
                case 'R':
                    ctx.fillText('R', builds[i].x-12, builds[i].y+12)
                    break
                case 'S':
                    ctx.fillText('S', builds[i].x-12, builds[i].y+12)
                    break
                case 'H':
                    ctx.fillText('H', builds[i].x-12, builds[i].y+12)
                    break
            }
            /* ctx.fillRect(builds[i].x, builds[i].y, 8, 8) */
    }
    ctx.fillStyle = '#000000'
}
var renderEditButton = function(){
    for(var i = 0; i < 8; i++){
        switch(i){
            case 0:
                ctx.fillStyle = currentEditorColor
                break
            case 1:
                ctx.fillStyle = 'rgba(147, 200, 83, 0)'
                break
            case 2:
                ctx.fillStyle = 'rgb(147, 200, 83)'
                break
            case 3:
                ctx.fillStyle = 'rgb(31, 116, 16)'
                break
            case 4:
                ctx.fillStyle = 'rgb(255, 255, 130)'
                break
            case 5:
                ctx.fillStyle = 'rgb(176, 129, 21)'
                break
            case 6:
                ctx.fillStyle = 'rgb(105, 24, 4)'
                break
            case 7:
                ctx.fillStyle = 'rgb(0, 6, 104)'
                break
            
        }
        ctx.fillRect(1500,20+i*64,64,64)
        
    }
}
var renderUnits = function(){
    for(var i = 0; i < units.length; i++){
        if(!hexArr[units[i].hexX][units[i].hexY].visible) continue
        if(units[i].active && units[i].side == yourSide){
            units[i].color = '#67E300'
        } else if(units[i].side === "Blue"){
            units[i].color = '#190772'
        } else if(units[i].side === "Red"){
            units[i].color = '#9F0013'
        }
        ctx.fillStyle = units[i].color
        switch(units[i].direction){
            case 'right':
                ctx.fillRect(units[i].x+12, units[i].y-2, 4, 4)
                break;
            case 'left':
                ctx.fillRect(units[i].x-18, units[i].y-2, 4, 4)
                break;
            case 'down-right':
                ctx.fillRect(units[i].x+10, units[i].y+10, 4, 4)
                break;
            case 'down-left':
                ctx.fillRect(units[i].x-14, units[i].y+14, 4, 4)
                break;
            case 'up-right':
                ctx.fillRect(units[i].x+10, units[i].y-14, 4, 4)
                break;
            case 'up-left':
                ctx.fillRect(units[i].x-14, units[i].y-14, 4, 4)
                break;
        }
        /* ctx.fillRect(units[i].x, units[i].y, 8, 8) */
        ctx.font = "bold 32px Courier"
        switch(units[i].type){
            case 'C':
                ctx.fillText('C', units[i].x-12, units[i].y+12)
                break
            case 'A':
                ctx.fillText('A', units[i].x-12, units[i].y+12)
                break
            case 'P':
                ctx.fillText('P', units[i].x-12, units[i].y+12)
                break
            case 'S':
                ctx.fillText('S', units[i].x-12, units[i].y+12)
                break
            case 'R':
                ctx.fillText('R', units[i].x-12, units[i].y+12)
                break
            case 'D':
                ctx.fillText('D', units[i].x-12, units[i].y+12)
                break
            case 'W':
                ctx.fillText('W', units[i].x-12, units[i].y+12)
                break
        }
    }
    ctx.fillStyle = '#000000'
    
}
var updateInfoAboutBuild = function(){
    if(whatIsUnitIndex(activeHexX, activeHexY) >= 0 && units[whatIsUnitIndex(activeHexX, activeHexY)].type == 'W'){
        whatCanBuild()
    }else if(whatIsBuildIndex(activeHexX, activeHexY) >= 0){
        whatCanBuild()
    }else{
        wantToBuildStructure = false
        whatBuildStructure = ''
        buildStructureHexX = null
        buildStructureHexY = null
        canMakeBuild = []
        wantToBuildUnit = false
        whatBuildUnit = ''
        buildUnitHexX = null
        buildUnitHexY = null
        canMakeUnit = []
    }
    
}
var whatCanBuild = function(){
    canMakeUnit = []
    canMakeBuild = []
    if(activeType == 'build'){
        for(var i = 0; i < builds.length; i++){
            
            if(activeHexX == builds[i].hexX && activeHexY == builds[i].hexY){
                if(builds[i].type == 'C'){
                    if(food >= 20){
                        canMakeUnit = ['C','A','P','S','R','D','W']
                    }else if(food >= 15){
                        canMakeUnit = ['A','P','S','R','W']
                    }else if(food >= 10){
                        canMakeUnit = ['A','P','R','W']
                    }else if(food >= 5){
                        canMakeUnit = ['W']
                    }
                }else if(builds[i].type == 'B'){
                    if(food >= 15){
                        canMakeUnit = ['P','S']
                    }else if(food >= 10){
                        canMakeUnit = ['P']
                    }
                }else if(builds[i].type == 'R'){
                    if(food >= 20){
                        canMakeUnit = ['A','R','D']
                    }else if(food >= 10){
                        canMakeUnit = ['A','R']
                    }
                }else if(builds[i].type == 'S' && food >= 20){
                    canMakeUnit = ['C']
                }else if(builds[i].type == 'H' && food >= 5){
                    canMakeUnit = ['W']
                }
            }
        }
    }else if(activeType == 'unit'){
        for(var i = 0; i < units.length; i++){
            if(activeHexX == units[i].hexX && activeHexY == units[i].hexY){
                if(units[i].type == 'W'){
                    if(yourSide == 'Blue' && blueIsVirgin){
                        canMakeBuild = ['C']
                        return
                    }
                    if(yourSide == 'Red' && redIsVirgin){
                        canMakeBuild = ['C']
                        return
                    }
                    if(wood >= 50){
                        canMakeBuild = ['C','B','R','S','H']
                    }else if(wood >= 20){
                        canMakeBuild = ['B','R','S','H']
                    }else if(wood >= 10){
                        canMakeBuild = ['H']
                    }
                }
            }
        }
    }
    
}
var renderMenu = function(){
    menuctx.font = "bold 32px Courier"
    menuctx.fillStyle = 'rgb(0, 0, 0)'
    menuctx.fillText('Построить:', 8, 42)
    charArr = ['C','B','R','S','H','C','A','P','S','R','D','W']
    for(var i = 0; i < 5; i++){
        menuctx.fillStyle = 'rgba(80, 80, 80, 0.2)'
        menuctx.drawImage(forestHex, 200+i*70, 2)
        for(var j = 0; j < canMakeBuild.length; j++){
            if(charArr[i] == canMakeBuild[j]){
                menuctx.fillStyle = 'rgba(80, 80, 80, 1)'
            }
        }
        menuctx.fillText(charArr[i], 200+i*70+20, 42)
    }
    
    if(yourSide == 'Blue'){
        menuctx.fillStyle = 'rgba(27, 7, 106, 0.2)'
    }else if(yourSide == 'Red'){
        menuctx.fillStyle = 'rgba(159, 0, 19, 0.2)'
    }
    for(var i = 5; i < 12; i++){
        menuctx.fillStyle = 'rgba(80, 80, 80, 0.2)'
        menuctx.drawImage(plainHex, 200+i*70, 2)
        for(var j = 0; j < canMakeUnit.length; j++){
            if(charArr[i] == canMakeUnit[j]){
                menuctx.fillStyle = 'rgba(80, 80, 80, 1)'
            }
        }
        menuctx.fillText(charArr[i], 200+i*70+20, 42)
    }
    menuctx.fillStyle = '#A52A2A'
    menuctx.fillText('Дерево', 1100, 42)
    menuctx.fillStyle = '#008000'
    menuctx.fillText('Еда', 1225, 42)
    menuctx.fillStyle = '#ffd700 '
    menuctx.fillText('Золото', 1300, 42)
    menuctx.font = "bold 26px Courier"
    menuctx.fillStyle = '#A52A2A'
    menuctx.fillText(wood, 1135, 68)
    menuctx.fillStyle = '#008000'
    menuctx.fillText(food, 1235, 68)
    menuctx.fillStyle = '#ffd700 '
    menuctx.fillText(gold.toFixed(1), 1320, 68)
}
var renderBuildStuctureAndUnit = function(){
    if(wantToBuildStructure || wantToBuildUnit){
        for(var i = 0; i < 6; i++){
            hexX = activeHexX
            hexY = activeHexY
            switch(i){
                case 0:
                    hexX -= 2
                    break
                case 1:
                    hexX--
                    hexY--
                    break
                case 2:
                    hexX++
                    hexY--
                    break
                case 3:
                    hexX += 2
                    break
                case 4:
                    hexX++
                    hexY++
                    break
                case 5:
                    hexX--
                    hexY++
                    break
            }
        
        if(hexX < 0 || hexY < 0 || hexX > HEXWIDTH || hexY > HEXHEIGHT || whatIsBuildIndex(hexX, hexY) || whatIsUnitIndex(hexX, hexY)+1 || hexArr[hexX][hexY].groundType == 'mountain') continue
        ctx.drawImage(canBuildHex, hexX*32, hexY*48)
    }
        if(wantToBuildStructure){
            ctx.fillStyle = 'rgba(80, 80, 80, 1)'
            XY = whatHexIsClicked(currentMouseX, currentMouseY)
            buildStructureHexX = XY[0]
            buildStructureHexY = XY[1]
            if(buildStructureHexX >= HEXWIDTH || buildStructureHexY >= HEXHEIGHT || buildStructureHexX < 0 || buildStructureHexY < 0 || !hexArr[buildStructureHexX][buildStructureHexY].visible) return
            ctx.fillText(whatBuildStructure, 20+buildStructureHexX*32, 44+buildStructureHexY*48)
        
        }
        if(wantToBuildUnit){
            XY = whatHexIsClicked(currentMouseX, currentMouseY)
            buildUnitHexX = XY[0]
            buildUnitHexY = XY[1]
        }
        
        
    }
}
var collectRes = function(){
    for(var i = 0; i < units.length; i++){
        if(units[i].type == 'W' && units[i].side == yourSide){
                gold += 1/600/24*5
            if((hexArr[units[i].hexX][units[i].hexY].groundType == 'forest' || hexArr[units[i].hexX][units[i].hexY].groundType == 'beach')){
                if(units[i].progressRes <= 16){
                    units[i].progressRes += 1/60/24*16*5
                }
                
            }else{
                units[i].progressRes = 0
            }
            t = 600/units[i].speed
            countPower = units[i].speed-Math.ceil(units[i].cooldown/t)
            if(units[i].progressRes > 16 && countPower == 2){
                
                if(hexArr[units[i].hexX][units[i].hexY].groundType == 'forest'){
                    wood += 1
                }else if(hexArr[units[i].hexX][units[i].hexY].groundType == 'beach'){
                    food += 1
                } 
                units[i].cooldown += 300
                units[i].inCooldown = true
                units[i].progressRes = 0
            }
        }
    }
}
var renderCollectRes = function(){
    for(var i = 0; i < units.length; i++){
        if(!hexArr[units[i].hexX][units[i].hexY].visible) continue
        if(units[i].progressRes > 0){
            ctx.fillStyle = 'rgb(0, 255, 255)'
            ctx.fillRect(units[i].x-24, units[i].y-4, 8, units[i].progressRes)
        }
    }
}
var checkActive = function(){
    if(activeHexX == -1 && activeHexY == -1){
        return
    }
    for(var i = 0; i < units.length; i++){
        if(units[i].hexX == activeHexX && units[i].hexY == activeHexY){
            return
        }
    }
    for(var i = 0; i < builds.length; i++){
        if(builds[i].hexX == activeHexX && builds[i].hexY == activeHexY){
            return
        }
    }
    activeHexX = -1
    activeHexY = -1
}
var startEditGame = function(){

}
var startGame = function(){
    //createArrs()
    
    //createHexArrs()
    createUnitsArr()
    createBuildsArr()
    updateVisible()
    mainLoop()
}
var mainLoop = function(){
    ctx.clearRect(0, 0, width, height)
    menuctx.clearRect(0, 0, width, 84)
    
    if(mapEditor){
        renderEditButton()
    }
    updateInfoAboutBuild()
    drawHex()
    moveAndCheckArrows()
    renderArrows()
    checkCooldown()
    //checkCollision()
    collectRes()
    renderCollectRes()
    moveUnits()
    renderUnits()
    renderBattery()
    renderBuilds()
    renderMenu()
    renderBuildStuctureAndUnit()
    checkFalseHex()
    checkActive()
    requestAnimationFrame(mainLoop)
}