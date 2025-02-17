$(function(){
    window.onload = (e) => { 
        window.addEventListener('message', (event) => {	            
            var item = event.data;
            if (item !== undefined && item.type === "ui") {		                
                if (item.display === true) {
                    $("#divwrap").show();
                    var start = Date.now();
                    var maxTime = item.time;
                    var text = item.message;
                    var interval = 1; // Reduce interval for more accurate timing
                    $('#innertext').text(text);

                    function updateProgress() {
                        var now = Date.now();
                        var timeDiff = now - start;
                        var perc = Math.min((timeDiff / maxTime) * 100, 100);
                        $('#progress-bar').css("width", perc + "%");

                        if (perc < 100) {
                            setTimeout(updateProgress, interval);
                        } else {
                            fetch(`https://${GetParentResourceName()}/ProgressFinished`, {
                                method: "POST"
                            });
                            $("#divwrap").hide();
                        }
                    }

                    updateProgress();
                } else {
                    $("#divwrap").hide();
                }
            }
        });
    };
});