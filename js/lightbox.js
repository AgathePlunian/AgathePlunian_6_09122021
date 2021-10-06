class Lightbox {

  constructor(targetId , listMedias, idMedia, firstName) {
    this.target = document.getElementById(targetId);
    this.listMedias = listMedias;
    this.idMedia = idMedia;
    this.firstName = firstName;
    this.indexOfMedia = -1;
  }

  show() {

    this.indexOfMedia = this.listMedias.findIndex(media => media.id == this.idMedia);
    
    let mainContainer = document.getElementsByClassName("main-container")[0];
    mainContainer.classList.add("main-container-hidden");
    this.target.classList.add("lightbox-visible");
        
    let lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");
    this.target.appendChild(lightboxContent);

    this.renderMediaLightbox();
  }

  renderMediaLightbox() {
    let lightboxContent = document.getElementsByClassName("lightbox-content")[0];

    lightboxContent.innerHTML = 
    `<div class="lightbox-container">
        <span id="btn-close">
        <img src="../images/icones/cross.svg" alt="close lightbox"/>
        </span>
        <div class="fleche-et-img">
          <span class="fleche" id="previous-img">
            <img src="../images/icones/chevron-left-solid.svg" alt="previous image" />
          </span>
          <div class="img-lightbox-container">
          ${this.tagMediaFactory(this.listMedias[this.indexOfMedia], this.firstName)}
          </div>
          <span class="fleche" id="next-img">
          <img src="../images/icones/chevron-right-solid.svg" alt="next image" />
          </soan>
        <div>
        <p class="lightbox-title">
          ` + this.listMedias[this.indexOfMedia].title +`
        </p>
      </div>`;

    //ADD EVENT TO BTN CLOSE
    let btnClose = document.getElementById("btn-close");
    btnClose.addEventListener('click' , (event) => {
    this.closeLightbox(event)
    });

    //ADD EVENT TO RIGHT ARROW
    let rightArrow = document.getElementById("next-img");
    rightArrow.addEventListener('click' , (event) => {
      this.showNextImg()
    })

   //ADD EVENT TO LEFT ARROW
    let leftArrow = document.getElementById("previous-img");
    leftArrow.addEventListener('click' , (event) => {
      this.showPreviousImg()
    })

    document.addEventListener('keydown', (event) => {
      this.checkKey(event)
    })
  }
         
  checkKey(event) {
    console.log(event);
    event = event || window.event;

    if (event.keyCode == '37') {
        this.showNextImg()
    }
    if (event.keyCode == '39') {
        this.showPreviousImg();
    }
}


  tagMediaFactory(media , firstName) {
    console.log("appel tagmedia factory");
    if(media.video) {
      return `<video controls>
                <source src="images/${firstName}/${media.video}" type="video/mp4">
              </video>`
      
    }
    else {
      return `<img src="images/${firstName}/${media.image}"/>`
    }
  }
  
  /// EVENT LISTENER BUTTON CLOSE LIGHTBOX
  closeLightbox(event) {
    let mainContainer = document.getElementsByClassName("main-container")[0];
    let lightbox = document.getElementsByClassName("lightbox-visible")[0];

    mainContainer.classList.remove("main-container-hidden");
    lightbox.classList.remove("lightbox-visible");
    lightbox.innerHTML = "";
  }

  // LIGHTBOX SHOW PREVIOUS IMAGE ON CLICK ARROW
  showPreviousImg() {  

    if(this.indexOfMedia == 0) {
      this.indexOfMedia = this.listMedias.length-1;
    }
    else {
      this.indexOfMedia = this.indexOfMedia - 1;
    }    
    this.renderMediaLightbox();
  }


  // LIGHTBOX SHOW NEXT IMAGE ON CLICK ARROW
  showNextImg() {
    if(this.indexOfMedia == this.listMedias.length-1) {
      this.indexOfMedia = 0;
    }
    else {
      this.indexOfMedia = this.indexOfMedia + 1;
    }
    this.renderMediaLightbox();
  } 
}