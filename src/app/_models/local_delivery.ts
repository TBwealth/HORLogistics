export interface local_deliveryModel{
    delivery_date?:string,
    delivery_name?:string,
    delivery_address?:string,
    delivery_phone?:string,
    delivery_landmark?:string,
    delivery_busstop?:string
}

export interface pickup_detailsModel {
    booking_category?:string,
    pickup_name?:string,
    pickup_address?:string,
    pickup_phone?:string,
    pickup_landmark?:string,
    pickup_busstop?:string
}

export interface package_detailsModel {
    package_size?:string,
    package_insurance?:string
}

export interface LocaldeliveryButton {
    pickupbtn?:boolean,
    deliverybtn?:boolean,
    packagebtn?:boolean
}