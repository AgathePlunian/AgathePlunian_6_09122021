class ViewProfil extends AbstractView {

  constructor() {
    super();
    this.mediasSorted = new Array();
  }
//AFFICHAGE DE TOUTE LA PAGE PHOTOGRAPHE
  render() {
    this.renderProfil();
    this.filterMedias();
    this.renderCardBottom();
  }

//AFFICHAGE CARD BOTTOM
  renderCardBottom() {
    let mediasFiltered = this.getVariable("mediasFiltered");
    let photograph = this.getVariable("photograph");
    let cardBottom = document.getElementById("card-bottom"); 
    
    //SUM OF LIKES  
    let allLikes = mediasFiltered.map(value => value.likes);
    let sumOfLikes = allLikes.reduce((x, y) => x + y);

    cardBottom.innerHTML = `
      <div class="total-likes-container">
        <p id="numberOfLikesBottomCard">${sumOfLikes}</p>
        <span class="card-bottom-heart-container">
          <img src="./images/icones/heart-solid.svg" alt="heart image"/>
        </span>
      </div>
      <div>
        <p>${photograph.price}€ / jour</p>
      </div>`;  
  }

  // METHODE AFFICHAGE DES INFORMATIONS DE PROFIL
  renderProfil() {
    let photographInfo = document.getElementById("photograph-info");  
    let str="";
    let photograph = this.getVariable("photograph");
    photograph.tags.forEach( tag => {
      str +='<a href="index.html?tag=' + tag +'" tabindex="0" class = "tag">#' + tag + '</a>';  
    });

    photographInfo.innerHTML =`
        <div class="infoAndBtn">
          <div class="infos-photographer">
            <h1 class="info-photograph-name">${photograph.name}</h1>
            <p class="info-photograph-city">${photograph.city}, ${photograph.country}</p>
            <p class="info-photograph-tagline">${photograph.tagline}</p>
            <ul class="tag-list">${str}</ul>
          </div>
          <div>
            <button tabindex="0" class="btn-contact" id="button-contact">Contactez-moi</button>
          </div>
        </div>
        <div class="portrait-container">
          <img src="./images/ID-Portrait/${photograph.portrait}" alt="portrait de ${photograph.name}"/></div>`;
     
    
    this.renderInputSelect();
      
      // AJOUT EVENTLISTER ON CLICK BUTTON CONTACT
       let contactBtn = document.getElementById("button-contact");
       contactBtn.addEventListener('click', (event) => {
         this.openModalContactForm(photograph);
       })
     
  }

  //FUNCTION ON CLICK BUTTON CONTACT        
  openModalContactForm() {
    let photograph = this.getVariable("photograph");
    let formModalContainer = document.getElementById("form-modal-container");
    let mainContent = document.getElementsByClassName("main")[0];
    mainContent.setAttribute('aria-hidden', 'true');
    formModalContainer.setAttribute("aria-modal" ,"true");

    formModalContainer.classList.add("display-form-modal");

    let formModal = document.createElement("div");
    formModal.classList.add("modal-form");
    
    formModalContainer.appendChild(formModal);
    formModal.innerHTML = `
    <div class="modal-form-header">
      <h1 tabindex='0' class="header-title-modal-form">Contactez-moi <br> ${photograph.name} </h1>
      <span id="close-modal" tabindex="0" aria-label="close modal">
        <img src="./images/icones/cross-white.svg" alt="close modal form" role="button" tabindex="5"/>
      </span>
    </div>
    <form class="contact-form">
      <label for="firstName">Prénom</label>
      <input type="text" id="firstName" name="firstName">

      <label for="lastName">Nom</label>
      <input type="text" id="lastName" name="lastName">

      <label for="email">Email</label>
      <input type="email" id="email" name="email">

      <label for="message">Votre message</label>
      <textarea class="area-message" id="message" name="message"></textarea>

      <input type="submit" value="Envoyer" id="submit-contact-form-btn">
    </form>`;

    let btnCloseModal = document.getElementById("close-modal");
    btnCloseModal.focus();

    //EVENT LISTENER BTN CLOSE MODAL
    btnCloseModal.addEventListener('click', (event) => {
      this.closeModalContactForm(event);
    })
    btnCloseModal.addEventListener('keypress' , (event) => {
      if(event.key === 'Enter'){
        this.closeModalContactForm(event);
      }
    })
  
    //EVENT LISTENER ON SUBMIT BTN
    let btnSubmit = document.getElementById("submit-contact-form-btn");
    btnSubmit.addEventListener('click', (event) => {
      this.onSubmitContactForm(event);
    })
  }

  //FUNCTION ON CLICK CLOSE MODAL
  closeModalContactForm(event) {
    let mainContent = document.getElementsByClassName("main")[0];
    let modalForm = document.getElementById("form-modal-container");
    mainContent.setAttribute('aria-hidden', 'true');
    modalForm.classList.remove("display-form-modal");
    modalForm.innerHTML="";
    
  }



  //FUNCTION ON CLICK SUBMIT CONTACT FORM
  onSubmitContactForm(event) {
    event.preventDefault();
    let modalForm = document.getElementById("form-modal-container");

    let firstNameValue = document.getElementById("firstName").value;
    let lastNameValue = document.getElementById("lastName").value;
    let emailValue = document.getElementById("email").value;
    let messageValue = document.getElementById("message").value;
    console.log("Prénom: " + firstNameValue, ", Nom: " + lastNameValue, ", Email: " + emailValue, ", Message: " + messageValue);

    modalForm.classList.remove("display-form-modal");
    modalForm.innerHTML="";

  }


  //AFFICHAGE DE L'INPUT DE SELECTION DE TRI DES MÉDIAS   
  renderInputSelect() {  
    let mediaSection = document.getElementById("photograph-pictures");
    mediaSection.innerHTML = `
      <div class="input-select-container">
        <label>Trier par</label>
        
        <div role="button" id="filter">
          <div class="first-select-and-chevron">
            <p id="first-input-select" class="select-input" tabindex="0"">Popularité</p>
            <span id="chevrons-container" tabindex="0" id="open-select" role="button" aria-label="Open filter by" aria-haspopup="true">
              <img class="chevron-down" src="./images/icones/chevron-down-solid.svg" alt="close select"/>
              <img class="chevron-up" src="./images/icones/chevron-up-solid.svg" alt="open select"/>
            </span>
          </div>
          <p tabindex="0"  id="second-input-select" class="select-input no-display-input-select">Date</p>
          <p tabindex="0"  id="third-input-select" class="select-input no-display-input-select">Titre</p>
        </div>
      </div>
      <div id="media-section"></div>
      `;

      let inputSelect = document.getElementById("chevrons-container");

      inputSelect.addEventListener('click', () => {
          this.handleSelect();
      })

      inputSelect.addEventListener('keypress' , (event) => {
        if(event.key === 'Enter'){
          this.handleSelect();
        }
      });

      let firstInput = document.getElementById("first-input-select");
      let secondInput = document.getElementById("second-input-select");
      let thirdInput = document.getElementById("third-input-select");
  
      let selectChoices = [firstInput, secondInput, thirdInput];
      console.log(selectChoices);
  
      for (let i = 1; i < selectChoices.length; i++) {
        
        selectChoices[i].addEventListener('click', (event) => {
          let contentFirstInput = firstInput.textContent;
          
          let inputSelected = event.target;
          let valueSelected = event.target.innerHTML;
                    
          this.filterMediasBySelect(valueSelected);
          this.closeMenuSelect();

          firstInput.innerHTML = valueSelected;      
          inputSelected.innerHTML = contentFirstInput;
        })
      }
  }

  //FUNCTION OPEN SELECT
  handleSelect() {
    let chevronUp = document.getElementsByClassName("chevron-up")[0];
   
    //si le menu est ouvert
    if(chevronUp.classList.contains("display-chevron")) {
      this.closeMenuSelect();
    }
    else {
      this.openMenuSelect();
    }

  }

  openMenuSelect() {
    let inputDate = document.getElementById("second-input-select");
    let inputTitle = document.getElementById("third-input-select");
    let chevronDown = document.getElementsByClassName("chevron-down")[0];
    let chevronUp = document.getElementsByClassName("chevron-up")[0];
    chevronDown.classList.add("no-display-chevron");
    chevronUp.classList.add("display-chevron");
    inputDate.classList.add("display-input-select");
    inputTitle.classList.add("display-input-select");
  }
  
  closeMenuSelect() {
    let inputDate = document.getElementById("second-input-select");
    let inputTitle = document.getElementById("third-input-select");
    let chevronDown = document.getElementsByClassName("chevron-down")[0];
    let chevronUp = document.getElementsByClassName("chevron-up")[0];
    chevronDown.classList.remove("no-display-chevron");
    chevronUp.classList.remove("display-chevron");
    inputDate.classList.remove("display-input-select");
    inputTitle.classList.remove("display-input-select");
  }

  //FUNCTION FILTER MEDIAS BY DEFAULT + ADD EVENT LISTENER ON FILTER BY
 
  filterMedias() {
    let mediasFiltered = this.getVariable("mediasFiltered");
    this.mediasSorted = mediasFiltered.sort(function(a,b) {
      return b.likes - a.likes;
    })

      this.renderMedias();
  }

  /////FONCTION EVENTLISTER SELECT /////

  filterMediasBySelect(valueSelected) {  
    
    if(valueSelected == "Popularité") {
      this.mediasSorted = this.mediasSorted.sort(function(a,b) {
        return b.likes - a.likes;
      })

    }

    else if(valueSelected == "Date") {
      this.mediasSorted = this.mediasSorted.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
  
    }

    else if(valueSelected == "Titre") {   
      this.mediasSorted = this.mediasSorted.sort(function (a, b) {
        var titreA = a.title.toUpperCase(); 
        var titreB = b.title.toUpperCase(); 
          if (titreA < titreB) {
            return -1;
          }
          if (titreA > titreB) {
            return 1;
          }
        }) 
      }
      this.renderMedias();
  }


  // METHODE AFFICHAGE DE LA PARTIE MÉDIA 
  renderMedias() {
    let mediaSection = document.getElementById("media-section");
    let firstName = this.getVariable("firstName");
    mediaSection.innerHTML = "";
      
    this.mediasSorted.forEach(media => {
      let divContainer = document.createElement('div');
      divContainer.classList.add("media-container");
        divContainer.innerHTML = `
          <div class="img-link" id="${media.id}" aria-label="${media.title} ,closeup view" tabindex="0">
          ${this.tagMediaFactory(media, firstName)}
          </div>
          <div class="title-container">
            <p class="media-title">${media.title}</p>
            <div class="likes-container">
              <p class="likes-number">${media.likes}</p>
              <i class="empty-heart far fa-heart" tabindex="0" role="button" aria-label="likes">
              <i class="full-heart fas fa-heart"></i>
              </i>
            </div>
          </div>`;
        
        mediaSection.appendChild(divContainer);      
    })

    //AJOUT EVENT LISTENER POUR LE LIKE
    let hearts = document.getElementsByClassName("empty-heart");
    for(var i = 0 ; i < hearts.length ; i++) {
      hearts[i].addEventListener ('click' , (event) => {
        let paragraphNumberOfLikes = event.path[2].childNodes[1];
        let fullHeart = event.target;
        this.addLike(paragraphNumberOfLikes, fullHeart);
      });
     
      hearts[i].addEventListener('keypress' , (event) => {
        if(event.key === 'Enter'){
          let fullHeart = event.target.children[0];
          let paragraphNumberOfLikes = event.path[1].childNodes[1];
          this.addLike(paragraphNumberOfLikes,fullHeart);
        }
      });
    }

    //AJOUT EVENT LISTENER SUR IMAGE 
    let listImages = document.getElementsByClassName("img-link");
    
    for(var i = 0 ; i < listImages.length ; i++) {
            
      listImages[i].addEventListener ('click' , (event) => {    
        let idMedia = event.path[1].getAttribute("id");
        this.showLightbox(event, idMedia);
      })

      listImages[i].addEventListener ('keypress', (event) => {
        if(event.key === 'Enter'){
         
          let idMedia = event.path[0].getAttribute("id");
          this.showLightbox(event, idMedia);
        }
       
      })
    } 
  }

  //FACTORY TYPE OF MEDIAS
  tagMediaFactory(media) {
    let firstName =  this.getVariable("firstName");
    if(media.video) {
      return `<video controls>
                  <source src="images/${firstName}/${media.video}" type="video/mp4" alt="${media.title}, closeup viex">
                </video>`
    }
    else {
      return `<img src="images/${firstName}/${media.image}" alt="${media.title} closeup view"/>`
    }
  }

  //FUNCTION ONCLICK IMAGE
  showLightbox(event, idMedia) {
    let lightbox = new Lightbox("lightbox", this.mediasSorted, idMedia, this.getVariable("firstName"));
    lightbox.show();
  }
    
  //FUNCTION ONCLICK ADD OR REMOVE LIKE
  addLike(paragraphNumberOfLikes, fullHeart) {  
    let numberOfLikes = paragraphNumberOfLikes.textContent; 
    let paragraphNumberOfLikeBottom = document.getElementById("numberOfLikesBottomCard");
    let numberOfLikesCardBottom = document.getElementById("numberOfLikesBottomCard").textContent;
    let numberOfLikeCardToNumber = Number(numberOfLikesCardBottom);
    let numberLikeToNumber = Number(numberOfLikes);
    
    if (fullHeart.classList.contains('liked')) {
      fullHeart.classList.remove('liked');
      let removeLike = numberLikeToNumber - 1;
      let removeLikeBottom = numberOfLikeCardToNumber - 1;
      
      paragraphNumberOfLikeBottom.innerHTML = removeLikeBottom;
      paragraphNumberOfLikes.innerHTML = removeLike;
    }
    else {
      fullHeart.classList.add('liked');
      let addLike = numberLikeToNumber + 1;
      let addLikeBottom = numberOfLikeCardToNumber + 1;

      paragraphNumberOfLikeBottom.innerHTML = addLikeBottom;
      paragraphNumberOfLikes.innerHTML = addLike;
    }
  }

}

