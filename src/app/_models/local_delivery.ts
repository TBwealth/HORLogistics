export interface local_deliveryModel{
    delivery_date?:string,
    delivery_name?:string,
    delivery_address?:string,
    delivery_phone?:string,
    delivery_landmark?:string,
    delivery_busstop?:number,
    categioryId?: number
}

export interface pickup_detailsModel {
    booking_category?:number,
    pickup_name?:string,
    pickup_address?:string,
    pickup_phone?:string,
    pickup_landmark?:string,
    pickup_busstop?:number
}

export interface package_detailsModel {
    package_size?:number,
    package_insurance?:boolean,
    package_weight?: number,
    package_description?: string
}

export interface LocaldeliveryButton {
    pickupbtn?:boolean,
    deliverybtn?:boolean,
    packagebtn?:boolean
}