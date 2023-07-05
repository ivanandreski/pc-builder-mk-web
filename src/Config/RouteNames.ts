export default class RouteNames {
  static Home = "/";

  // Auth
  static Login = "/login";
  static Register = "/register";

  static Products = "/products";
  static ProductDetails = "/product/details";
  static PcBuild = "/pc-build";

  static routeUrlToTitle(route: string): string {
    if (route === RouteNames.Login) return "Login";
    if (route === RouteNames.Register) return "Register";
    if (route === RouteNames.Products) return "Products";
    if (route === RouteNames.ProductDetails) return "Product Details";
    if (route === RouteNames.PcBuild) return "PC Builder";

    return "PC Builder";
  }
}
