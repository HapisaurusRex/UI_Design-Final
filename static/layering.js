const layeringData = {
  base: [
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/KN1270422_SURPLUSOLIVE_FEB_1588_R_1200x.jpg?v=1744728887",
      alt: "Base layer: Olive tank top"
    },
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/KN2587991_OLIVE_CF_1106_R_1200x.jpg?v=1715710189",
      alt: "Base layer: Olive tee shirt"
    },
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/KN8267991_SNYDER-OLIVE_CF_0053_May-08-2024_R_1_1200x.jpg?v=1721244249",
      alt: "Base layer: Olive long sleeve tee shirt"
    }
  ],
  mid: [
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/KN3720550_BROWN_OCT_0026_R_1200x.jpg?v=1727384016",
      alt: "Mid layer: Brown Hoodie"
    },
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/KN3190469_STONE_OCT_3875_R_1200x.jpg?v=1738342456",
      alt: "Mid layer: Beige Fleece Jacket"
    },
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/OU3240750_KHAKI_OCT_2772_R_1200x.jpg?v=1743443329",
      alt: "Mid layer: Black Down Vest"
    }
  ],
  outer: [
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/CFBLOU1208MRUT4106-6656_05_1200x.jpg?v=1740690829",
      alt: "Outer layer: Camo Parka"
    },
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/OU3083047_OLIVE_JULY_1144_R_1_1200x.jpg?v=1744909318",
      alt: "Outer layer: Olive Trench Coat"
    },
    {
      src: "https://www.toddsnyder.com/cdn/shop/files/italian-burnished-leather-dylan-jacket-in-dark-browntodd-snyder-584473_1200x.jpg?v=1734715742",
      alt: "Outer layer: Dark brown leather jacket"
    }
  ]
};
  
function renderLayer(layerType, containerSelector) {
  const container = $(containerSelector);
  layeringData[layerType].forEach(({ src, alt }) => {
    const img = $(`
      <div class="col-md-4">
        <img class="img-fluid d-block mx-auto layer-img" src="${src}" alt="${alt}" />
      </div>
    `);
    container.append(img);
  });
}
  
  $(document).ready(function () {
    renderLayer("base", "#base-layer-images");
    renderLayer("mid", "#mid-layer-images");
    renderLayer("outer", "#outer-layer-images");
  });
  