// @ts-nocheck

export class StoreLocation {
    public name: string;
    public slug: string;
    public longitude: string;
    public latitude: string;

    constructor(storeLocation: object) {
        this.name = storeLocation.name;
        this.slug = storeLocation.slug;
        this.longitude = storeLocation.longitude;
        this.latitude = storeLocation.latitude;
    }
}