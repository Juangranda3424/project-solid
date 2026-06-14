
/**
 * VIOLACIÓN AL PRINCIPIO DE ABIERTO/CERRADO (OCP)
 * 
 * En este módulo de noticias de la reserva, el servicio depende directamente
 * de la librería externa 'axios'. Si quisiéramos usar 'fetch' u otra librería,
 * tendríamos que modificar este código interno.
 */

import { AxiosAdapter } from "./axiosadapter";

export class NewsServiceAdp{

    constructor(
        private axiosadapter: AxiosAdapter
    ){}

    async getLatestNews() {
        return this.axiosadapter.get<JSON>('https://jsonplaceholder.typicode.com/posts');
    }

}

export class PhotosService {

    constructor(
        private axiosadapter: AxiosAdapter
    ){}

    async getGallery() {
        return this.axiosadapter.get<JSON>('https://jsonplaceholder.typicode.com/photos');
    }

}
