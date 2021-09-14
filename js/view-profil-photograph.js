class ViewProfil {

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
    
   /* mediasfiltered.sort(function(a,b) {
      return b.likes - a.likes;
      })
    */
    //AFFICHAGE DES MÉDIAS
    mediaSection = document.getElementById("media-section");  
    console.log(mediasfiltered);
   
   // let filter = document.getElementById("filter");
    
   let arraySorted = [];

    filter.addEventListener('change' , (event) =>  {

      let valueSelected = filter.value;
      console.log(valueSelected);

      if(valueSelected == "popularité") {
        arraySorted = mediasfiltered.sort(function(a,b) {
          return b.likes - a.likes;
        })
      }

      else if(valueSelected == "date") {
        console.log("oui");
        arraySorted = mediasfiltered.sort(function (a, b) {
          var titreA = a.title.toUpperCase(); // ignore upper and lowercase
          var titreB = b.title.toUpperCase(); // ignore upper and lowercase
            if (titreA < titreB) {
              return -1;
            }
            if (titreA > titreB) {
              return 1;
            }
        })
      }

      else if(valueSelected == "titre") {
      
        arraySorted = mediasfiltered.sort(function (a, b) {
          var titreA = a.title.toUpperCase(); // ignore upper and lowercase
          var titreB = b.title.toUpperCase(); // ignore upper and lowercase
            if (titreA < titreB) {
              return -1;
            }
            if (titreA > titreB) {
              return 1;
            }
        })
      }
      console.log(arraySorted);
    });
    /*
      if(valueSelected == "popularité") {
        let arraySorted = mediasfiltered.sort(function(a,b) {
          return b.likes - a.likes;
          })
        console.log(valueSelected);
        return arraySorted;
      }  
 
      else if(valueSelected == "date") {
    
        mediasfiltered.sort(function (a, b) {
        let arraytest = new Date(a.date).getTime() - new Date(b.date).getTime();
        console.log(arraytest);
      })
      
        console.log(valueSelected);
      }
      */      
    
    mediasfiltered.forEach(media => {
      
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
    
    let hearts = document.getElementsByClassName("empty-heart");
   
    //AJOUTE EVENT LISTENER POUR LE LIKE
    for(var i = 0 ; i < hearts.length ; i++) {
      hearts[i].addEventListener ('click' , (event) => {
        this.addLike(event);
      })
    }
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

