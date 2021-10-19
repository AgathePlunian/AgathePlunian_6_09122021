class Controller {

   async showIndex() {
    let listPhotograph = await Model.getPhotographers();
    let tagsList = await Model.getTags();
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let tagParam = urlParams.get("tag");
    let view = ViewFactory.getView("index");
    view.addVariable("listPhotograph", listPhotograph);
    view.addVariable("tagsList", tagsList);
    view.addVariable("tagURL" , tagParam);
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