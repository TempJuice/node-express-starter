console.log('client.js has been loaded');

$(document).ready(function () {
    console.log('jQuery has been loaded');
    getMessages()
    $('#sendMessageButton').on('click', function () {
        console.log('sendmessageButton was clicked');
        var nameInput = $('#nameInput').val();
        var messageInput = $('#messageInput').val();
        var inputObject = {
            name: nameInput,
            message: messageInput
        };

        $.ajax({
            method: 'POST',
            url: '/message',
            data: inputObject,
            success: function (response) {
                console.log(response);
                getMessages()
            }
        })
    })

});

function getMessages() {
    $.ajax({
        method: 'GET',
        url: '/message',
        success: function (response) {
            console.log(response);
            drawMessage(response);
        }
    })
}

function drawMessage(messageArray) {
    $('#messageContainer').empty();
    for (var i = 0; i < messageArray.length; i++) {
        var message = messageArray[i];
        $('#messageContainer').prepend(
            '<div class="username">' + message.name + '</div>' +
            '<div class="message">' + message.message + '</div>'
        );
    }
}

