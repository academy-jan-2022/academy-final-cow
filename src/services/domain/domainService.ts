import createTeam from "./createTeam";
import createUser from "./createUser";

class domainService {
    createTeam = createTeam;
    createUser = createUser;
}

const DomainService = new domainService();
export default DomainService;