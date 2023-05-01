const normal = document.getElementsByClassName("button normal");
const hard = document.getElementsByClassName("button hard");
const expert = document.getElementsByClassName("button expert");


normal[0].addEventListener("click", function(){
    var speed = 35;
    window.location.href = "../index.html?myVariable=" +encodeURIComponent(speed);
});

hard[0].addEventListener("click", function(){
    var speed = 55;
    window.location.href = "../index.html?myVariable=" +encodeURIComponent(speed);

});

expert[0].addEventListener("click", function(){
    var speed = 70;
    window.location.href = "../index.html?myVariable=" +encodeURIComponent(speed);
});