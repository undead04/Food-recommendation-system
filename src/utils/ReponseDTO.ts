export class RepositoryDTO<T> {
    status: number;
    message: unknown;
    data: T;
  
    constructor(status: number, message: unknown, data: T) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  
    public static WithData<T>(status: number,message:string, data: T): RepositoryDTO<T> {
      return new RepositoryDTO<T>(status,message, data);
    }
    public static Success<T>(message:unknown):RepositoryDTO<T>{
        return new RepositoryDTO<T>(200,message,null)
    }
    public static Error<T>(status:number,message:unknown):RepositoryDTO<T>{
        return new RepositoryDTO<T>(status,message,null)
    }
  }
  