import { PcBuild } from "../Models/PcBuild";
import { Product } from "../Models/Product";

export interface IPcBuildRepository {
  fetchPcBuild: (token?: string | null) => Promise<PcBuild>;
  addProduct: (
    category: string,
    product: Product,
    token?: string | null
  ) => Promise<PcBuild>;
  removeProduct: (
    category: string,
    product: Product,
    token?: string | null
  ) => Promise<PcBuild>;
}
