class Jedi {

    constructor(data=null) {
        this.id = data['id'];
        this.name = data['name']; // nome
        this.status = data['status']; // status
        this.planet = data['planet']; // planeta
        this.master = data['master']; // mestre
        this.created_at = data['created_at'];
        this.updated_at = data['updated_at'];
    }

}
export default Jedi;
