export interface Task {
    id: number,
    question: string,
    answer: string,
}

export interface UploadBlog{
    rid: string,
    image: File,
    content: string,
    topic: string,
}