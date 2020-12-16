import axios from 'axios';

const Services = {
  async getUnlockedBg() {
    await axios.get('/get-backgrounds');
  }
}

export default Services