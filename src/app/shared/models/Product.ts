import { Category } from "./Category";

export class Product{
    id!:number;
    name!:string;
    price!:number;
    description:string;
    image!:string;
    category:Category;
    amount:number;
}