class ViewProfil extends AbstractView {

  constructor(firstName) {
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
        <p>${sumOfLikes}</p>
        <span class="card-bottom-heart-container">
          <img src="../images/icones/heart-solid.svg" alt="heart image"/>
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
      str +='<li class = "tag">#' + tag + '</li>';  
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
            <button class="btn-contact" id="button-contact">Contactez-moi</button>
          </div>
        </div>
        <div class="portrait-container">
          <img src="./images/ID-Portrait/${photograph.portrait}"></div>`;
     
    
    this.renderInputSelect();
      
      // AJOUT EVENTLISTER ON CLICK BUTTON CONTACT
       let contactBtn = document.getElementById("button-contact");
       contactBtn.addEventListener('click', (event) => {
         this.openModalContactForm(event, photograph);
       })
     
  }

  //FUNCTION ON CLICK BUTTON CONTACT
  openModalContactForm(event) {
    let photograph = this.getVariable("photograph");
    let formModalContainer = document.getElementById("form-modal-container");
    formModalContainer.classList.add("display-form-modal");
    
    let formModal = document.createElement("div");
    formModal.classList.add("modal-form");
    formModalContainer.appendChild(formModal);
    formModal.innerHTML = `
    <div class="modal-form-header">
      <h1 class="header-title-modal-form">Contactez-moi <br> ${photograph.name}</h1>
      <span id="close-modal">
        <img src="../images/icones/cross-white.svg" alt="close modal form"/>
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

    //EVENT LISTENER BTN CLOSE MODAL
    let btnCloseModal = document.getElementById("close-modal");
    btnCloseModal.addEventListener('click', (event) => {
      this.closeModalContactForm(event);
    })

    //EVENT LISTENER ON SUBMIT BTN
    let btnSubmit = document.getElementById("submit-contact-form-btn");
    btnSubmit.addEventListener('click', (event) => {
      this.onSubmitContactForm(event);
    })
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

  //FUNCTION ON CLICK CLOSE MODAL
  closeModalContactForm(event) {
    let modalForm = document.getElementById("form-modal-container");
    modalForm.classList.remove("display-form-modal");
    modalForm.innerHTML="";
    
  }

  //AFFICHAGE DE L'INPUT DE SELECTION DE TRI DES MÉDIAS   
  renderInputSelect() {  
    let mediaSection = document.getElementById("photograph-pictures");
    mediaSection.innerHTML = `
      <div class="input-select">
        <label>Trier par</label>
        <div role="listbox" id="filter">
          <div class="select-input" role="option" value="popularité">Popularité<span><img/ src=""></span></div>
          <div class="select-input" role="option" value="date">Date</div>
          <div class="select-input" role="option" value="titre">Titre</div>
        </div>
      </div>
      <div id="media-section"></div>
      `;
  }

  //FUNCTION FILTER MEDIAS BY DEFAULT + ADD EVENT LISTENER ON FILTER BY
 
  filterMedias() {
    let mediasFiltered = this.getVariable("mediasFiltered");
    this.mediasSorted = mediasFiltered.sort(function(a,b) {
      return b.likes - a.likes;
    })

      //AJOUT EVENT LISTENER ON CHANGE SELECT    
      let filter = document.getElementById("filter");
      filter.addEventListener('change', () => {
        this.filterMediasBySelect();
      })
      this.renderMedias();
  }

  /////FONCTION EVENTLISTER SELECT /////

  filterMediasBySelect() {  

    let valueSelected = filter.value;
    
    if(valueSelected == "popularité") {
      this.mediasSorted = this.mediasSorted.sort(function(a,b) {
        return b.likes - a.likes;
      })

    }

    else if(valueSelected == "date") {
      this.mediasSorted = this.mediasSorted.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
  
    }

    else if(valueSelected == "titre") {   
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
          <div class="img-link" id="${media.id}">
          ${this.tagMediaFactory(media, firstName)}
          </div>
          <div class="title-container">
            <p class="media-title">${media.title}</p>
            <div class="likes-container">
              <p class="likes-number">${media.likes}</p>
              <i class="empty-heart far fa-heart">
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
        this.addLike(event);
      })
    }

    //AJOUT EVENT LISTENER SUR IMAGE 
    let listImages = document.getElementsByClassName("img-link");
    for(var i = 0 ; i < listImages.length ; i++) {
      listImages[i].addEventListener ('click' , (event) => {
        this.showLightbox(event);
      })
    } 
  }

  //FACTORY TYPE OF MEDIAS
  tagMediaFactory(media) {
    let firstName =  this.getVariable("firstName");
    if(media.video) {
      return `<video controls>
                  <source src="images/${firstName}/${media.video}" type="video/mp4">
                </video>`
    }
    else {
      return `<img src="images/${firstName}/${media.image}"/>`
    }
  }

  //FUNCTION ONCLICK IMAGE
  showLightbox(event) {
    let idMedia = event.path[1].getAttribute("id");
    let lightbox = new Lightbox("lightbox", this.mediasSorted, idMedia, this.getVariable("firstName"));
    lightbox.show();
  }
    
  //FUNCTION ONCLICK ADD OR REMOVE LIKE
  addLike(event) {  
    let fullHeart = event.target; 
    let paragraphNumberOfLikes = event.path[2].childNodes[1];
    let numberOfLikes = paragraphNumberOfLikes.textContent; 
    let numberLikeToNumber = Number(numberOfLikes);
    
    if (fullHeart.classList.contains('liked')) {
      fullHeart.classList.remove('liked');
      let removeLike = numberLikeToNumber - 1;
      paragraphNumberOfLikes.innerHTML = removeLike;
    }
    else {
      fullHeart.classList.add('liked');
      let addLike = numberLikeToNumber + 1;
      paragraphNumberOfLikes.innerHTML = addLike;
    }
  }

}

