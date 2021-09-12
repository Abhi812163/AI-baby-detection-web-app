sound=""
status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting baby";
}

function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);

        for(i=0;i<objects.length;i++){
            document.getElementById("baby_status").innerHTML="Baby detected: "+objects.length;            
            document.getElementById("status").innerHTML="Status: Objects Detected";
            percent=floor(objects[i].confidence*100);
        }
    }

}
function preload(){
    sound=loadSound("Alarm sound effect.mp3");
}

function modelLoaded(){
    console.log("COCOSSD is initialized");
    status=false;
    sound.play("Alarm sound effeCt.mp3");
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}