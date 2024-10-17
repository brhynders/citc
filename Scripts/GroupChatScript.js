$(function () {
    var groupChat = $.connection.groupChat;
    groupChatMethods(groupChat);
    $.connection.hub.logging = true;
    $.connection.hub.start().done(function () {      
        console.log("Connected to Group Chat Hub")
    });
    
    var currentGroupNumber;                 //group_1
    var thisGroup;                          //#group_1
    var groupID;                            //00000000-0000-0000-0000-000000000000
    var groupChatWindow                     //#groupChatId_00000000-0000-0000-0000-000000000000
    var me = $("#UserId").attr("value");    //my id

    function groupChatMethods(groupChat) {        
        groupChat.client.addGroupChatMessage = function (from, fromid, togroupid, message, groupchatwindow) {
            if (fromid == me) {
                var mymessage =
                    '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                    '<label class="mb-0">' + from + '</label>' +
                    '<span>' + message + '</span>' +
                    '</div>';
                var metest = $('#' + groupchatwindow).append(mymessage);
                //$(".pmFrame_" + toid).scrollTop($(".pmFrame_" + toid)[0].scrollHeight)
            }
            else {
                var theirmessage =
                    '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                    '<label class="mb-0">' + from + '</label>' +
                    '<span>' + message + '</span>' +
                    '</div>';
                var themtest = $('#' + groupchatwindow).append(theirmessage);
                //$(".pmFrame_" + fromid).scrollTop($(".pmFrame_" + fromid)[0].scrollHeight)
            }
        }
    }
    $("#groupSelect").change(function (e) {
        $('.chatGroupMember').remove();
        if ($('#groupSelect').val() != "Select Group") {
            currentGroupNumber = $('#groupSelect').val();
            thisGroup = $('#' + currentGroupNumber);
            groupID = $('#ID_' + currentGroupNumber).val();
            groupChatWindow = $('.chatOutput').attr('id', 'groupChatId_' + groupID);
            $('.chatOutput').attr('id', 'groupChatId_' + groupID);
            //ADD GROUP MEMBERS TO SIDEBARE
            var groupMember = $(thisGroup).find('.groupMemberName').each(function () {
                var thisMember = $(this).val()
                var listGroupMember =
                    '<div class="chatGroupMember">' +
                    '<div class="chatGroupMemberAv">' +
                    '<div class="ion-ios-help-outline" style="color:#d2e5f9;font-size:38px;text-align:center;line-height:38px;"></div>' +
                    '</div>' +
                    '<div class="chatGroupMemberName">' + thisMember + '</div>' +
                    '<div class="ion-more"></div>' +
                    '</div>';
                $('#chatGroupMembersContainer').append(listGroupMember);
            });
        }
    });
    $("#groupchatTextInput").keypress(function (e) {
        if (e.which == 13) {
            var from = $("#Username").attr("value");
            var fromid = $("#UserId").attr("value");
            var togroupid = groupID;
            var togroupconns = [];
            var thisGroupConnId = $('#' + currentGroupNumber).find('.memberConnectionId').each(function () {
                togroupconns.push($(this).val());
            });
            var message = $(this).val();
            var groupchatwindow = groupChatWindow;
            if (message.length > 0) {
                groupChat.server.sendGroupMessage(from, fromid, togroupid, togroupconns, message, groupchatwindow);
                $(this).val('');
            };
        }
    });
});


