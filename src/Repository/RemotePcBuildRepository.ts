import { PcBuild } from "../Models/PcBuild";
import { Product } from "../Models/Product";
import { IPcBuildRepository } from "./IPcBuildRepository";

import axios from "../axios/axios";

export class RemotePcBuildRepository implements IPcBuildRepository {
  async fetchPcBuild(): Promise<PcBuild> {
    const { data } = await axios.get("customPcBuild");

    return new PcBuild(data);
  }
  // TODO: add bearer token and test if it works
  async addProduct(category: string, product: Product): Promise<PcBuild> {
    const { data } = await axios.post("customPcBuild/addProduct", {
      productSlug: product.slug,
    });

    return new PcBuild(data);
  }

  async removeProduct(category: string, product: Product): Promise<PcBuild> {
    const { data } = await axios.post("customPcBuild/removeProduct", {
      productSlug: product.slug,
    });

    return new PcBuild(data);
  }
}
