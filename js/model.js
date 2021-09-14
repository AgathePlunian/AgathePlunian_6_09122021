class Model {
  static get() {
    return fetch(URL_DATA)
    .then(response => response.json())
    .then((data) => {
     return data;
    })  
  }

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

  static async getPhotographers() {
    let data =  await Model.get();
    return data.photographers;
  }

  static async filterPhotograph (idPhotographer) {
    let data  = await Model.getPhotographers();
    let onePhotograph = data.filter(photographer => photographer.id == idPhotographer);
    let photograph = onePhotograph[0];
    return photograph;
  }

  static async getPhotographName(id) {
    let dataPhotograph = await Model.filterPhotograph(id);
    let result = dataPhotograph.name;
    let name = result.split(" ")[0];
    return name;
  }

  static async getMedia() {
    let data = await Model.get();
    return data.media;
  }

  static async filterMedias(idPhotographer) {
    let dataMedia = await Model.getMedia();
    let mediasfiltered = dataMedia.filter(dataMedia => dataMedia.photographerId == idPhotographer);
    return mediasfiltered;
  }

}