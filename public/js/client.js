var socket = io.connect()

socket.on('loadPage', function(pageName){
    console.log(pageName)
    include('/js/' + pageName + '.js')
})

function include(url) {
    console.log(url)
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    //loop()
}