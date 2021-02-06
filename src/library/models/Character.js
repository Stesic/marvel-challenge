

class Character {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.imageUrl = `${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}` || 'https://via.placeholder.com/300x450';
  }

}

export default Character;