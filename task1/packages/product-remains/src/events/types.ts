import { EventType } from "@/misc/observer";
import { AddProductToShopEventContext, DecreaseRemainsEventContext, IncreaseRemainsEventContext } from "./contexts";

export const ADD_PRODUCT_TO_SHOP_EVENT: EventType<AddProductToShopEventContext> = new EventType(AddProductToShopEventContext);
export const INCREASE_PRODUCT_REMAINS_EVENT: EventType<IncreaseRemainsEventContext> = new EventType(IncreaseRemainsEventContext);
export const DECREASE_PRODUCT_REMAINS_EVENT: EventType<DecreaseRemainsEventContext> = new EventType(DecreaseRemainsEventContext);
