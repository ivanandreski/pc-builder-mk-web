import { PcBuild } from "../Models/PcBuild";
import { Product } from "../Models/Product";
import { User } from "../Models/User";
import { IPcBuildRepository } from "./IPcBuildRepository";

import axios from "../axios/axios";

export class RemotePcBuildRepository implements IPcBuildRepository {
  private static instance: RemotePcBuildRepository;

  public static getInstance(): RemotePcBuildRepository {
    if (!RemotePcBuildRepository.instance) {
      RemotePcBuildRepository.instance = new RemotePcBuildRepository();
    }

    return RemotePcBuildRepository.instance;
  }

  async fetchPcBuild(): Promise<PcBuild> {
    const token = (JSON.parse(localStorage.getItem("user")) as User).token;

    const { data } = await axios.get("customPcBuild", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return new PcBuild(data);
  }

  async addProduct(product: Product): Promise<PcBuild> {
    const token = (JSON.parse(localStorage.getItem("user")) as User).token;

    const { data } = await axios.put(
      "customPcBuild/addProduct",
      {
        productSlug: product.slug,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return new PcBuild(data);
  }

  async removeProduct(product: Product): Promise<PcBuild> {
    const token = (JSON.parse(localStorage.getItem("user")) as User).token;

    const { data } = await axios.put(
      "customPcBuild/removeProduct",
      {
        productSlug: product.slug,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return new PcBuild(data);
  }
}
