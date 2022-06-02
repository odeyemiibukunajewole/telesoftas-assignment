
class rules {
  getMinimumQuality() {
    return 0;
  }

  getMaximumQuality() {
    return 50;
  }

  appliesTo(item) {
    return true;
  }

  setQuality(item, value) {
    if (value < this.getMaximumQuality() && value > this.getMinimumQuality()) {
      item.quality = value;
    } else if (value >= this.getMaximumQuality()) {
      item.quality = this.getMaximumQuality();
    } else if (value <= this.getMinimumQuality()) {
      item.quality = this.getMinimumQuality();
    }
  }

  updateItem(item) {
    const qualityDecrement = item.sellIn < 1 ? 2 : 1;
    this.setQuality(item, item.quality - qualityDecrement);
    item.sellIn -= 1;
  }
}

class agedBrieUpdaterules extends rules {
  appliesTo(item) {
    return item.name === 'Aged Brie';
  }

  updateItem(item) {
    item.sellIn -= 1;
    const qualityIncrement = (item.sellIn < 0) ? 2 : 1;
    super.setQuality(item, item.quality + qualityIncrement);
  }
}

class backstagePassUpdateRules extends rules {
  appliesTo(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  updateItem(item) {
    let qualityIncrement = 1;
    if (item.sellIn < 1) {
      qualityIncrement = -item.quality;
    } else if (item.sellIn < 6) {
      qualityIncrement = 3;
    } else if (item.sellIn < 11) {
      qualityIncrement = 2;
    }

    super.setQuality(item, item.quality + qualityIncrement);
    item.sellIn -= 1;
  }
}

class sulfurasUpdateRules extends rules {
  appliesTo(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  updateItem(item) {
    // we never update Sulfuras
  }
}


module.exports = {
  rules,
  sulfurasUpdateRules,
  backstagePassUpdateRules,
  agedBrieUpdaterules
};
