class Controller {

   async showIndex() {
    let listPhotograph = await Model.getPhotographers();
    let tagsList = await Model.getTags();
    let view = ViewFactory.getView("index");
    view.addVariable("listPhotograph", listPhotograph);
    view.addVariable("tagsList", tagsList);
    view.render(listPhotograph);  
  }

   async showPhotographer() {
    let idPhotographer = Utils.getParameter('id');
    let photograph = await Model.filterPhotograph(idPhotographer);
    let mediasFiltered = await Model.filterMedias(idPhotographer);
    let firstName = await Model.getPhotographName(idPhotographer);
    let view = ViewFactory.getView("photographer");
    view.addVariable("firstName", firstName);
    view.addVariable("photograph", photograph);
    view.addVariable("mediasFiltered", mediasFiltered);
    view.render()
  }
}