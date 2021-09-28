class Controller {

   async showIndex() {
    let listPhotograph = await Model.getPhotographers();
    let tagsList = await Model.getTags();
    let view = ViewFactory.getView("index");
    view.renderIndex(listPhotograph, tagsList);  
  }

   async showPhotographer() {
    let idPhotographer = Utils.getParameter('id');
    let photograph = await Model.filterPhotograph(idPhotographer);
    let mediasfiltered = await Model.filterMedias(idPhotographer);
    let firstName = await Model.getPhotographName(idPhotographer);
    let view = ViewFactory.getView("photographer");
    view.addVariable("firstName", firstName);
    view.render(photograph, mediasfiltered, firstName)
  }
}