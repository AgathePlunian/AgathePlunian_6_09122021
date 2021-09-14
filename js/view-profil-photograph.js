class ViewProfil {

  constructor() {
    this.arraySorted = new Array();
  }
  
  //AFFICHAGE DES INFORMATIONS DE PROFIL
  renderProfil(photograph) {

    let photographInfo = document.getElementById("photograph-info");
    
    let str="";
      photograph.tags.forEach( tag => {
      str +='<li class = "tag">#' + tag + '</li>';  
    });

    photographInfo.innerHTML = '<div class="infoAndBtn"><div class="infos-photographer"><h1>' + photograph.name +'</h1><p>'+ photograph.city +', ' + photograph.country +'</p><p>'+ photograph.tagline +'</p><ul class="tag-list">' + str +' </ul"></div><div><button class="btn-contact">Contactez-moi</button></div></div><div class="portrait-container"><img src="./images/ID-Portrait/'+ photograph.portrait+'"></div>'
  }

  
  //AFFICHAGE DE LA PARTIE MÉDIA 
 
  renderMedia(mediasfiltered, firstName) {

    //AFFICHAGE DE L'INPUT DE SELECTION DE TRI DES MÉDIAS   
    let mediaSection = document.getElementById("photograph-pictures");
    mediaSection.innerHTML = '<div class="input-select"><label>Trier par</label><select id="filter"><option value="popularité">Popularité</option><option value = "date">Date</option><option value = "titre">Titre</option></select><div id="media-section"></div></div>';
   
    //AFFICHAGE DES MÉDIAS TRIÉ PAR DEFAUT SELON LA POPULARITÉ
    let basicRender = mediasfiltered.sort(function(a,b) {
      return b.likes - a.likes;
    })
    mediaSection = document.getElementById("media-section");
    basicRender.forEach(media => {
      let divContainer = document.createElement('div');
      divContainer.classList.add("media-container");

      ///NE PAS OUBLIER DE FAIRE LA FONCTION CHELOU
      if(media.video) {
        divContainer.innerHTML = '<a class="img-link"><video controls width="250"><source src="images/'+ firstName +'/'+ media.video + '" type="video/mp4" ></video></a><div class="title-container"><p class="media-title">' + media.title +'</p><div class="likes-container"><p class="likes-number">'+ media.likes +'</p><i class="empty-heart far fa-heart"><i class="full-heart fas fa-heart"></i></i></div></div>';
      }
      else {
        divContainer.innerHTML = '<a class="img-link"><img src="images/'+ firstName +'/'+ media.image + '"></a><div class="title-container"><p class="media-title">' + media.title +'</p><div class="likes-container"><p class="likes-number">'+ media.likes +'</p><i class="empty-heart far fa-heart"><i class="full-heart fas fa-heart"></i></i></div></div>';
      }
      mediaSection.appendChild(divContainer);
      
    })

     //AJOUTE EVENT LISTENER POUR LE LIKE
     let hearts = document.getElementsByClassName("empty-heart");
     for(var i = 0 ; i < hearts.length ; i++) {
       hearts[i].addEventListener ('click' , (event) => {
         this.addLike(event);
       })
     }

    //AJOUT EVENT LISTENER AU CHANGEMENT DU SELECT    
    filter.addEventListener('change', (event) => {
      this.filterMediasBySelect(event , mediasfiltered)
    })
  }

  filterMediasBySelect(event, mediasfiltered) {   
    let valueSelected = filter.value;
   
    if(valueSelected == "popularité") {
      this.arraySorted = mediasfiltered.sort(function(a,b) {
        return b.likes - a.likes;
      })
    }

    else if(valueSelected == "date") {
      this.arraySorted = mediasfiltered.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
    }

    else if(valueSelected == "titre") {   
      this.arraySorted = mediasfiltered.sort(function (a, b) {
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

    /*
    this.arraySorted.forEach(media => {
      divContainer.remove();
      newDivContainer = document.createElement("div");
      newDivContainer.classList.add("media-container");

      ///NE PAS OUBLIER DE FAIRE LA FONCTION CHELOU
      if(media.video) {
        divContainer.innerHTML = '<a class="img-link"><video controls width="250"><source src="images/'+ firstName +'/'+ media.video + '" type="video/mp4" ></video></a><div class="title-container"><p class="media-title">' + media.title +'</p><div class="likes-container"><p class="likes-number">'+ media.likes +'</p><i class="empty-heart far fa-heart"><i class="full-heart fas fa-heart"></i></i></div></div>';
      }
      else {
        divContainer.innerHTML = '<a class="img-link"><img src="images/'+ firstName +'/'+ media.image + '"></a><div class="title-container"><p class="media-title">' + media.title +'</p><div class="likes-container"><p class="likes-number">'+ media.likes +'</p><i class="empty-heart far fa-heart"><i class="full-heart fas fa-heart"></i></i></div></div>';
      }
      mediaSection.appendChild(newDivContainer);
      
    })
  */
    
  }


//FONCTION AU CLICK AJOUTE OU ENLÈVE LIKE
  addLike(event) {  
    
  let fullHeart = event.target; 
  let paragraphNumberOfLikes = event.path[1].previousSibling;
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

