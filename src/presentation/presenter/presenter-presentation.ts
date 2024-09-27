export class Presenter {
  static execute(data: any, acceptHeader: string = 'application/json') {
    switch (acceptHeader) {
      case 'application/json':
        return data;
    }
  }
}
