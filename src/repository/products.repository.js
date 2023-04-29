export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProductsPaginate = async (limit, page, query, sort) =>
    this.dao.getProductsPaginate(limit, page, query, sort);

  getAll = async () => this.dao.getAll();

  getProduct = async (pid) => this.dao.getProduct(pid);

  getProductByCode = async (code) => this.dao.getProductByCode(code);

  addProduct = async (product) => this.dao.addProduct(product);

  updateProduct = async (pid, product) => this.dao.updateProduct(pid, product);

  deleteProduct = async (pid) => this.dao.deleteProduct(pid);
}
