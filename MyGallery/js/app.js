let numberImages = undefined;
let getLastOpenedImg = undefined;
let windowWidth = window.innerWidth;


document.addEventListener('DOMContentLoaded',()=>{
    let galleryImages = document.querySelectorAll(".gallery-image");



    if(galleryImages)
    {
        numberImages = galleryImages.length;
        galleryImages.forEach(function(image,index) {
            
            image.onclick = function(){
                let getElementCss = window.getComputedStyle(image);
                let getFullImageURL = getElementCss.getPropertyValue("background-image");
                let getImageURLPos = getFullImageURL.split("/images/thumbs/");
                let setNewImgURL = getImageURLPos[1].replace('")','');

                getLastOpenedImg = index + 1;
                
                let container = document.body;
                let newImageWindow = document.createElement("div");
                container.appendChild(newImageWindow);

                newImageWindow.setAttribute("class","image-window");
                newImageWindow.setAttribute("onclick", "closeImg()" );

                let newImage = document.createElement("img");
                newImageWindow.appendChild(newImage);

                newImage.setAttribute("src", "images/fullSized/" + setNewImgURL);
                newImage.setAttribute("id", "current-image");

                newImage.onload = function(){

                    let imageWidth = this.width;
                    let calcImage2Egde = ( (windowWidth - imageWidth)/2 ) - 80;

                    let newPrevBtn = document.createElement("a");
                    let btnPrevText = document.createTextNode("Previous");
    
                    newPrevBtn.appendChild(btnPrevText);
                    container.appendChild(newPrevBtn);
    
                    newPrevBtn.setAttribute("class", "image-btn-prev");
                    newPrevBtn.setAttribute("onclick", "changeImagePrevious()");
                    newPrevBtn.style.cssText = "left:" + (calcImage2Egde - 40) + "px;";
    
                    
                    let newNextBtn = document.createElement("a");
                    let nextPrevText = document.createTextNode("Next");
    
                    newNextBtn.appendChild(nextPrevText);
                    container.appendChild(newNextBtn);
    
                    newNextBtn.setAttribute("class", "image-btn-next");
                    newNextBtn.setAttribute("onclick", "changeImageNext()");
                    newNextBtn.style.cssText = "right:" + calcImage2Egde + "px;";

                }


            }
        });
    }


})

function closeImg()
{
    document.querySelector(".image-window").remove();
    document.querySelector(".image-btn-next").remove();
    document.querySelector(".image-btn-prev").remove();
}

function changeImagePrevious()
{
    document.querySelector("#current-image").remove();

    let getImageWindow = document.querySelector(".image-window");
    let newImage = document.createElement("img");
    getImageWindow.appendChild(newImage);

    let calcNewImage = undefined;

    calcNewImage = getLastOpenedImg - 1;

    if(calcNewImage < 1)
    {
        calcNewImage = numberImages;
    }

    newImage.setAttribute("src", "images/fullSized/img" + calcNewImage + ".jpg") ;
    newImage.setAttribute("id", "current-image");

    getLastOpenedImg = calcNewImage;

    newImage.onload = function(){
        let imageWidth = this.width;
        let calcImage2Egde = ( (windowWidth - imageWidth)/2 ) - 80;

        let NextBtn = document.querySelector(".image-btn-next");
        NextBtn.style.cssText = "right:" + calcImage2Egde + "px";

        
        let PrevBtn = document.querySelector(".image-btn-prev");
        PrevBtn.style.cssText = "left:" + (calcImage2Egde - 40) + "px";

    }

}

function changeImageNext()
{
    document.querySelector("#current-image").remove();

    let getImageWindow = document.querySelector(".image-window");
    let newImage = document.createElement("img");
    getImageWindow.appendChild(newImage);

    let calcNewImage = undefined;
    calcNewImage = getLastOpenedImg + 1;

    if(calcNewImage > numberImages)
    {
        calcNewImage = 1;
    }

    newImage.setAttribute("src", "images/fullSized/img" + calcNewImage + ".jpg") ;
    newImage.setAttribute("id", "current-image");

    getLastOpenedImg = calcNewImage;

    newImage.onload = function(){
        let imageWidth = this.width;
        let calcImage2Egde = ( (windowWidth - imageWidth)/2 ) - 80;

        let NextBtn = document.querySelector(".image-btn-next");
        NextBtn.style.cssText = "right:" + calcImage2Egde + "px";

        
        let PrevBtn = document.querySelector(".image-btn-prev");
        PrevBtn.style.cssText = "left:" + (calcImage2Egde - 40) + "px";
    }


}