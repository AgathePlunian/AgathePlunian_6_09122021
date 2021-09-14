class Controller {

   async showIndex() {
    let listPhotograph = await Model.getPhotographers();
    let tagsList = await Model.getTags();
    let view = new ViewIndex;
    view.renderIndex(listPhotograph, tagsList);  
  }

   async showPhotographer() {
    let idPhotographer = Utils.getParameter('id');
    let photograph = await Model.filterPhotograph(idPhotographer);
    let view = new ViewProfil;
    view.renderProfil(photograph);
  }

  async showMedias() {  
    let idPhotographer = Utils.getParameter('id');
    let mediasfiltered = await Model.filterMedias(idPhotographer);
    let firstName = await Model.getPhotographName(idPhotographer);
    let view = new ViewProfil;
    view.renderMedia(mediasfiltered, firstName);
  }
 
}