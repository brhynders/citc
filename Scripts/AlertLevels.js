$('#codeGreenButton').click(function () {
    var getgroupnumber;
    if ($(window).width() < 768) {
        getgroupnumber = $('.groupSelect').val();
    }
    else {
        getgroupnumber = $('.d_groupSelect').val();
    }
    var alertLevel = 1;
    var thisgroupid = $('#ID_' + getgroupnumber).val();
    var toggleAlertLevel = { "AlertLevel": alertLevel, "GroupId": thisgroupid };
    $.ajax({
        type: "POST",
        url: "SetAlert",
        data: JSON.stringify(toggleAlertLevel),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#bgf').toggleClass("bgfade bgfade-toggle");
            $('#alertModal').removeClass("alertwrappertoggle").addClass("alertwrapper");
            $('#groupStatusButton').removeClass('alertYellow alertRed').addClass('alertGreen').html("GROUP STATUS: GREEN");
            $('#m_groupsAlertIcon').removeClass('alertYellow alertRed').addClass('alertGreen');
            $("#" + getgroupnumber).find('#groupStatus').attr('value', 1);  
        },
    });
});

$('#codeYellowButton').click(function () {
    var getgroupnumber;
    if ($(window).width() < 768) {
        getgroupnumber = $('.groupSelect').val();
    }
    else {
        getgroupnumber = $('.d_groupSelect').val();
    }
    var alertLevel = 2;
    var thisgroupid = $('#ID_' + getgroupnumber).val();
    var toggleAlertLevel = { "AlertLevel": alertLevel, "GroupId": thisgroupid };
    $.ajax({
        type: "POST",
        url: "SetAlert",
        data: JSON.stringify(toggleAlertLevel),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#bgf').toggleClass("bgfade bgfade-toggle");
            $('#alertModal').removeClass("alertwrappertoggle").addClass("alertwrapper");
            $('#groupStatusButton').removeClass('alertGreen alertRed').addClass('alertYellow').html("GROUP STATUS: YELLOW");
            $('#m_groupsAlertIcon').removeClass('alertGreen alertRed').addClass('alertYellow');
            $("#" + getgroupnumber).find('#groupStatus').attr('value', 2);  
        },
    });
});

$('#codeRedButton').click(function () {
    var getgroupnumber;
    if ($(window).width() < 768) {
        getgroupnumber = $('.groupSelect').val();
    }
    else {
        getgroupnumber = $('.d_groupSelect').val();
    }
    var alertLevel = 3;
    var thisgroupid = $('#ID_' + getgroupnumber).val();
    var toggleAlertLevel = { "AlertLevel": alertLevel, "GroupId": thisgroupid };

    $.ajax({
        type: "POST",
        url: "SetAlert",
        data: JSON.stringify(toggleAlertLevel),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#bgf').toggleClass("bgfade bgfade-toggle");
            $('#alertModal').removeClass("alertwrappertoggle").addClass("alertwrapper");
            $('#groupStatusButton').removeClass('alertGreen alertYellow').addClass('alertRed').html("GROUP STATUS: RED");
            $('#m_groupsAlertIcon').removeClass('alertGreen alertYellow').addClass('alertRed');
            $("#" + getgroupnumber).find('#groupStatus').attr('value', 3);  
        },
    });
});