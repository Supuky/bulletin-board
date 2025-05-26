export class DiContainer<C extends { [key: string]: unknown }> {
  private containers: C;

  constructor(containers: C) {
    this.containers = containers;
  }

  public resolve(key: keyof C) {
    return this.containers[key];
  }
}
