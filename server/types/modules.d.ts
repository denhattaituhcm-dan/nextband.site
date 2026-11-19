declare module "nodemailer" {
  namespace nodemailer {
    type Transporter = any;
    type SendMailOptions = any;
    function createTransport(options?: any, defaults?: any): Transporter;
  }
  export = nodemailer;
}

declare module "pg" {
  export class Client {
    constructor(config?: any);
    connect(): Promise<void>;
    query(queryTextOrConfig: string | any, values?: any[]): Promise<any>;
    end(): Promise<void>;
  }
  export class Pool {
    constructor(config?: any);
    connect(): Promise<any>;
    query(queryTextOrConfig: string | any, values?: any[]): Promise<any>;
    end(): Promise<void>;
  }
  const pg: { Client: typeof Client; Pool: typeof Pool; [key: string]: any };
  export default pg;
}
