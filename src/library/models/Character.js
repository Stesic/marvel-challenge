

class Character {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.imageUrl = `${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`;
    this.selected = false;
  }

  toogleSelected(data) {
    this.selected = !data.selected
  }

}

export default Character;