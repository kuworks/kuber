import { Location } from './Location';
export class Order {
  location : Location;
  content : string;
    name: string;
    uid : string;

    bid : Bid;
}

export class Bid {
  price: number;
  name : string;
  uid : string;
}