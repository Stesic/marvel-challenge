export const KEYS = {
  SELECTED_CHARACTER_LIST: 'bookmark-character-list'
}

class Storage {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      localStorage.removeItem(key)
    }
  }

  load(key) {
    try {
      const data = localStorage.getItem(key)
      if (!data) {
        return null
      }
      return JSON.parse(data)
    } catch (error) {
      window.localStorage.removeItem(key)
    }
  }
}

export const storage = new Storage()
