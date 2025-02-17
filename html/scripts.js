$(function(){
    window.onload = (e) => { 
        window.addEventListener('message', (event) => {	            
            var item = event.data;
            if (item !== undefined && item.type === "ui") {		                
                if (item.display === true) {
                    $("#divwrap").show();
                    console.log("starting this shit!");
                    var start = new Date();
                    var maxTime = item.time;
                    var text = item.message;
                    var timeoutVal = Math.floor(maxTime/100);
                    animateUpdate();

                    $('#innertext').text(text);

                    function updateProgress(percentage) {
                        $('#progress-bar').css("width", percentage + "%");
                    }

                    function animateUpdate() {
                        var now = new Date();
                        var timeDiff = now.getTime() - start.getTime();
                        var perc = Math.round((timeDiff/maxTime)*100);
                        console.log(perc);
                        if (perc <= 100) {
                            updateProgress(perc);
                            setTimeout(animateUpdate, timeoutVal);
                        } else {
                            fetch(`https://${GetParentResourceName()}/ProgressFinished`, {
                                method: "POST"
                            });
                            $("#divwrap").hide();
                        }
                    }
                } else {
                    $("#divwrap").hide();
                }
            }
        });
    };
});