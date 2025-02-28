﻿$(document).ready(function () {
    $('#mobileNavButton').click(function () {
        $('#sideNavWrapper').toggleClass("sideNavBefore sideNavAfter");
        $('#bgf').toggleClass("bgfade bgfade-toggle");
    });
    $('#groupActivityBlip').click(function () {
        window.location.href = "Groups";
    });
    $('.dashMessageButton').click(function () {
        window.location.href = "Messages";
    })
    $('#m_groupsAlertIcon').click(function () {
        if ($('.groupSelect').val() != "Select Group") {
            $('#bgf').toggleClass("bgfade bgfade-toggle");
            $('#alertModal').toggleClass("alertwrapper alertwrappertoggle");
            var grabGroupStatus = $('#' + $('.groupSelect').val()).find('#groupStatus').val();
            console.log(grabGroupStatus)
            if (grabGroupStatus == 1) {
                $('#alertModalCurrentStatus').removeClass('alertYellow alertRed').addClass('alertGreen');
                $('#alertModalStatusText').text("Members of this group are accounted for and can reach the patient.")
                $('#alertModalCurrentStatus').html("CODE GREEN");
            }
            else if (grabGroupStatus == 2) {
                $('#alertModalCurrentStatus').removeClass('alertGreen alertRed').addClass('alertYellow');
                $('#alertModalStatusText').text("Please get in touch with a patient. " + " This is a nonurgent request.")
                $('#alertModalCurrentStatus').html("CODE YELLOW");
            }
            else if (grabGroupStatus == 3) {
                $('#alertModalCurrentStatus').removeClass('alertGreen alertYellow').addClass('alertRed').html("GROUP STATUS: RED");
                $('#alertModalStatusText').text("It is critical that group members contact the Patient. " + " THIS IS AN EMERGENCY.")
                $('#alertModalCurrentStatus').html("CODE RED");
            }
            
        }
    });
    $('#groupStatusButton').click(function () {
        if ($('.d_groupSelect').val() != "Select Group") {           
            $('#bgf').toggleClass("bgfade bgfade-toggle");
            $('#alertModal').toggleClass("alertwrapper alertwrappertoggle");
            var grabGroupStatus = $('#' + $('.d_groupSelect').val()).find('#groupStatus').val();
            console.log(grabGroupStatus)
            if (grabGroupStatus == 1) {
                $('#alertModalCurrentStatus').removeClass('alertYellow alertRed').addClass('alertGreen');
                $('#alertModalStatusText').text("Members of this group are accounted for and can reach the patient.")
                $('#alertModalCurrentStatus').html("CODE GREEN");
            }
            else if (grabGroupStatus == 2) {
                $('#alertModalCurrentStatus').removeClass('alertGreen alertRed').addClass('alertYellow');
                $('#alertModalStatusText').text("Please get in touch with a patient. " + " This is a nonurgent request.")
                $('#alertModalCurrentStatus').html("CODE YELLOW");
            }
            else if (grabGroupStatus == 3) {
                $('#alertModalCurrentStatus').removeClass('alertGreen alertYellow').addClass('alertRed').html("GROUP STATUS: RED");
                $('#alertModalStatusText').text("It is critical that group members contact the Patient. " + " THIS IS AN EMERGENCY.")
                $('#alertModalCurrentStatus').html("CODE RED");
            }
        }
    });
    $('.alertClose').click(function () {
        $('#bgf').toggleClass("bgfade bgfade-toggle");
        $('#alertModal').removeClass("alertwrappertoggle");
        $('#alertModal').addClass("alertwrapper");
    });
    $('.createGroup').click(function () {
        var cginvitee = $(this).attr('title');
        var cginviteelink = $(this).children('.cgInviteeInfo').attr('value');
        $('#cgYes').attr('href', "CreateGroup/"+cginviteelink);
        $('#bgf').toggleClass("bgfade bgfade-toggle");
        $('#cgModal').toggleClass("cgwrapper cgwrappertoggle");
        $('#cgInvitee').text(cginvitee)
    });
    $('.addGroup').click(function () {
        var aginviteelink = $(this).children('.agInviteeInfo').attr('value');
        $('#addThisPerson').attr('value',aginviteelink);
        console.log($('#addThisPerson').val());
        $('#agModal').toggleClass("agwrapper agwrappertoggle");
        $('#bgf').toggleClass("bgfade bgfade-toggle");       
    });
    $('#cgModal').click(function () {
        $('#bgf').toggleClass("bgfade bgfade-toggle");
        $('#cgModal').toggleClass("cgwrapper cgwrappertoggle");
    });
    $('#contactsWrapper').click(function () {
        if ($('#contactsWrapper').css('top') > "50px") {
            $('#contactsWrapper').css('top', '50px')
        }
        else {
            $('#contactsWrapper').css('top', 'calc(100% - 40px)')
        }
        
    });
    $('#bgf').click(function () {
        $('#lw').toggleClass("login-wrapper login-wrapper-toggle");
        $('#bgf').toggleClass("bgfade bgfade-toggle");
        $('#cgModal').removeClass("cgwrappertoggle");
        $('#cgModal').addClass("cgwrapper");
        $('#agModal').removeClass("agwrappertoggle");
        $('#agModal').addClass("agwrapper");
        $('#sideNavWrapper').removeClass("sideNavAfter");
        $('#sideNavWrapper').addClass("sideNavBefore");
        $('#alertModal').removeClass("alertwrappertoggle");
        $('#alertModal').addClass("alertwrapper");
    });
    var username = $('#Username').attr('value');
    $('#sideNavName, #navDashUser').text(username);
    $("#StateDrop").click(function(e){
        if ($("#StateDrop :selected").text() != "State") {
            $(this).css("color", "black");
            $(this).css("font-style", "normal");
            $(this).css("font-weight", "400");
        }
    });
    $("#MobileCarrierDropDown").click(function (e) {
        if ($("#MobileCarrierDropDown :selected").text() != "Mobile Carrier") {
            $(this).css("color", "black");
            $(this).css("font-style", "normal");
            $(this).css("font-weight", "400");
        }
    });
    $("#AccountTypeDropDown").click(function (e) {
        if ($("#AccountTypeDropDown :selected").text() != "...") {
            $(this).css("color", "black");
            $(this).css("font-style", "normal");
            $(this).css("font-weight", "400");
        }
    });
    $('.regMobileNumber').samask("0000000000");

});
function navMessages() {
    window.location.href = "Messages"
}
function navGroups() {
    window.location.href = "Groups"
}