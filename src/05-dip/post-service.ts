import { DataStorage } from "./datastorage.interface";

export class PostService {

    private posts: any[] = [];

    constructor(private datastorage: DataStorage){}

    async getPosts() {
        this.posts = await this.datastorage.getFakePosts();
        return this.posts;
    }

}
