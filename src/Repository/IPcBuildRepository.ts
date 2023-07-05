import { PcBuild } from "../Models/PcBuild";
import { Product } from "../Models/Product";

export interface IPcBuildRepository {
  fetchPcBuild: () => Promise<PcBuild>;
  addProduct: (product: Product) => Promise<PcBuild>;
  removeProduct: (product: Product) => Promise<PcBuild>;
}
