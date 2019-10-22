export interface Listing {
    id: number;
    title: string;
    address: string;
    city_id: number;
    category_id: number;
    category_name?: string;
    phone?: Array<string>;
    weight?: number;
    image?: string;
    city?: string;
}
