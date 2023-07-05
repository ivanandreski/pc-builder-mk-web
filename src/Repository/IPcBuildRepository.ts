import { PcBuild } from "../Models/PcBuild";
import { Product } from "../Models/Product";

export interface IPcBuildRepository {
  fetchPcBuild: () => Promise<PcBuild>;
  addProduct: (category: string, product: Product) => Promise<PcBuild>;
  removeProduct: (category: string, product: Product) => Promise<PcBuild>;
}
