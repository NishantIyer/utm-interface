<template>
  <div class="pics-page">
    <div class="years-bar">
      <div
        v-for="year in years"
        :key="year"
        :class="{ active: year === selectedYear }"
        class="year"
        @click="selectYear(year)"
      >
        {{ year }}
      </div>
      <div class="bar-highlight" :style="highlightStyle"></div>
    </div>

    <div class="pics-gallery">
      <div v-for="photo in getPhotosForYear(selectedYear)" :key="photo.url" class="photo-item">
        <div class="photo-wrapper">
          <div class="photo-card" :style="{ backgroundImage: 'url(' + photo.url + ')' }" @click="openPhotoDetails(photo)">
            <div class="photo-overlay">
              <div class="photo-details" v-if="photo.showDetails">
                <div class="description">{{ photo.description }}</div>
                <div class="actions">
                  <button class="like-button" @click="likePhoto(photo)">
                    Like <span class="like-count">{{ photo.likes }}</span>
                  </button>
                  <button class="open-button" @click="openPhoto(photo)">
                    Open
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      years: ["2023", "2022", "2021", "Projects", "Other"],
      selectedYear: "2023",
      images: [
        {
          year: "2023",
          photos: [
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1115957383466852352/download_3.png?width=365&height=491",
              description: "dw..i didn't draw it",
              showDetails: false,
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1115957383466852352/download_3.png?width=365&height=491"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116236755486650428/Screenshot_from_2023-05-31_10-47-18.png?width=366&height=490",
              description: "May 2023",
              showDetails: false,
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116236755486650428/Screenshot_from_2023-05-31_10-47-18.png?width=366&height=490"
            },
            
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1115957382254710824/cheek.png?width=344&height=491",
              description: "1 month of mewing hard",
              showDetails: false,
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1115957382254710824/cheek.png?width=344&height=491"
            },
          ]
        },
        {
          year: "2022",
          photos: [
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116237331712725072/nishhh.png?width=368&height=491",
              description: "",
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116237331712725072/nishhh.png?width=368&height=491"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116298856502669332/Screenshot_from_2023-05-19_20-05-40.png?width=431&height=491",
              description: "",
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116298856502669332/Screenshot_from_2023-05-19_20-05-40.png?width=431&height=491"
            },
            {
              url: "https://cdn.discordapp.com/attachments/971299427715272734/1126546017081368686/Screenshot_from_2023-06-05_15-13-44.png",
              description: "oops..bad pic",
              likes: 0,
              link: "https://cdn.discordapp.com/attachments/971299427715272734/1126546017081368686/Screenshot_from_2023-06-05_15-13-44.png"
            },
          
          ]
        },
        {
          year: "2021",
          photos: [
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116299894051844136/Screenshot_from_2023-06-08_15-06-58.png?width=229&height=277",
              description: "cuteness overload",
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116299894051844136/Screenshot_from_2023-06-08_15-06-58.png?width=229&height=277"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116299893544333322/Screenshot_from_2023-06-08_15-06-22.png?width=331&height=390",
              description: "",
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116299893544333322/Screenshot_from_2023-06-08_15-06-22.png?width=331&height=390"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116299893783400458/Screenshot_from_2023-06-08_15-06-50.png?width=199&height=240",
              description: "",
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116299893783400458/Screenshot_from_2023-06-08_15-06-50.png?width=199&height=240"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116300410261622804/Screenshot_from_2023-06-08_15-08-45.png?width=229&height=277",
              description: "",
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116300410261622804/Screenshot_from_2023-06-08_15-08-45.png?width=229&height=277"
            },
            
            
          
          ]
        },
        {
          year: "Projects",
          photos: [
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116383468679614565/Screenshot_from_2023-06-08_20-38-41.png?width=268&height=246",
              description: "",
              showDetails: false,
              likes: 0,
              link: "https://drive.google.com/file/d/1ptoib5G9sd63z1UmxJmcXGFMj4IkVrQQ/view?usp=drive_link"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116384004371927201/Screenshot_from_2023-06-08_20-40-11.png?width=430&height=341",
              description: "",
              showDetails: false,
              likes: 0,
              link: "https://drive.google.com/file/d/1cto9VRn1o-wbGKDdhm87zpbx0hTW_ZHf/view?usp=drive_link"
            },
            
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116384043613814794/e06b1a76-11fc-4af5-9aea-927de07f825e.jpg?width=722&height=406",
              description: "",
              showDetails: false,
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116384043613814794/e06b1a76-11fc-4af5-9aea-927de07f825e.jpg?width=722&height=406"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116384044209422366/bios.jpeg?width=455&height=270",
              description: "",
              showDetails: false,
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116384044209422366/bios.jpeg?width=455&height=270"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116384044486250536/2018.04.03.png?width=449&height=354",
              description: "",
              showDetails: false,
              likes: 0,
              link: "https://media.discordapp.net/attachments/971299427715272734/1116384044486250536/2018.04.03.png?width=449&height=354"
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116384004594221078/Screenshot_from_2023-06-08_20-40-44.png?width=257&height=341",
              description: "",
              showDetails: false,
              likes: 0,
              link: "https://drive.google.com/file/d/10wJo3b0oCFNnBsArccK17-sHESmb7xla/view?usp=drive_link"
            },
          ]
        },
        {
          year: "Other",
          photos: [
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116385993659011173/98e5b039a7b38f6f4ed0590db76dd29a.jpg?width=405&height=406",
              description: "just sculpted",
              likes: 0,
              link: ""
            },
            {
              url: "https://media.discordapp.net/attachments/971299427715272734/1116386346190258246/bd5e9c581dde6626b7d996b0f84f94bb.jpg?width=209&height=405",
              description: "more than your hair",
              likes: 0,
              link: ""
            },
          
          ]
        },
      ],
      highlightPosition: 0,
    };
  },
  computed: {
    highlightStyle() {
      return {
        transform: `translateX(${this.highlightPosition}px)`,
      };
    },
  },
  methods: {
    selectYear(year) {
      this.selectedYear = year;
      this.highlightPosition = this.getYearOffset(year);
    },
    getPhotosForYear(year) {
      const yearData = this.images.find((image) => image.year === year);
      return yearData ? yearData.photos : [];
    },
    openPhotoDetails(photo) {
      photo.showDetails = !photo.showDetails;
    },
    likePhoto(photo) {
      photo.likes += 1;
    },
    openPhoto(photo) {
      window.open(photo.link, "_blank");
    },
    getYearOffset(year) {
      const index = this.years.indexOf(year);
      if (index !== -1) {
        const yearWidth = 60; // Adjust the width of each year item
        const yearSpacing = 10; // Adjust the spacing between each year item
        return index * (yearWidth + yearSpacing);
      }
      return 0;
    },
  },
};
</script>

<style scoped>
.pics-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: transparent;
}

.years-bar {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.year {
  cursor: pointer;
  font-size: 16px;
  margin: 0 5px;
  padding: 5px 10px;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.year.active {
  background-color: #ffffff;
  color: #111111;
}

.bar-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px; /* Adjust the width of each year item */
  height: 3px;
  background-color: transparent; /* Update this line to match the background color of the years bar */
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.pics-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 30px;
  max-width: 800px;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .pics-gallery {
    grid-template-columns: 1fr; /* Display a single column in mobile mode */
    grid-gap: 20px; /* Adjust the gap value as desired */
  }
}


.photo-item {
  position: relative;
}

.photo-wrapper {
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  width: 240px; /* Adjust the width as desired */
  height: 240px; /* Adjust the height as desired */
}

.photo-wrapper:hover {
  transform: translateY(-5px);
}

.photo-card {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  overflow: hidden;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-overlay:hover {
  opacity: 1;
}

.photo-details {
  text-align: center;
}

.description {
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.like-button,
.open-button {
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.like-button:hover,
.open-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.like-count {
  font-weight: bold;
  margin-left: 5px;
}
</style>
