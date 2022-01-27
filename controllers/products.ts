// deno-lint-ignore-file no-explicit-any
import {Product} from '../typesinterface.ts';

let products: Product[]=[
    {
        id:"1",
        name:"kawa",
        description:"zbożowa",
        price:9.99
    },
    {
        id:"2",
        name:"papierowsy",
        description:"bez filtra",
        price:19.99
    },{
        id:"3",
        name:"alkohol",
        description:"tania wódka",
        price:29.99
    }
];

//@ GET /api/products

export const getProducts=({response}:{response:any})=>{
    response.body={
        success:true,
        data:products
    }
}
//@ GET /api/product/:id
export const getSingleProduct=({params,response}:{params:{id:string},response:any})=>{
    const product:Product|undefined=products.find(p=>p.id===params.id);
    if(product){
        response.status=200;
        response.body={
            success:true,
            data:product
        }
    }else{
        response.status=404;
        response.body={
            success:false,
            msg: 'No product found'
        }
    }
    
}

//@ POST /api/product/
export const addProduct=async ({request,response}:{request:any,response:any})=>{
    const body = await request.body();
    if(!request.hasBody){
        response.status=400;
        response.body={
            succes:false,
            msg: 'No data'
        }

    }else{
        const product: Product = await body.value;
        product.id=globalThis.crypto.randomUUID();
        products.push(product);
        response.status=201
        response.body={
            succes:true,
            data:product
        }

    }
}

//@ PATCH /api/product/:id
export const updateProduct= async ({params,request,response}:{params:{id:string},request:any,response:any})=>{
    const product:Product|undefined=products.find(p=>p.id===params.id);
    if(product){
        const body= await request.body();
        const updateData:{name?:string;description?:string;price?:number}=await body.value;
        products=products.map(p=>p.id===params.id?{...p,...updateData}:p);

        response.status=200;
        response.body={
            succes:true,
            data:products
        }
    }
    else{
        response.status=404;
        response.body={
            success:false,
            msg: 'No product found'
        }
    }
}

//@ DELETE /api/product/:id
export const deleteProduct=({params,response}:{params:{id:string},response:any})=>{
    products=products.filter(p=>p.id!==params.id)
    response.body={
        success:"true",
        msg:"Product removed"
    }
}