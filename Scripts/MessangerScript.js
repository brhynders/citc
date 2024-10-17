var toconnid;
var currentGroupNumber;                 //group_1
var thisGroup;                          //#group_1
var groupID;                            //00000000-0000-0000-0000-000000000000
var groupChatWindow                     //#groupChatId_00000000-0000-0000-0000-000000000000
var me = $("#UserId").attr("value");    //my id
$(function () {
    var chatHub = $.connection.chatHub;
    registerClientMethods(chatHub);
    chatHub.logging = true;
    $.connection.hub.start().done(function () {
        registerEvents(chatHub);
    });
});
function registerClientMethods(chatHub) {
    var dctimer;
    var me = $("#Username").val();
    var myid = $('#UserId').val();
    chatHub.client.broadcastConnection = function (connid, name, id) {
        $('#' + id + '> span').css('color', 'limegreen');
        $('#' + id + '> div').css('color', '#1963b3');
        $('#d_ConnId_' + id).attr('value', connid);
        $('#connid_' + id).attr('value', connid); 
        $('#groupMemberConnId_' + id).attr('value' , connid)
        clearTimeout(dctimer);
    }
    chatHub.client.broadcastDisconnection = function (connid, name, id) {
        dctimer = setTimeout(dcChange, 3000);
        function dcChange() {
            $('#' + id + '> span').css('color', '#bcd8f5');
            $('#' + id + '> div').css('color', '#8fbeef');
        }
    }
    chatHub.client.addChatMessage = function (from, fromconnid, fromid, to, toconnid, toid, message, contId) {
        var seen = { "ToId": toid, "FromId": fromid };
        if (from == me) {
            var mymessage =
                '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                '<label class="mb-0">' + from + '</label>' +
                '<span>' + message + '</span>' +
                '</div>';
            $("#pm_" + toid).find('#messageContent').append(mymessage);
            $(".pmFrame_" + toid).scrollTop($(".pmFrame_" + toid)[0].scrollHeight)
        }
        else {
            if ($("#pm_" + fromid).length == 0 && $(window).width() < 768 && window.location.pathname == "/Account/Messages") {
                createPrivateChatWindow(from, fromid);
                $.ajax({
                    type: "POST",
                    url: "GetHistory",
                    data: JSON.stringify(seen),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var messages = [], i = 0;
                        for (; i < response.length; i++) {
                            if (response[i].FromName == me) {
                                var mymessage =
                                    '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                                    '<label class="mb-0">' + response[i].FromName + '</label>' +
                                    '<span>' + response[i].Message + '</span>' +
                                    '</div>';
                                $("#pm_" + fromid).find('#messageContent').append(mymessage);
                            }
                            else {
                                var theirmessage =
                                    '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                                    '<label class="mb-0">' + response[i].FromName + '</label>' +
                                    '<span>' + response[i].Message + '</span>' +
                                    '</div>';
                                $("#pm_" + fromid).find('#messageContent').append(theirmessage);
                            }
                        };
                        $(".pmFrame_" + fromid).delay(1000).scrollTop($(".pmFrame_" + fromid)[0].scrollHeight)
                    },
                });
            }
            else if ($("#pm_" + fromid).length == 0 && $(window).width() > 768) {
                createPrivateChatWindow(from, fromid);
                $.ajax({
                    type: "POST",
                    url: "GetHistory",
                    data: JSON.stringify(seen),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var messages = [], i = 0;
                        for (; i < response.length; i++) {
                            if (response[i].FromName == me) {
                                var mymessage =
                                    '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                                    '<label class="mb-0">' + response[i].FromName + '</label>' +
                                    '<span>' + response[i].Message + '</span>' +
                                    '</div>';
                                $("#pm_" + fromid).find('#messageContent').append(mymessage);
                            }
                            else {
                                var theirmessage =
                                    '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                                    '<label class="mb-0">' + response[i].FromName + '</label>' +
                                    '<span>' + response[i].Message + '</span>' +
                                    '</div>';
                                $("#pm_" + fromid).find('#messageContent').append(theirmessage);
                            }
                        };
                        $(".pmFrame_" + fromid).delay(1000).scrollTop($(".pmFrame_" + fromid)[0].scrollHeight)
                    },
                });
            }
            else {
                var theirmessage =
                    '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                    '<label class="mb-0">' + from + '</label>' +
                    '<span>' + message + '</span>' +
                    '</div>';
                $("#pm_" + fromid).find('#messageContent').append(theirmessage);
                $(".pmFrame_" + fromid).scrollTop($(".pmFrame_" + fromid)[0].scrollHeight)
                $.ajax({
                    type: "POST",
                    url: "SeenMessages",
                    data: JSON.stringify(seen),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                }); 
            }
        }
    }
    chatHub.client.addGroupChatMessage = function (from, fromid, togroupid, message, groupchatwindow) {
        if (from == me) {
            var mymessage =
                '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                '<label class="mb-0">' + from + '</label>' +
                '<span>' + message + '</span>' +
                '</div>';
            if ($(window).width() < 768) {
                $('#m_groupChatId_' + togroupid).append(mymessage);
                $(".m_groupScroll").scrollTop($(".m_groupScroll")[0].scrollHeight)
            }
            else {
                $('#d_groupChatId_' + togroupid).append(mymessage);
                $(".d_groupScroll").scrollTop($(".d_groupScroll")[0].scrollHeight)
            }  
        }
        else {
            var theirmessage =
                '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                '<label class="mb-0">' + from + '</label>' +
                '<span>' + message + '</span>' +
                '</div>';
            if ($(window).width() < 768) {
                $('#m_groupChatId_' + togroupid).append(theirmessage);
                $(".m_groupScroll").scrollTop($(".m_groupScroll")[0].scrollHeight)
            }
            else {
                $('#d_groupChatId_' + togroupid).append(theirmessage);
                $(".d_groupScroll").scrollTop($(".d_groupScroll")[0].scrollHeight)
            }  
        }
    }
}
function registerEvents(chatHub) {
    $(".contactsButton").click(function () {
        setInterval(function () { toconnid = $(this).find("#thisConnId").attr("value"); }, 1000);
        var chatHub = $.connection.chatHub;
        var to = $(this).find("#thisName").text();
        var toid = $(this).attr("id");
        var fromid = $("#UserId").attr("value");
        var me = $("#Username").attr("value");
        var contId = 'pm_' + toid;
        if ($('#' + contId).length == 0) {
            createPrivateChatWindow(to, toid, contId);
            var seen = { "ToId": toid, "FromId": fromid };
            $.ajax({
                type: "POST",
                url: "GetHistory",
                data: JSON.stringify(seen),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var messages = [], i = 0;
                    for (; i < response.length; i++) {
                        if (response[i].FromName == me) {
                            var mymessage =
                                '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                                '<label class="mb-0">' + response[i].FromName + '</label>' +
                                '<span>' + response[i].Message + '</span>' +
                                '</div>';
                            $("#pm_" + toid).find('#messageContent').append(mymessage);
                        }
                        else {
                            var theirmessage =
                                '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                                '<label class="mb-0">' + response[i].FromName + '</label>' +
                                '<span>' + response[i].Message + '</span>' +
                                '</div>';
                            $("#pm_" + toid).find('#messageContent').append(theirmessage);
                        }
                    };
                    $(".pmFrame_" + toid).delay(1000).scrollTop($(".pmFrame_" + toid)[0].scrollHeight)
                },
            });
            $.ajax({
                type: "POST",
                url: "SeenMessages",
                data: JSON.stringify(seen),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
            });
        }
    });
    $('.messageContent').click(function () {
        var to = $(this).find("#thisName").text();
        var toid = $(this).attr("id");
        var fromid = $("#UserId").attr("value");
        var me = $("#Username").attr("value");
        var contId = 'pm_' + toid;
        if ($('#' + contId).length == 0) {
            createPrivateChatWindow(to, toid, contId);
            var seen = { "ToId": toid, "FromId": fromid };
            $.ajax({
                type: "POST",
                url: "GetHistory",
                data: JSON.stringify(seen),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var messages = [], i = 0;
                    for (; i < response.length; i++) {
                        if (response[i].FromName == me) {
                            var mymessage =
                                '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                                '<label class="mb-0">' + response[i].FromName + '</label>' +
                                '<span>' + response[i].Message + '</span>' +
                                '</div>';
                            $("#pm_" + toid).find('#messageContent').append(mymessage);
                        }
                        else {
                            var theirmessage =
                                '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                                '<label class="mb-0">' + response[i].FromName + '</label>' +
                                '<span>' + response[i].Message + '</span>' +
                                '</div>';
                            $("#pm_" + toid).find('#messageContent').append(theirmessage);
                        }
                    };
                    $(".pmFrame_" + toid).delay(1000).scrollTop($(".pmFrame_" + toid)[0].scrollHeight)
                },
            });
            $.ajax({
                type: "POST",
                url: "SeenMessages",
                data: JSON.stringify(seen),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
            });
        }
    });
    $(".groupSelect").change(function (e) {
        $('.chatGroupMember').remove(); 
        if ($(this).val() != "Select Group") {
            $('#m_groupsPeopleIcon').css('color', '#16579c');
            $('groupSelectInner').remove();
            currentGroupNumber = $(this).val();
            thisGroup = $('#' + currentGroupNumber);
            groupID = $('#ID_' + currentGroupNumber).val();
            var groupLevel = $("#" + $(thisGroup).attr('id')).find('#groupStatus').attr('value');
            if ($(window).width() < 768) {
                groupChatWindow = $('.m_chatOut').attr('id', 'm_groupChatId_' + groupID);
                $('#m_groupsAlertIcon').removeClass('alertGreen alertYellow alertRed');
                if (groupLevel == "1") {
                    $('#m_groupsAlertIcon').addClass('alertGreen');
                }
                else if (groupLevel == "2") {
                    $('#m_groupsAlertIcon').addClass('alertYellow');
                }
                else if (groupLevel == "3") {
                    $('#m_groupsAlertIcon').addClass('alertRed');
                }
            }
            else {
                groupChatWindow = $('.d_chatOut').attr('id', 'd_groupChatId_' + groupID);
                $('#groupStatusButton').removeClass('alertGreen alertYellow alertRed');
                if (groupLevel == "1") {
                    $('#groupStatusButton').addClass('alertGreen');
                    $('#groupStatusButton').text("GROUP STATUS: GREEN");
                }
                else if (groupLevel == "2") {
                    $('#groupStatusButton').addClass('alertYellow');
                    $('#groupStatusButton').text("GROUP STATUS: YELLOW");
                }
                else if (groupLevel == "3") {
                    $('#groupStatusButton').addClass('alertRed');
                    $('#groupStatusButton').text("GROUP STATUS: RED");
                }
            }
            chatHub.server.joinRoom(groupID);
            //ADD GROUP MEMBERS TO SIDEBAR
            var groupMember = $(thisGroup).find('.groupMemberName').each(function () {
                var thisMember = $(this).val()
                var listGroupMember =
                    '<div class="chatGroupMember memberGrad d-flex flex-row justify-content-center align-items-center mt-1">' +
                    '<div class="chatGroupMemberIcon">' +
                    '<span class="ion-person"></span>' +
                    '</div>' +
                    '<div class="chatGroupMemberName pl-2" style="">' + thisMember + '</div>' +
                    '</div>';
                $('#chatGroupMembersContainer').append(listGroupMember);
            });
            var groupchatwindow = $(groupChatWindow).attr('id');
            $('#' + groupchatwindow).children().remove();
            var seen = { "ToGroupId": groupID };
            var me = $("#Username").attr("value");
            $.ajax({
                type: "POST",
                url: "GetGroupHistory",
                data: JSON.stringify(seen),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var messages = [], i = 0;
                    for (; i < response.length; i++) {
                        if (response[i].FromName == me) {
                            var mymessage =
                                '<div class="d-flex flex-column px-2 py-1 align-self-end megrad mecont">' +
                                '<label class="mb-0">' + response[i].FromName + '</label>' +
                                '<span>' + response[i].Message + '</span>' +
                                '</div>';
                            $('#' + groupchatwindow).append(mymessage);
                        }
                        else {
                            var theirmessage =
                                '<div class="d-flex flex-column px-2 py-1 align-self-start themgrad themcont">' +
                                '<label class="mb-0">' + response[i].FromName + '</label>' +
                                '<span>' + response[i].Message + '</span>' +
                                '</div>';
                            $('#' + groupchatwindow).append(theirmessage);
                        }
                    };

                    if ($(window).width() < 768) {
                        $(".m_groupScroll").scrollTop($(".m_groupScroll")[0].scrollHeight)
                    }
                    else {
                        $(".d_groupScroll").scrollTop($(".d_groupScroll")[0].scrollHeight)
                    }
                },
            });
        }
        else {
            currentGroupNumber = $(this).val();
            thisGroup = $('#' + currentGroupNumber);
            groupID = $('#ID_' + currentGroupNumber).val();
            var groupchatwindow = $(groupChatWindow).attr('id');
            $('#' + groupchatwindow).children().remove();
            $('#m_groupsAlertIcon').css('color', '');
            $('#m_groupsPeopleIcon').css('color', '');
            $('#m_groupsAlertIcon').removeClass('alertGreen alertYellow alertRed');
            $('#groupStatusButton').removeClass('alertGreen alertYellow alertRed');
            $('#groupStatusButton').text("SELECT A GROUP");
            var selectgroup =
                '<div class="groupSelectInner p-3 d-flex flex-column justify-content-center align-items-center">'+
                    '<div class="groupSelectIcon ion-ios-people-outline"></div>'+
                    '<div class="groupSelectText">Please select a group from the dropdown menu</div>'+
                '</div>';
            $('#' + groupchatwindow).append(selectgroup);
        }
    });
    $(".groupchatTextInput").keypress(function (e) {
        if (e.which == 13) {
            var chatHub = $.connection.chatHub;
            var from = $("#Username").attr("value");
            var fromid = $("#UserId").attr("value");
            var togroupid = groupID;
            var newgroupmessage = $(this).val();
            var groupchatwindow = $(groupChatWindow).attr('id');
            if (newgroupmessage.length > 0) {
                chatHub.server.sendGroupMessage(from, fromid, togroupid, newgroupmessage, groupchatwindow);
                $(this).val('');
            };
        }
    });
};

function createPrivateChatWindow(to, toid, from, fromid) {
    var chatHub = $.connection.chatHub;
    if (toid == null) {
        var div =
            '<div id="pm_' + fromid + '" class="pmContainer ml-2 maximizechat" >' +
            '<div id="pmHeader" class="pmHeader d-flex flex-row">' +
            '<label id="contactName" class="ml-2 w-100">' + from + '</label>' +
            '<div class="ion-close ml-auto closeChat"></div>' +
            '</div>' +
            '<div class="pmFrame_' + fromid + ' pmBody>' +
            '<div id="messageContent" class="messageContent_' + fromid + ' d-flex flex-column justify-content-end"></div>' +
            '</div>' +
            '<div class="pmFooter">' +
            '<input id="input_' + fromid + '" type="text" class="px-2" placeholder="Enter a private message..." />' +
            '</div>' +
            '</div>';
        var $div = $(div);
        if (screen.width < 662) {          
            $('#bgf').toggleClass("bgfade bgfade-toggle");
            $('#pmModal').toggleClass("pmwrapper apmwrappertoggle");
            $("#pmModal").append(div);
        }
        else {
            $("#pmWrapper").append(div);
        }       
    }
    else {
        var div =
            '<div id="pm_' + toid + '" class="pmContainer ml-2 maximizechat" >' +
            '<div id="pmHeader" class="pmHeader d-flex flex-row">' +
            '<label id="contactName" class="ml-2 w-100">' + to + '</label>' +
            '<div class="ion-close ml-auto closeChat"></div>' +
            '</div>' +
            '<div class="pmFrame_' + toid + ' pmBody">' +
            '<div id="messageContent" class="messageContent_' + toid + ' d-flex flex-column justify-content-end"></div>' +
            '</div>' +
            '<div class="pmFooter">' +
            '<input id="input_' + toid + '" type="text" class="px-2" placeholder="Enter a private message..." />' +
            '</div>' +
            '</div>';
        var $div = $(div);
        if (screen.width < 662) {
            $('#bgf').toggleClass("bgfade bgfade-toggle");
            $('#pmModal').toggleClass("pmMobilewrapper pmMobilewrappertoggle");
            $("#pmModal").append(div);
        }
        else {
            $("#pmWrapper").append(div);
        }   
    }
    
    $('.closeChat').click(function () {
        $(this).parent(this).parent(this).remove();
        $('#bgf').removeClass("bgfade-toggle");    
        $('#bgf').addClass("bgfade");  
        $('#pmModal').removeClass("pmMobilewrappertoggle");
        $('#pmModal').addClass("pmMobilewrapper");
    });
    $("#input_"+ toid).keypress(function (e) {
        if (e.which == 13) {
            var from = $("#Username").attr("value");
            var fromid = $("#UserId").attr("value");
            var fromconnid = $("#UserConnectionId").attr("value");
            var toconnid;
            if (screen.width < 662) {             
                toconnid = $('#connid_' + toid).attr('value');
            }
            else {
                toconnid = $('#d_ConnId_' + toid).val();
            }   
            var message = $(this).val();
            var messagearray = { from, fromconnid, fromid, to, toconnid, toid, message}
            console.log(messagearray)
            if (message.length > 0) {
                chatHub.server.sendChatMessage(from, fromconnid, fromid, to, toconnid, toid, message);
                $(this).val('');
            };           
        }
    });  
}
//$(window).resize(function () {
//    if ($(window).width() < 768) {
//    }
//    else {
//    }
//});