//REALTIME MULTI-INPUT TABLE FILTER
function toggleSearchLoading() {
    $('#resultsToggle').css('display', 'none')
    $('#notfound').css('display', 'none')
    $('#pleasesearch').css('display', 'none')
    $('#searchingtable').css('display', '')
    setTimeout(searchTable, 1000);
}
function searchTable() {
    $('#searchingtable').css('display', 'none')
    var lname, fname, city, state, accounttype, tr, i, testvar;
    var all = [];
    var j = 1;
    table = document.getElementById("resultsToggle");
    table.style.display = "";
    tr = document.getElementsByClassName("personResultsRow");
    buttontoggle = document.getElementById("notfound");
    //CONVERT INPUTS TO UPPERCASE AND ADD TO ARRAY
    var filter = [$("#searchfname").val().toUpperCase(), $("#searchlname").val().toUpperCase(), $("#searchcity").val().toUpperCase(), $("#searchstate").val(), $("#searchtype").val()];
    if (filter[0] + filter[1] + filter[2] == 0 && filter[3] == "State" && filter[4] == "User Type") {
        table = document.getElementById("resultsToggle");
        table.style.display = "none";
        tpleasesearch = document.getElementById("pleasesearch");
        tpleasesearch.style.display = "";
    }

    //ASSIGN COLUMNS TO SEARCH THROUGH
    for (i = 0; i < tr.length; i++) {
        tdfname = tr[i].getElementsByClassName("search-table-col")[0];
        tdlname = tr[i].getElementsByClassName("search-table-col")[1];
        tdcity = tr[i].getElementsByClassName("search-table-col")[2];
        tdstate = tr[i].getElementsByClassName("search-table-col")[3];
        tdaccounttype = tr[i].getElementsByClassName("search-table-col")[4];
        //IF WE HAVE AN INPUT
        if (tdfname || tdlname || tdcity || tdstate || tdaccounttype) {

            //SPLIT DATA INTO SEPERATE CHARACTERS THEN STORE INTO ARRAY
            var dbfname_split = tdfname.innerHTML.toUpperCase().split("");
            var inputfname_split = filter[0].split("");
            var dblname_split = tdlname.innerHTML.toUpperCase().split("");
            var inputlname_split = filter[1].split("");
            var dbcity_split = tdcity.innerHTML.toUpperCase().split("");
            var inputcity_split = filter[2].split("");
            var dbstate = $(tdstate).text();
            var inputstate = filter[3];
            var dbaccounttype = $(tdaccounttype).text();
            var inputaccounttype = filter[4];
            var selectmatch = (inputstate == "" && inputaccounttype == dbaccounttype || inputstate == dbstate && inputaccounttype == "" || inputstate == dbstate && inputaccounttype == dbaccounttype || inputstate == "" && inputaccounttype == "" );
            var match = _.difference(inputfname_split, dbfname_split) + _.difference(inputlname_split, dblname_split) + _.difference(inputcity_split, dbcity_split);        
            //IF THERE IS NO DIFFERENCE BETWEEN CHARACTERS SHOW IN TABLE -> ELSE HIDE
            if (match == 0 && selectmatch == true) {
                $(tr[i]).removeClass("d-none");
                $(tr[i]).addClass("d-flex", "flex-row", "align-items-center", "justify-content-center");
                all[i] = j++;
            }
            else{
                $(tr[i]).removeClass("d-flex", "flex-row", "align-items-center", "justify-content-center");
                $(tr[i]).addClass("d-none");
            }
            console.log(all.length)
        }
    }
    //TOGGLE ADD NEW PERSONAL BUTTON
    //if (_.compact(all) == "") {
    //    buttontoggle.style.display = "";
    //    table = document.getElementById("resultsToggle");
    //    table.style.display = "none";
    //}
    //else {
    //    buttontoggle.style.display = "none";
    //}
}