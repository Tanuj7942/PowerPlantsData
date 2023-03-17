// import { dataSource } from "../config/orm.config";
import { UserRepository } from "../repositories/app.repository";

class UserService {
    private studyRepo;
    constructor() {
        this.studyRepo = new UserRepository();
    }

    public getData = async () => {
        return await this.studyRepo.getData();
    };

}

export default UserService;