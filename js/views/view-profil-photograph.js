class ViewProfil extends AbstractView {

  constructor(firstName) {
    super();
    this.mediasSorted = new Array();
    this.firstName = firstName;
  }

  render(photograph, mediasfiltered, firstName) {
    this.renderProfil(photograph);
    this.filterMedias(mediasfiltered, firstName);
    this.renderCardBottom(photograph, mediasfiltered);
  }
  
  renderCardBottom(photograph, mediasfiltered) {
    let cardBottom = document.getElementById("card-bottom");
    console.log(photograph.price);
    cardBottom.innerHTML = `<p>${photograph.price}€ / jour</p>`
  }

  //// METHODE AFFICHAGE DES INFORMATIONS DE PROFIL /////
  renderProfil(photograph) {
    
    let photographInfo = document.getElementById("photograph-info");  
    let str="";
    photograph.tags.forEach( tag => {
      str +='<li class = "tag">#' + tag + '</li>';  
    });

    photographInfo.innerHTML =`
      <div class="infoAndBtn">
        <div class="infos-photographer">
          <h1>${photograph.name}</h1>
          <p>${photograph.city}, ${photograph.country}</p>
          <p>${photograph.tagline}</p>
          <ul class="tag-list">${str}</ul>
        </div>
        <div>
          <button class="btn-contact">Contactez-moi</button>
        </div>
      </div>
      <div class="portrait-container">
        <img src="./images/ID-Portrait/${photograph.portrait}"></div>`;
    this.renderInputSelect();
  }

//AFFICHAGE DE L'INPUT DE SELECTION DE TRI DES MÉDIAS   
  renderInputSelect() {  
     let mediaSection = document.getElementById("photograph-pictures");
     mediaSection.innerHTML = `
     <div class="input-select">
       <label>Trier par</label>
       <select id="filter">
         <option value="popularité">Popularité</option>
         <option value = "date">Date</option>
         <option value = "titre">Titre</option>
       </select>
     </div>
     <div id="media-section"></div>
     `;
  }

  filterMedias(mediasfiltered, firstName) {
    this.mediasSorted = mediasfiltered.sort(function(a,b) {
      return b.likes - a.likes;
    })
   
    //AJOUT EVENT LISTENER AU CHANGEMENT DU SELECT    
    let filter = document.getElementById("filter");
    filter.addEventListener('change', () => {
      this.filterMediasBySelect(firstName);
    })
    this.renderMedias(firstName);
  }

/////FONCTION EVENT SELECT /////

filterMediasBySelect(firstName) {  
  console.log(this.mediasSorted);
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
    this.renderMedias(firstName);
  }


// METHODE AFFICHAGE DE LA PARTIE MÉDIA //
  renderMedias(firstName) {
    
    let mediaSection = document.getElementById("media-section");
    mediaSection.innerHTML = "";
  
    this.mediasSorted.forEach(media => {
      let divContainer = document.createElement('div');
      divContainer.classList.add("media-container");

      ///NE PAS OUBLIER DE FAIRE LA FONCTION FACTORY

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
  
  tagMediaFactory(media , firstName) {
    if(media.video) {
      return `<video controls width="250">
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
    let lightbox = new Lightbox("lightbox", this.mediasSorted, idMedia, this.getVariable("fistName"));
    lightbox.show();
  }
  
  //FONCTION AU CLICK AJOUTE OU ENLÈVE LIKE
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

