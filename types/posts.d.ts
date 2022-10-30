export interface IPostItem {
    slug: string
    title: string
    image: string
    excerpt: string
    date: string
    isFeatured?: boolean
    content: string
}

export interface IPosts {
    posts: IPostItem[];
}

export interface IPostHeader {
    title: string
    image: string
}

export type CustomRenderers = {
    [K in Content["type"]]?: (
        props: NodeToProps<Extract<Content, { type: K }>>
    ) => ReactElement;
};