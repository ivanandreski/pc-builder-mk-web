import { ProductCompatibilityTags } from "./ProductCompatibilityTags";
import { StoreLocation } from "./StoreLocation";

export class Product {
  public name: string;
  public slug: string;
  public price: number;
  public imageUrl: string;
  public categorySlug: string;
  public storeName: string;
  public storeImageUrl: string;
  public storeLocations: StoreLocation[];
  public isAvailable: boolean;
  public compatibilityTags: ProductCompatibilityTags | null;

  constructor(data: object) {
    this.name = data.name;
    this.slug = data.slug;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
    this.categorySlug = data.categorySlug;
    this.storeName = data.storeName;
    this.storeImageUrl = data.storeImageUrl;
    this.isAvailable = data.isAvailable;

    this.compatibilityTags = data.compatibilityTags
      ? new ProductCompatibilityTags(data.compatibilityTags)
      : null;
    this.storeLocations = data.storeLocations.map(
      (storeLocation: object) => new StoreLocation(storeLocation)
    );
  }
}
