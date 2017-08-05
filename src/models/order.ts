import { Location } from './Location';
export class Order {
  location : Location;
  content : string;
    name: string;
    uid : string;

    bid : Bid;

    hopePrice: number;
}

export class Bid {
  price: number;
  name : string;
  uid : string;
}