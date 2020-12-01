export class User{ // Modela de la clase Usuario en la base de datos
	constructor (
		public id: number,
		public name: string,
		public surname: string,
		public role: string,
		public email: string,
		public password: string,
		public description: string,
		public image: string
		){}
}