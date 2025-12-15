var connection = new signalR.HubConnectionBuilder().withUrl("/NotificationUserHub?userId=" + userId).build();
connection.on("sendToUser", (message) => {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messagesList").appendChild(li);

});

connection.start().catch(function (err) {
    return console.error(err.toString());
}).then(function () {
    document.getElementById("userId").innerText = userId;
    connection.invoke('GetConnectionId').then(function (connectionId) {
        //alert('connectionId is :' + connectionId);
        document.getElementById('signalRConnectionId').innerHTML = connectionId;
    })
});

