// controllers/itemController.js

class ItemController {
  async create(request) {
    const documentBody = request.input.body;
    const response = await this.context.accessors.sdk.document.create(
      "testindex",
      "testcollection",
      documentBody
    );
    return response;
  }
  async getAllItems(request) {
    const searchResult = await this.context.accessors.sdk.document.search(
      "testindex",
      "testcollection"
    );
    return searchResult.hits.map((doc) => doc._source);
  }
  async getOneItem(request) {
    const itemId = request.input.resource._id;
    const item = await this.context.accessors.sdk.document.get(
      "testindex",
      "collection",
      itemId
    );
    return item._source;
  }
  async updateItem(request) {
    const itemId = request.input.resource._id;
    const content = request.input.body;
    await this.context.accessors.sdk.document.update(
      "testindex",
      "testcollection",
      itemId,
      content
    );
    return { result: "updated" };
  }
  async deleteItem(request) {
    const itemId = request.input.resource._id;
    await this.context.accessors.sdk.document.delete(
      "testindex",
      "testcollection",
      itemId
    );
    return { result: "deleted" };
  }
}

module.exports = ItemController;
