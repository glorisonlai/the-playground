import axios from 'axios';

const Services = {
  async getUnlockedBg() {
    await axios.get('/get-backgrounds');
  },
  
  async unlockBg(id, msg) {
    const blah = await axios.post('/api/c2', {
      msg: msg
    });
    console.log(blah);
  }
}

export default Services