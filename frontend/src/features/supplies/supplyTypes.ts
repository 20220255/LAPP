

export type SupplyType = {
    _id?: string | undefined | '';
    supplyName: string;
    type: string;
    count: number;
    countAdded?: number;
    countDeducted?: number;
    customerName?: string;
    comment?: string;
    userId?: {
        _id?: string;
        firstName?: string;
    };
    firstName?: string;
    dateEntered?: string;
    createdAt: string;
    image?: string;
}

export type SupplySliceType = {
    supply: SupplyType;
    supplyList: SupplyType[];
    isErrorSupply: boolean;
    isSuccessSupply: boolean;
    isLoadingSupply: boolean;
    messageSupply: string;
}