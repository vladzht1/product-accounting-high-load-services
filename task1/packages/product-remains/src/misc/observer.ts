export abstract class EventContext {
  private type: string;

  public constructor(type: string) {
    this.type = type;
  }

  public getType(): string {
    return this.type;
  }
}

export class EventType<Ctx extends EventContext> {
  private name: string;

  public constructor(ContextClass: new (...args: any[]) => Ctx) {
    this.name = new ContextClass().getType();
  }

  public getName(): string {
    return this.name;
  }
}

export interface ObserverAction<E extends EventContext> {
  accept(event: E): Promise<void>;
}

export class Observer {
  private static instance: Observer;

  private observers: Record<string, ObserverAction<EventContext>[]>;

  public static getInstance(): Observer {
    if (!Observer.instance) {
      Observer.instance = new Observer();
    }

    return Observer.instance;
  }

  public constructor() {
    this.observers = {};
  }

  public subscribe<E extends EventContext>(type: EventType<E>, observer: ObserverAction<E>): void {
    const typeName = type.getName();

    if (!this.observers[typeName]) {
      this.observers[typeName] = [];
    }

    this.observers[typeName].push(observer);
  }

  public unsubscribe<E extends EventContext>(type: EventType<E>, observer: ObserverAction<E>): void {
    const typeName = type.getName();

    if (!this.observers[typeName]) {
      return;
    }

    this.observers[typeName] = this.observers[typeName].filter(handler => handler != observer);
  }

  public broadcast(event: EventContext): void {
    const observers = this.observers[event.getType()] ?? [];

    for (const observer of observers) {
      observer.accept(event);
    }
  }
}
