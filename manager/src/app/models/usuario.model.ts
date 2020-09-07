export class Usuario{

  constructor(
    public id: any,
    public firstNames: string,
    public lastNames: string,
    public password: string,
    public email: string,
    public country: string,
    public city: string,
    public description?: string,
    public address?: string,
    public image?: string,
    public confirmed?: boolean,
    public apiToken?: string,
    public projects?: any,
    public services?: any,
    public skills?: any,
    public educations?: any,
    public experiences?: any,
    public socials?: any,
    public phones?: any
  ){}


}
