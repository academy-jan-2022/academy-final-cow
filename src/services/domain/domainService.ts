import createUser from "./createUser";

class DomainService {
  createUser = createUser;
}

const domainService = new DomainService();
export default domainService;
