import { DataStorage } from "../05-dip/datastorage.interface";
/**
 * DATA PROVIDER ACUPLADO
 */

export class LocalDatabaseService implements DataStorage {

    async getFakePosts(): Promise<any[]> {
        return [
            { id: 1, title: 'Avistamiento de Jaguar', body: 'Se reportó un jaguar cerca del río.' },
            { id: 2, title: 'Nuevas Orquídeas', body: 'Han florecido las especies raras en el jardín botánico.' }
        ];
    }

}

export class JsonDatabaseService {
    async getFakePosts(): Promise<any[]> {
        return [
            { id: 1, title: 'JSON Post 1', body: 'Contenido desde JSON' }
        ];
    }
}
