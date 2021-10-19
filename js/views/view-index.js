class ViewIndex extends AbstractView {
 
  //ARRAY TAGS SELECTIONNÉS
  constructor() {
    super();
    this.listTagsSelected = new Array();
  }

  ///ANIMATE BUTTON TOP
  animateTopButton() {
    document.addEventListener("scroll", function(){
      let button = document.getElementsByClassName("link-contain")[0];
      let y = window.scrollY;
       if(y >= 30){
        button.classList.add("link-contain-display")
       }

       if(y == 0){
        button.classList.remove("link-contain-display")
       }
    })
  }

  //AFFICHAGE DES PHOTOGRAPHES PAR CARDS
  render() {
    this.renderInfoPhotograph();
    this.renderTags();
    this.animateTopButton();
    this.getTagInURL();
  } 

  renderInfoPhotograph() {
    let listPhotograph = this.getVariable("listPhotograph");
    let section = document.getElementById("photographers");
    
    listPhotograph.forEach(photograph => {
      let str=""; 
      photograph.tags.forEach( tag => {
      str +='<li class="tag">#' + tag + '</li>';  
      
    });

      let div = document.createElement("div");
      div.classList.add("artist-card");
      div.innerHTML = `
        <a id="getID" href="photographer-page.html?id=${photograph.id}"> 
        <div class="portrait-container">
          <img src="./images/ID-Portrait/${photograph.portrait}">
        </div>
        <h2 class="name">${photograph.name}</h2>
        </a>
          <p class="location">${photograph.country}</p>
          <p class="tagline">${photograph.tagline}</p> 
          <p class="price">${photograph.price} €/jour</p> 
          <ul class="tag-list" id="tagList">${str}</ul>`;
      section.appendChild(div);    
    })
  }

  //AFFICHAGE DE LA LISTE DE TAGS NAVIGATION
  renderTags() {
    let tagsList = this.getVariable("tagsList")
    let list = document.getElementById("tags-list");  
    tagsList.forEach(tag => {
      let li = document.createElement("li");
      li.classList.add("tag", "first-list");
      li.setAttribute("tabindex", "0");
      li.setAttribute("role", "link");
      li.setAttribute("id", tag);
      li.innerHTML = "#" + tag;
      list.appendChild(li);
      li.addEventListener('click', (event) => {
        this.filterPhotographByTags(event)
      })
      li.addEventListener('keypress', (event) => {
        if(event.key === 'Enter'){
          this.filterPhotographByTags(event)
          }
      })
    });
  }

  getTagInURL() {
    let tagURL = this.getVariable("tagURL");
    console.log(tagURL);
    if(tagURL != "null") {
    
      let tagSelected = document.getElementById(tagURL);
      console.log(tagSelected);
      tagSelected.click();
    }
  }
  
  //EVENT ON CLICK DES TAGS SELECTIONNÉS
  filterPhotographByTags(event) {
    let tagSelected = event.target;
    let contentTag = tagSelected.textContent;
    let listPhotograph = document.getElementsByClassName("artist-card");
    
    // SUPPRIMER CLASS SELECTED SI LE TAG EST DÉJÀ SELECTIONNÉ
    if(tagSelected.classList.contains("selected-tag")) {
      tagSelected.classList.remove("selected-tag");
      
      //ON ENLÈVE LE TAG SELECTIONNÉ DE L'ARRAY DE TAGS SELECTIONNÉS
      for (let i = 0 ; i < this.listTagsSelected.length; i++) {           
        if(this.listTagsSelected[i] === contentTag) {
          this.listTagsSelected.splice(i , 1);
          break;
        }
      }
    }
    else {
      tagSelected.classList.add("selected-tag");
      this.listTagsSelected.push(contentTag); 
    }
    
    // SI L'ARRAY DE TAG SÉLÉCTIONNÉ N'EST PAS VIDE, DONC SUPÉRIEUR À 0

    if(this.listTagsSelected.length > 0) { 
  
      for (let i = 0 ; i < listPhotograph.length; i ++) {   
        var listTagsPhotograph = listPhotograph[i].getElementsByClassName("tag");
        let isFound = false;
  
        for(let j = 0 ; j < listTagsPhotograph.length ; j ++) {
          let tagContent = listTagsPhotograph[j].textContent;
            //SI PARMIS LA LISTE DE TAGS SÉLÉCTIONNÉS, ON TROUVE UNE CORRESPONDANCE AVEC LES TAGS D'UN PHOTOGRAPHE;
          //ALORS IS FOUND DEVIENT TRUE;
          if(this.listTagsSelected.includes(tagContent)) {      
            listPhotograph[i].classList.remove("tag-not-found"); 
            isFound = true;
            break;
          }
        }
    
        // SI AUCUN TAG N'A TROUVÉ DE CORRESPONDANCE, ON CACHE LA CARD DU PHOTOGRAPHE
        if(isFound == false) {
          listPhotograph[i].classList.add("tag-not-found");
         
        }

         // SI UNE CORRESPONDANCE A ÉTÉ TROUVÉ, ON AFFICHE LA CARD DU PHOTOGRAPHE
        else {
          listPhotograph[i].classList.remove("tag-not-found");
        }

      }
    }

    // SI L'ARRAY EST VIDE, ON AFFICHE TOUS LES PHOTOGRAPHES
    else {
      for(let i = 0; i < listPhotograph.length ; i++) {
        listPhotograph[i].classList.remove("tag-not-found");
        listPhotograph[i].classList.remove("tag-found");
      }
    }
  }
}
