class Model {
  
  //RÉCUPERE LES DONNÉES DU FORMAT JSON
  static get() {
    return fetch(URL_DATA)
    .then(response => response.json())
    .then((data) => {
     return data;
    })  
  }

  //CRÉER UNE LISTE DE TAGS UNIQUES QUI SERT POUR LA BARRE DE NAVIGATION DE LA PAGE INDEX 
  static async getTags() {
    let listPhotograph  = await Model.getPhotographers();
    let tags = [];
    listPhotograph.forEach (photograph => {
      photograph.tags.forEach (tag => {
        tags.push(tag);
      })
    })
    let uniqueTags = [...new Set(tags)];
    return uniqueTags;
  }

  //RECUPÈRE L'ARRAY DES PHOTOGRAPHES DU FICHIER JSON
  static async getPhotographers() {
    let data =  await Model.get();
    return data.photographers;
  }

  //PERMET DE RECUPERER LES DONNÉES DU PHOTOGRAPHE QUI A ÉTÉ SELECTIONNÉ AU CLICK SUR LA PAGE INDEX
  static async filterPhotograph (idPhotographer) {
    let data  = await Model.getPhotographers();
    let onePhotograph = data.filter(photographer => photographer.id == idPhotographer);
    let photograph = onePhotograph[0];
    return photograph;
  }

  //RÉCUPÈRE SEULEMENT LE PRENOM DU PHOTOGRAPHE POUR ACCEDER À SES PHOTOS
  static async getPhotographName(id) {
    let dataPhotograph = await Model.filterPhotograph(id);
    let result = dataPhotograph.name;
    let name = result.split(" ")[0];
    return name;
  }

  //RECUPÈRE L'ARRAY DES MÉDIAS
  static async getMedia() {
    let data = await Model.get();
    return data.media;
  }

  //RÉCUPÈRE LES MÉDIAS DU PHOTOGRAPHE SELECTIONNÉ AU CLICK SUR LA PAGE INDEX
  static async filterMedias(idPhotographer) {
    let dataMedia = await Model.getMedia();
    let mediasfiltered = dataMedia.filter(dataMedia => dataMedia.photographerId == idPhotographer);
    return mediasfiltered;
  }

}