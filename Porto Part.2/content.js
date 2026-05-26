/* buka tutup submenu */
function toggleMenu(){
    const menu =
        document.getElementById("menu-box");
    const contentBox =
        document.getElementById("content-box");
    const contents =
        document.querySelectorAll(".content");
    const items =
        document.querySelectorAll(".submenu-item");

    /* CLOSE */
    if(menu.style.display === "flex"){
        menu.style.display = "none";
        contentBox.style.display = "none";
        contents.forEach(function(item){
            item.style.display = "none";
        });
        items.forEach(function(item){
            item.style.opacity = "0";
            item.style.transform =
                "translateY(-15px)";
        });
    }

    /* OPEN */
    else{
        menu.style.display = "flex";
        items.forEach(function(item,index){
            setTimeout(function(){
                item.style.transition =
                    ".4s ease";


                item.style.opacity = "1";
                item.style.transform =
                    "translateY(0px)";
            }, index * 150);
        });
    }
}

/* tampilkan content */
function showContent(id){


    const contentBox =
        document.getElementById("content-box");


    const contents =
        document.querySelectorAll(".content");



    contentBox.style.display = "flex";
    contents.forEach(function(item){

        item.style.display = "none";

    });
    document
        .getElementById(id)
        .style.display = "block";

}