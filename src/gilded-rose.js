const { rules, sulfurasUpdateRules, backstagePassUpdateRules, agedBrieUpdaterules } = require("./helpers/base-rule")


class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class Shop {
  constructor(items = []) {
    this.items = items;
    this.updateStrategies = [
      new agedBrieUpdaterules(),
      new backstagePassUpdateRules(),
      new sulfurasUpdateRules(),
      new rules(),
    ]
  }

  updateQuality() {
    for (let item of this.items) {
      const strategy = this.updateStrategies.find((strategy) => strategy.appliesTo(item));
      strategy.updateItem(item);
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
