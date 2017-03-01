// export interface Movie{
//   title: String;
//   id: String;
//   year ?: String;
//   type ?: String;
// }
export class Movie{
  title: String;
  id: String;
  year ?: String;
  type ?: String;

  constructor(title: string, id: string, year ?: string, type ?: string){
    this.title = title;
    this.id = id;
    if(year) this.year = year;
    if(type) this.type = type;
  }
}
