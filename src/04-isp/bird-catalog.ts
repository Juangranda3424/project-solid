
/**
 * VIOLACIÓN AL PRINCIPIO DE SEGREGACIÓN DE INTERFAZ (ISP)
 * 
 * El catálogo de fauna define una interfaz "gorda" que obliga a las aves 
 * a implementar métodos que no les corresponden según su naturaleza.
 */

interface Eat {
    eat(): void;
}

interface Fly {
    fly(): void;
}

interface Swim {
    swim(): void;
}

export class Toucan implements Eat, Fly {
    public eat() { console.log('El Tucán está comiendo frutas.'); }
    public fly() { console.log('El Tucán vuela sobre la selva.'); }
}

export class Hummingbird implements Eat, Fly {
    public eat() { console.log('El Colibrí busca néctar.'); }
    public fly() { console.log('El Colibrí aletea rápidamente.'); }
}

export class Ostrich implements Eat, Swim {
    public eat() { console.log('El Avestruz come hierbas.'); }
    public swim() { console.log('El Avestruz puede nadar si es necesario.'); }
}
