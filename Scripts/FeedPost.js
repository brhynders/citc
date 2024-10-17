$(document).ready(function () {
    var posterId = $('#UserId').val();
    var posterName = $('#Username').val();
    var message;
    $('#feedPostInput').keypress(function (e) {
        if (e.which == 13) {
            message = $('#feedPostInput').val();
            if (message.length > 0) {
                var newFeedPost = { "Id": posterId, "UserName": posterName, "Message": message };
                console.log(newFeedPost);
                $.ajax({                 
                    type: "POST",
                    url: "FeedPost",
                    data: JSON.stringify(newFeedPost),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                });
                $('#feedPostInput').val('');
            }
        }
    });    
});
