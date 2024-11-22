import { getChannel, queues } from "@/config/rabbitmq";
import { EventContext, ObserverAction } from "@/misc/observer";
import { AddProductToShopEventContext, DecreaseRemainsEventContext, IncreaseRemainsEventContext } from "../contexts";

/**
 * Base class for sending events via RabbitMQ to the `queues.productEvents` queue
 */
export abstract class BaseSendEventAction<E extends EventContext> implements ObserverAction<E> {
  public async accept(event: E): Promise<void> {
    const context = this.createContextObject(event);
    const channel = await getChannel();

    await channel.assertQueue(queues.productEvents);

    channel.sendToQueue(queues.productEvents, Buffer.from(JSON.stringify(context)));
    console.log("Sent event:", context)
  }

  protected abstract createContextObject(event: E): object;
}

export class SendAddProductToShopEventAction
  extends BaseSendEventAction<AddProductToShopEventContext>
  implements ObserverAction<AddProductToShopEventContext> {
  protected override createContextObject(event: AddProductToShopEventContext): object {
    return {
      type: event.getType(),
      productId: event.productId,
      plu: event.productPLU,
      shopId: event.shopId,
      productAmount: event.productAmount
    };
  }
}

export class IncreaseRemainsEventAction
  extends BaseSendEventAction<IncreaseRemainsEventContext>
  implements ObserverAction<IncreaseRemainsEventContext> {
  protected override createContextObject(event: IncreaseRemainsEventContext): object {
    return {
      type: event.getType(),
      productId: event.productId,
      plu: event.productPLU,
      shopId: event.shopId,
      increasedBy: event.productOffset,
      currentProductAmount: event.productAmount,
    };
  }
}

export class DecreaseRemainsEventAction
  extends BaseSendEventAction<DecreaseRemainsEventContext>
  implements ObserverAction<DecreaseRemainsEventContext> {
  protected override createContextObject(event: DecreaseRemainsEventContext): object {
    return {
      type: event.getType(),
      productId: event.productId,
      plu: event.productPLU,
      shopId: event.shopId,
      decreasedBy: event.productOffset,
      currentProductAmount: event.productAmount,
    };
  }
}
