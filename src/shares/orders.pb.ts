/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "orders";

/** Get Shares of a company */
export interface Share {
  userId: string;
  companyId: string;
  askPrice: number;
  pendingShares: string[];
}

export interface SellShare {
  shareId: string;
  qty: number;
  askPrice: number;
}

export interface GetShareRequest {
  companyId: string;
}

export interface GetShareResponse {
  status: number;
  shares: Share[];
  error: string[];
}

/** SellShare */
export interface SellShareRequest {
  userId: string;
  share: SellShare | undefined;
}

export interface SellShareResponse {
  status: string;
  message: string;
}

/** BuyShare */
export interface BuyShareRequest {
  userId: string;
  shareId: string;
  qty: number;
}

export interface BuyShareResponse {
  status: string;
  message: string;
}

/** GetBalance */
export interface GetBalanceRequest {
  userId: string;
}

export interface GetBalanceResponse {
  status: number;
  error: string[];
  walletAmount: number;
}

/** UpdateBalance */
export interface UpdateBalanceRequest {
  userId: string;
  walletAmount: number;
  serviceName: string;
}

export interface UpdateBalanceResponse {
  status: number;
  error: string[];
}

export const ORDERS_PACKAGE_NAME = "orders";

export interface OrdersServiceClient {
  getShare(request: GetShareRequest): Observable<GetShareResponse>;

  sellShare(request: SellShareRequest): Observable<SellShareResponse>;

  buyShare(request: BuyShareRequest): Observable<BuyShareResponse>;

  getBalance(request: GetBalanceRequest): Observable<GetBalanceResponse>;

  updateBalance(request: UpdateBalanceRequest): Observable<UpdateBalanceResponse>;
}

export interface OrdersServiceController {
  getShare(request: GetShareRequest): Promise<GetShareResponse> | Observable<GetShareResponse> | GetShareResponse;

  sellShare(request: SellShareRequest): Promise<SellShareResponse> | Observable<SellShareResponse> | SellShareResponse;

  buyShare(request: BuyShareRequest): Promise<BuyShareResponse> | Observable<BuyShareResponse> | BuyShareResponse;

  getBalance(
    request: GetBalanceRequest,
  ): Promise<GetBalanceResponse> | Observable<GetBalanceResponse> | GetBalanceResponse;

  updateBalance(
    request: UpdateBalanceRequest,
  ): Promise<UpdateBalanceResponse> | Observable<UpdateBalanceResponse> | UpdateBalanceResponse;
}

export function OrdersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getShare", "sellShare", "buyShare", "getBalance", "updateBalance"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDERS_SERVICE_NAME = "OrdersService";
