/* buka tutup menu */
function toggleMenu(){
    let menu =
        document.getElementById("menu-box");
    if(menu.style.display==="flex"){
        menu.style.display="none";
    }

    else{
        menu.style.display="flex";
    }

}

/* tampilkan content */
function showContent(id){
    let contents =
        document.querySelectorAll(".content");
    contents.forEach(function(item){
        item.style.display="none";
    });

    document
        .getElementById(id)
        .style.display="block";
}