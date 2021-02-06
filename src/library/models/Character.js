

class Character {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.imageUrl = `${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`;
  }

}

export default Character;