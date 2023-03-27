video="";
status="";
object = [];
function preload()
{
video=createVideo("video.mp4");
video.hide()
}

function setup()
{
canvas=createCanvas(350,300);
canvas.center();
}

function start()
{
    objectdetect = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
}

function modelLoaded()
{
    console.log("ModelLoaded!");
    status = true;
     video.loop();
     video.speed(1);
     video.volume(0);
    }

    function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    else{
    console.log(results);
    object=results;
}
}

function draw()
{
image(video, 0, 0, 350, 300);

if (status!="") {
    objectdetect.detect(video, gotResult);
    for (i=0; i<object.length; i++) {
        document.getElementById("status").innerHTML="Status : Detected";
        document.getElementById("detect").innerHTML="No of objects detected : "+ object.length;
        fill("firebrick");
        percent=floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%", object[i].x+15, object[i].y+15);
        noFill();
        stroke("indigo");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
}
}