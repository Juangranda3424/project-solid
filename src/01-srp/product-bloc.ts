// Interfaz para producto
interface Product {
    id: number;
    name: string;
}

// Interfaz para email
interface Email {
    email: string;
    message: string;
}

// Reposabilidad Unica: persistencia de Datos
class ProductRepository {

    private products: Product[] = [];

    // Carga de productos
    load(id: number) {
        console.log(`Cargando producto con ID: ${id} desde el inventario del parque...`);
        // Simulación de carga
        return this.products.find(p => p.id === id);
    }

    // Guardado de productos 
    save(product: Product) {
        console.log(`Guardando el producto ${product.name} en la base de datos de la reserva...`);
        this.products.push(product);
    }

}

// Reposabilidad Unica: envio de correos
export class EmailService {
    public send(data: Email){
        console.log(`Enviando email a ${data.email}: ${data.message}`);
    }
}



export class ProductBloc {
    // Recibimos las dependencias necesarias
    constructor(
        private emailservice: EmailService,
        private productrepository: ProductRepository
    ){}
    // Ahora solo coordina la carga usando el repositorio
    loadProduct(id: number) {
        return this.productrepository.load(id);
    }
    // Coordina el guardado usando el repositorio
    saveProduct(product: Product) {
        return this.productrepository.save(product);
    }
    // Delegamos la responsabilidad por completo al servicio de correo asi como su envio de informacion
    notifyCustomer(data: any) {
        return this.emailservice.send(data);
    }

}
