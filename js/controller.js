class Controller {

  //MÉTHODE PERMETTANT L'AFFICHAGE DE LA PAGE INDEX
   async showIndex() {
    let listPhotograph = await Model.getPhotographers();
    let tagsList = await Model.getTags();
    let tagParam  = Utils.getParameter('tag');
    let view = ViewFactory.getView("index");
    view.addVariable("listPhotograph", listPhotograph);
    view.addVariable("tagsList", tagsList);
    view.addVariable("tagURL" , tagParam);
    view.render();  
  }


  //MÉTHODE PERMETTANT L'AFFICHAGE DE LA PAGE PHOTOGRAPHE
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