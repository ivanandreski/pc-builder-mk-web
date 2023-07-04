export class ProductCompatibilityTags {
    public processorCodeName: string | null;
    public socket: string | null;
    public chipset: string | null;
    public processorManufacturer: string | null;
    public storageType: string | null;
    public formFactor: string | null;
    public ramType: string | null;
    public ramSpeed: string | null;
    public numOfRamSlots: string | null;
    public numOfSataPorts: string | null;
    public numOf25InchBays: string | null;
    public numOf35InchBays: string | null;
    public numOfM2Slots: string | null;

    constructor(data: object) {
        this.processorCodeName = data.processorCodeName;
        this.socket = data.socket;
        this.chipset = data.chipset;
        this.processorManufacturer = data.processorManufacturer;
        this.storageType = data.storageType;
        this.formFactor = data.formFactor;
        this.ramType = data.ramType;
        this.ramSpeed = data.ramSpeed;
        this.numOfRamSlots = data.numOfRamSlots;
        this.numOfSataPorts = data.numOfSataPorts;
        this.numOf25InchBays = data.numOf25InchBays;
        this.numOf35InchBays = data.numOf35InchBays;
        this.numOfM2Slots = data.numOfM2Slots;
    }
}