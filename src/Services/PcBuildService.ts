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

  private localPcBuildRepository: LocalPcBuildRepository =
    LocalPcBuildRepository.getInstance();
  private remotePcBuildRepository: RemotePcBuildRepository =
    RemotePcBuildRepository.getInstance();

  async fetchPcBuild(): Promise<PcBuild> {
    if (window.navigator.onLine && localStorage.getItem("user") != undefined) {
      try {
        const remotePcBuild = await this.remotePcBuildRepository.fetchPcBuild();
        const localPcBuild = await this.localPcBuildRepository.fetchPcBuild();

        if (remotePcBuild.modifiedAt >= localPcBuild.modifiedAt || localPcBuild.allNull())
          this.localPcBuildRepository.cachePcBuild(remotePcBuild);
        else if (remotePcBuild.modifiedAt < localPcBuild.modifiedAt)
          return localPcBuild;

        return remotePcBuild;
      } catch (e) {
        return await this.localPcBuildRepository.fetchPcBuild();
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
