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