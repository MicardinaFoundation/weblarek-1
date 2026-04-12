import { IApi } from "../base/Api";
import { IProductData, IApiResponse, IOrderData} from "../../types";

export class ProductApi{
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
       this._baseApi = baseApi;
    }
    getProduct(): Promise<IProductData> {
        return this._baseApi.get<IProductData>('/product/')
        .then((data: IProductData) => data);
    }

    postOrder(orderData: IOrderData): Promise<IApiResponse> {
        return this._baseApi.post<IApiResponse>('/order/', orderData)
        .then((data:IApiResponse) => data);
    }

}