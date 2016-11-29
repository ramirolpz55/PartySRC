$("#submit-song").on('click', function() {
    var name = $('#nameinput').val().trim();
    var dedication = $('#dedicateinput').val().trim();
    var title= $("#youTitle").val();
    var youID= $("#youtubeID").val();
    addVideoToDatabase(youID, name, dedication, title);

    $('#nameinput').val("");
    $('#dedicateinput').val('');

    $("#modal-id").modal("toggle");

    return false;
})


function generateModal(youTitle, youtubeID) {
    $("#youTitle").val(youTitle);
    $("#youtubeID").val(youtubeID);
    $("#video-title").text(youTitle);

    $("#modal-id").modal();
}
