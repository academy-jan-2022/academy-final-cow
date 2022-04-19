import createUser from "./createUser";

class domainService {
  createUser = createUser;
}

const DomainService = new domainService();
export default DomainService;