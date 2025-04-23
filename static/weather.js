const weatherPictureData = {
    temperature: [
      {
        text: "60 and below (wear more)",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20230914%2Foriginal%2Fpngtree-winter-jacket-vector-png-image_12147427.png&f=1&nofb=1&ipt=ce8870ef3d1f113d648e12f9047f969dda9b799280adbb51b8b156885ed1b7a6",
        alt: "Puffy winter jacket"
      },
      {
        text: "Between 60F - 80F (comfortable)",
        img: "https://clipart-library.com/8300/2368/clothing-_shirt-_pants-_work-daily_routine-_daily-routine-512.png",
        alt: "T-shirt and pants"
      },
      {
        text: "80 and above (wear less)",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20230914%2Foriginal%2Fpngtree-swim-trunk-clipart-the-image-is-of-cartoon-swim-trunks-vector-png-image_12151693.png&f=1&nofb=1&ipt=a902b87f90ef40292d61865f4b9de049f25ee3a42bc32c0407b43523ce5ef012",
        alt: "Swim trunks"
      }
    ],
    conditions: [
      {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20201209%2Foriginal%2Fpngtree-sun-png-clipart-colored-png-image_5656301.png&f=1&nofb=1&ipt=49663e5690a2294067c32f67964607fdc1d61f7df01c73f414d034aafbda769e",
        alt: "Sun icon",
        advice: "Warmer"
      },
      {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F7084%2F7084486.png&f=1&nofb=1&ipt=101246e1f53384ad7e3a58665f024666e4cf2479c8965b4870957a1e6601e32c",
        alt: "Cloud icon",
        advice: "Around the same"
      },
      {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fnature-emoji%2F50%2FWindy-1024.png&f=1&nofb=1&ipt=6ef5fcefdede65d5a0ecd9522939e19f7d7658cc4f6da1b7e1a1bfa0cba2e597",
        alt: "Wind icon",
        advice: "Colder"
      },
      {
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F3262%2F3262929.png&f=1&nofb=1&ipt=1e793676beed323fa9523c62a8763bd8afe765def17a4956cf82d30e699e3d8e",
        alt: "Snow/rain icon",
        advice: "Wet"
      }
    ],
    humidity: [
      {
        label: "Low Humidity",
        subtext: "40%RH and below",
        advice: "Easy to cool off",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.usatoday.com%2Fgcdn%2Fpresto%2F2021%2F02%2F17%2FUSAT%2Fab5291df-c1af-4e80-970a-46eb08c150cb-icicles_from_fan.jpeg%3Fcrop%3D1535%2C863%2Cx0%2Cy480%26width%3D1535%26height%3D863%26format%3Dpjpg%26auto%3Dwebp&f=1&nofb=1&ipt=80b1d1e0ac038dc369a73a05aaf9f98b7f06941493e6fbd57984ab8a1c423b91",
        alt: "Ceiling fan with icicles"
      },
      {
        label: "Comfortable",
        subtext: "40%RH – 60%",
        advice: "Ideal cooling range",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fstock-image-office-tabletop-fan-white-background-compact-cooling-breeze-generative-ai_184076-5167.jpg&f=1&nofb=1&ipt=9e1d1068bc6ca7b07f0d2423b67434c3154900a8f4d2ddd33f6badc6a05a6cbd",
        alt: "Standard electric fan"
      },
      {
        label: "High Humidity",
        subtext: "60%RH and above",
        advice: "Hard to cool off",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Ffan-blow-out-fire-flame_1009902-124270.jpg&f=1&nofb=1&ipt=7286305edc88a7c2696d36fd80cc0e7ff008d304bb9e25879943d295e5ff797f",
        alt: "Fan blowing fire"
      }
    ]
  };
  
  function renderTemperature(selector) {
    const container = $(selector);
    weatherPictureData.temperature.forEach(({ text, img, alt }) => {
      container.append(`
        <div class="col-md-4 text-center">
          <p><strong>${text}</strong></p>
          <img class="img-fluid" src="${img}" alt="${alt}" />
        </div>
      `);
    });
  }
  
  function renderConditions(selector) {
    const container = $(selector);
    weatherPictureData.conditions.forEach(({ img, alt, advice }) => {
      container.append(`
        <div class="col-md-3 text-center">
          <img src="${img}" alt="${alt}" class="img-fluid my-2" style="max-height: 100px;" />
          <div class="advice-bubble mt-2">${advice}</div>
        </div>
      `);
    });
  }

  function renderHumidity(selector) {
    const container = $(selector);
    weatherPictureData.humidity.forEach(({ label, subtext, advice, img, alt }) => {
      container.append(`
        <div class="col-md-4 text-center">
          <h5><strong>${label}</strong><br><small>${subtext}</small></h5>
          <img src="${img}" alt="${alt}" class="img-fluid my-2" style="max-height: 200px;" />
          <p><em>${advice}</em></p>
        </div>
      `);
    });
  }
  
  $(document).ready(function () {
    renderTemperature("#temperature-section");
    renderConditions("#conditions-section");
    renderHumidity("#humidity-section");
  });