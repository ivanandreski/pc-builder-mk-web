// @ts-nocheck

import { ProductCompatibilityTags } from "./ProductCompatibilityTags";
import { StoreLocation } from "./StoreLocation";

export class Product {
  public name: string;
  public slug: string;
  public description: string;
  public price: number;
  public originalUrl: string;
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
    this.description = data.description;
    this.price = data.price;
    this.originalUrl = data.originalUrl;
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

  getImage(): string {
    if (this.storeName === "Anhoch") {
      return this.imageUrl.split(";")[0];
    }

    return this.imageUrl;
  }
}
