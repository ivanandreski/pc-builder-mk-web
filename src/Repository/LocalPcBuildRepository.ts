import { PcBuild } from "../Models/PcBuild";
import { Product } from "../Models/Product";
import { IPcBuildRepository } from "./IPcBuildRepository";

export class LocalPcBuildRepository implements IPcBuildRepository {
  async fetchPcBuild(): Promise<PcBuild> {
    const cacheResult = localStorage.getItem("pc-build");
    return cacheResult ? JSON.parse(cacheResult) : new PcBuild();
  }

  async addProduct(category: string, product: Product): Promise<PcBuild> {
    const pcBuild = await this.fetchPcBuild();
    switch (category) {
      case "mb":
        pcBuild.motherboard = product;
        break;
      case "cpu":
        pcBuild.processor = product;
        break;
      case "ram":
        pcBuild.ram = product;
        break;
      case "gpu":
        pcBuild.graphicsCard = product;
        break;
      case "psu":
        pcBuild.powerSupply = product;
        break;
      case "case":
        pcBuild.case = product;
        break;
      case "storage":
        pcBuild.storage = product;
        break;
    }

    return pcBuild;
  }

  async removeProduct(category: string, product: Product): Promise<PcBuild> {
    const pcBuild = await this.fetchPcBuild();
    switch (category) {
      case "mb":
        pcBuild.motherboard = null;
        break;
      case "cpu":
        pcBuild.processor = null;
        break;
      case "ram":
        pcBuild.ram = null;
        break;
      case "gpu":
        pcBuild.graphicsCard = null;
        break;
      case "psu":
        pcBuild.powerSupply = null;
        break;
      case "case":
        pcBuild.case = null;
        break;
      case "storage":
        pcBuild.storage = null;
        break;
    }

    return pcBuild;
  }

  cachePcBuild(pcBuild: PcBuild): void {
    localStorage.setItem("pc-build", JSON.stringify(pcBuild));
  }
}
