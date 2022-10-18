export class CreatePostDto {
    title: string;
    description: string;
    img: string;
    cat: string;
}

export class QueryPostDto {
    cat?: string = '';
}