import UsersDto from "../dao/DTOs/users.tdo.js";

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (user) => await this.dao.create(user);

  login = async (user) => (user = new UsersDto(user));

  findById = async (id) => await this.dao.findById(id);

  findByEmail = async (email) => await this.dao.findByEmail(email);

  update = async (email, user) => await this.dao.update(email, user);

  delete = async (id) => await this.dao.delete(id);
}
