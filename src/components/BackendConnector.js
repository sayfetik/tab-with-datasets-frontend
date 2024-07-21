import axios from 'axios'

export default class BackendConnector {
  static host = 'http://10.100.30.74';
  static preview_endpoint = 'api/preview';
  static recommend_endpoint = 'api/recommend';
  static search_endpoint = 'api/search_by_query';
  static download_endpoint = 'api/download';
  static description_endpoint = 'api/generate_description';
  static tags_endpoint = 'api/generate_tags';
  static upload_endpoint = 'api/upload';

  static results_amount_limit = 12;

  static async preview(id) {
      return await this.get(`${this.preview_endpoint}/${id}`);
  }

  static async recommend(id) {
      return await this.get(`${this.recommend_endpoint}/${id}/${this.results_amount_limit}`);
  }

  static async search(search_query, tags) {
    console.log(JSON.stringify(tags))
    return await this.post(`${this.search_endpoint}/${search_query}/${this.results_amount_limit}`, JSON.stringify(tags));
  }

  static async upload(metadata, files, image) {
    const formData = new FormData();

    formData.append('uploading_metadata', JSON.stringify(metadata));

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    if (image) {
        formData.append('image', image);
    }  

    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    return await this.post(this.upload_endpoint, formData);
  }

  static async get(endpoint) {
      try {
          const response = await axios({
              method: 'get',
              url: `${this.host}/${endpoint}`,
          });
          return response.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  }

    static async post(endpoint, data) {
        try {
            const response = await axios({
                method: 'post',
                url: `${this.host}/${endpoint}`,
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading data:', error.response?.data || error.message);
            return null;
        }
    }
}
