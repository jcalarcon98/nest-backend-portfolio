export interface ISendEmailStrategy{

  getData() : any;

  getTemplate(data: any);

  getSubject() : string;

} 