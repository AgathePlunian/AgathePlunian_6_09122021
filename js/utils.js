class Utils {
  static getParameter(parameterName) {
    let currentUrl = window.location.search;
    let urlParams = new URLSearchParams (currentUrl);
    let parameter = urlParams.get(parameterName);
    return parameter;
  }
}