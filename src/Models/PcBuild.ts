import { Product } from "./Product";

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
    this.ram = data?.ram[0] || null;
    this.graphicsCard = data?.graphicsCard;
    this.powerSupply = data?.powerSupply;
    this.case = data?.case;
    this.storage = data?.storage[0] || null;

    this.modifiedAt = data?.modifiedAt || new Date();
  }

  isCompatible(): boolean {
    return true;
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
}
