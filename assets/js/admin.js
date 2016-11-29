function getFromDatabase(queueArray) {
    generateTable(queueArray);
}

function generateTable(queueArray) {
    $("#queue").empty();
    for(i=1; i<queueArray.length; i++) {
        var newRow = $("<tr>");
        newRow.attr('class', 'selector')


        var tdTitle = $("<td>");
        tdTitle.text(queueArray[i].name);

        var tdName = $("<td>");
        tdName.text(queueArray[i].title);

        newRow.attr("data-id", queueArray[i].itemId);

        if(i > 1)
            newRow.attr("data-prev", queueArray[i-1].itemId);

        if(i<queueArray.length-1)
            newRow.attr("data-next", queueArray[i+1].itemId);

        var tdDedication = $("<td>");
        tdDedication.text(queueArray[i].dedication);

        newRow.append(tdTitle).append(tdName).append(tdDedication);


        $("#queue").append(newRow);
        // test the ability to grab item from queue list. check console.log

        $(".selector").on('click', function() {
            selectRow(this);
        });

    };

    function selectRow(selectedRow) {

        $(".selector").attr("class", "selector");
        $(selectedRow).attr("class", "selector active");
    }

    $("#delete-song").click(function() {
        var itemId = $(".active").attr("data-id");
        videoPlayed(itemId);
    })

    $("#move-up").click(function(){
        var upId = $(".active").attr("data-id");
        var downId = $(".active").attr("data-prev");
        if(downId !== undefined && upId !== undefined)
            swap(upId, downId);
    })

    $("#move-down").click(function(){
        var downId = $(".active").attr("data-id");
        var upId = $(".active").attr("data-next");

        if(downId !== undefined && upId !== undefined)
            swap(upId, downId);
    })


    // SELECT ROW FUNCTION 
}
