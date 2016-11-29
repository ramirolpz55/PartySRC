$(function() {
    function findYouTube(searchTerm) {
        var video = searchTerm;
        var videoArray;
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=" + video + "&type=video&key=AIzaSyCmhc9fABzn9P5tCslboXz2AcF12NH38oM";

        $.ajax({
            url: queryURL,
            method: 'GET',
        }).done(function(response) {
            SetArray(response.items);
        });

        function SetArray(videoArray) {
            console.log(videoArray);
            printResults(videoArray);
        }

    }

    function resultThumb(imageUrl, videoTitle, yId) {
        var newDiv = $('<div class="resultThumb col-xs-12 col-sm-4 col-md-3 col-lg-2"><img class="img-responsive" src=' + imageUrl + '><p>' + videoTitle + '</p></div>');
        newDiv.attr("data-yId", yId)
        newDiv.click(function() {
            console.log($(this).text())
            generateModal(videoTitle, $(this).attr("data-yId"));
        })
        $('#results').append(newDiv);
    };

    $('#searchBtn').on('click', function() {
        var searchTerm = $("#search").val()
        if (searchTerm !== "")
            findYouTube(searchTerm);

        return false;
    });

    function printResults(videoArray) {
        $('#results').empty();
        for (var i = 0; i < 25; i++) {
            var imageUrl = 'https://placeimg.com/300/150/any';

            imageUrl = videoArray[i].snippet.thumbnails.medium.url;
            videoTitle = videoArray[i].snippet.title;
            yId = videoArray[i].id.videoId;


            resultThumb(imageUrl, videoTitle, yId);

        };
      
    }
});
