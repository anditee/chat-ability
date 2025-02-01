declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.png" {
    const image: {
        blurDataURL: string,
        blurHeight: number,
        blurWidth: number,
        height: number,
        src: string,
        width: number
    };
    export default image;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}