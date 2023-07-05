import { PcBuild } from "../Models/PcBuild";
import { Product } from "../Models/Product";
import { IPcBuildRepository } from "../Repository/IPcBuildRepository";
import { LocalPcBuildRepository } from "../Repository/LocalPcBuildRepository";
import { RemotePcBuildRepository } from "../Repository/RemotePcBuildRepository";

export class PcBuildService {
  private static instance: PcBuildService;

  public static getInstance(): PcBuildService {
    if (!PcBuildService.instance) {
      PcBuildService.instance = new PcBuildService();
    }

    return PcBuildService.instance;
  }

  private localPcBuildRepository: IPcBuildRepository =
    LocalPcBuildRepository.getInstance();
  private remotePcBuildRepository: IPcBuildRepository =
    RemotePcBuildRepository.getInstance();

  async fetchPcBuild(): Promise<PcBuild> {
    if (window.navigator.onLine && localStorage.getItem("user") != undefined) {
      try {
        return await this.remotePcBuildRepository.fetchPcBuild();
      } catch (e) {
        console.log(e);
      }
    }

    return await this.localPcBuildRepository.fetchPcBuild();
  }

  async addProduct(product: Product): Promise<PcBuild> {
    if (window.navigator.onLine && localStorage.getItem("user") != undefined) {
      return await this.remotePcBuildRepository.addProduct(product);
    }

    return await this.localPcBuildRepository.addProduct(product);
  }

  async removeProduct(product: Product): Promise<PcBuild> {
    if (window.navigator.onLine && localStorage.getItem("user") != undefined) {
      return await this.remotePcBuildRepository.removeProduct(product);
    }

    return await this.localPcBuildRepository.removeProduct(product);
  }
}
