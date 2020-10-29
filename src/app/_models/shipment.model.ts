export interface booking_category {
    booking_category?: string;
}
export interface description_details {
    country?: string;
    estimated_weight?: string;
    package_value?: string;
    description?: string;
}

export interface pickup_details {
    pickup_name?: string;
    pickup_phone?: string;
    pickup_address?: string;
}

export interface delivery_details {
    delivery_home?: boolean;
    delivery_name?: string;
    delivery_phone?: string;
    delivery_location?: string;
    delivery_address?: string;
}

export interface hold_instruction {
    hold_shipping?: boolean;
    hold_date?: string;
    hold_comment?: string;
}


