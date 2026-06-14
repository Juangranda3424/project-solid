export abstract class Vehicle {
    constructor(public model: string) {}
    abstract getDetails(): string;
}

export class Tesla extends Vehicle{ 
    getDetails(): string {
        return `Tesla Model: ${this.model} - Carga eléctrica al 100%`;
    }
}

export class Audi extends Vehicle {
    getDetails(): string {
        return `Audi Model: ${this.model} - Tracción Quattro activada`;
    }
}

export class Toyota extends Vehicle {
    getDetails(): string {
        return `Toyota Model: ${this.model} - Motor híbrido listo`;
    }
}

export class Honda extends Vehicle {
    getDetails(): string {
        return `Honda Model: ${this.model} - VTEC activado`;
    }
}

export class Ford extends Vehicle {
    getDetails(): string {
        return `Ford Model: ${this.model} - Built Tough`;
    }
}

export class VehicleManager {

    // LSP: Cualquier subclase de Vehicle (Tesla, Audi, etc.) puede sustituir a la clase padre aquí sin romper nada.
    // OCP: Está cerrado a modificación. Si agregas 20 marcas más, este código NO cambia.
    static printVehicleDetails(vehicles: Vehicle[]) {
        vehicles.forEach(vehicle => {
            console.log(vehicle.getDetails());
        });
    }

}

