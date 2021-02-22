const { QueryBuilder } = require('objection');

class ConditionalBuilder extends QueryBuilder {
  conditionalPage(req) {
    if (req.query.offset && req.query.limit) {
      return this.page(
        parseInt(req.query.offset, 10),
        parseInt(req.query.limit, 10)
      );
    }
    return this;
  }

  conditionalSort(req) {
    if (req.query.sort_by && req.query.order_by) {
      return this.orderBy(req.query.sort_by, req.query.order_by)
    }
    return this;
  }
}

module.exports = ConditionalBuilder;
