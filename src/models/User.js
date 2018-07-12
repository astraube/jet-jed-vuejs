/**
 * Em qualquer parte do codigo (JS) que for preciso utilizar os dados de usuario, pode ser utilizada essa model
 */
class User {

    constructor(data=null) {
        this.access_token = 'ds5f4sdf54sdf54s6f4sdf1sd32f1sdf2sdf';
        this.token_type = 'bearer';
        this.expires_in = '86399';
        this.appName = 'jetjedi';
        this.username = 'a.straube.m@gmail.com';
        this.role = 'User';
        this.firstName = 'Andre';
        this.lastName = 'Straube';
        this.fullName = 'Andre Straube';
        this.regId = 'astraube';
        this.userId = '007';
        this.photoUrl = 'https://lh5.googleusercontent.com/-pF4I3fmiCdE/AAAAAAAAAAI/AAAAAAAAAHA/RxYooWiugb8/s96-c/photo.jpg?sz=80';
    }
    
}
export default User;
