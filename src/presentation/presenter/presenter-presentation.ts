export class Presenter {
  static execute(data: any, acceptHeader?: string) {
    switch (acceptHeader) {
      case 'application/json':
        return data;
      default:
        return data;
    }
  }
}
