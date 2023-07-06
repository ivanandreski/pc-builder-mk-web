import { Product } from "./Product";

interface isCompatibleReturnType {
  isCompatible: boolean;
  messages: string[];
}

export class PcBuild {
  public motherboard: Product | null;
  public processor: Product | null;
  public ram: Product | null;
  public graphicsCard: Product | null;
  public powerSupply: Product | null;
  public case: Product | null;
  public storage: Product | null;
  public modifiedAt: Date;

  constructor(data?: object | null) {
    this.motherboard = data?.motherboard;
    this.processor = data?.processor;
    this.ram = data?.ramSticks[0] || null;
    this.graphicsCard = data?.graphicsCard;
    this.powerSupply = data?.powerSupply;
    this.case = data?.case;
    this.storage = data?.storageDevices[0] || null;

    this.modifiedAt = new Date(data?.modifiedAt) || new Date();
  }

  static copyFromJson(parsedJson: object) {
    const pcBuild = new PcBuild();
    pcBuild.motherboard = parsedJson?.motherboard;
    pcBuild.processor = parsedJson?.processor;
    pcBuild.ram = parsedJson?.ram;
    pcBuild.graphicsCard = parsedJson?.graphicsCard;
    pcBuild.powerSupply = parsedJson?.powerSupply;
    pcBuild.case = parsedJson?.case;
    pcBuild.storage = parsedJson?.storage;
    pcBuild.modifiedAt = new Date(parsedJson?.modifiedAt) || new Date();

    return pcBuild;
  }

  isCompatible(): isCompatibleReturnType {
    let flag = true;
    const messages = [];
    if (this.motherboardProccesorCompatibility() == -1) {
      flag = false;
      messages.push(
        "The motherboard is incompatible with the selected processor. Make sure they use the same socket, ram type and are from the same manufacturer (AMD/Intel)"
      );
    }
    if (this.motherboardRamCompatibility() == -1) {
      flag = false;
      messages.push(
        "The motherboard is incompatible with the selected ram stick. Make sure they are the same ram type"
      );
    }

    return {
      isCompatible: flag,
      messages: messages,
    };
  }

  totalPrice(): number {
    return (
      (this.motherboard?.price || 0) +
      (this.processor?.price || 0) +
      (this.ram?.price || 0) +
      (this.graphicsCard?.price || 0) +
      (this.powerSupply?.price || 0) +
      (this.case?.price || 0) +
      (this.storage?.price || 0)
    );
  }

  allNull(): boolean {
    return (
      (this.motherboard?.price == null) &&
      (this.processor?.price == null) &&
      (this.ram?.price == null) &&
      (this.graphicsCard?.price == null) &&
      (this.powerSupply?.price == null) &&
      (this.case?.price == null) &&
      (this.storage?.price == null)
    );
  }

  private motherboardProccesorCompatibility(): number {
    if (this.motherboard == null) return 0;
    if (this.processor == null) return 0;

    if (
      this.motherboard.compatibilityTags?.processorManufacturer == null ||
      this.processor.compatibilityTags?.processorManufacturer == null
    )
      return 0;
    if (
      this.motherboard.compatibilityTags?.processorManufacturer !=
      this.processor.compatibilityTags?.processorManufacturer
    )
      return -1;

    if (
      this.motherboard.compatibilityTags?.socket == null ||
      this.processor.compatibilityTags?.socket == null
    )
      return 0;
    if (
      (this.motherboard.compatibilityTags?.socket !=
        this.processor.compatibilityTags?.socket) ==
      null
    )
      return -1;

    return 1;
  }

  private motherboardRamCompatibility(): number {
    if (this.motherboard == null) return 0;
    if (this.ram == null) return 0;

    if (
      this.motherboard.compatibilityTags?.ramType == null ||
      this.ram.compatibilityTags?.ramType == null
    )
      return 0;
    if (
      this.motherboard.compatibilityTags?.ramType !=
      this.ram.compatibilityTags?.ramType
    )
      return -1;

    return 1;
  }
}
