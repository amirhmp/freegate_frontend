import { ZodType } from "zod";

export default class LocalStorageService<T> {
  private storageKey: string;
  private loadedJsonData: string | null = null;
  private validator: ZodType | undefined = undefined;

  constructor(storage_key: string, validator?: ZodType) {
    this.storageKey = storage_key;
    this.validator = validator;
    this.load();
  }

  save(data: T, comparePrevBeforeSave?: boolean) {
    const json = JSON.stringify(data);
    if (comparePrevBeforeSave && json === this.loadedJsonData) return;
    this.loadedJsonData = json;
    localStorage.setItem(this.storageKey, json);
  }

  load(defaultValue?: T): T | undefined {
    try {
      const json = localStorage.getItem(this.storageKey);
      this.loadedJsonData = json;
      if (!json) {
        if (defaultValue) return defaultValue;
        return undefined;
      }
      const data = JSON.parse(json);
      if (!this.validator) return data;
      return this.validator.parse(data) as T;
    } catch (ex: any) {
      this.loadedJsonData = null;
      this.remove();
      return undefined;
    }
  }

  remove() {
    localStorage.removeItem(this.storageKey);
  }
}
