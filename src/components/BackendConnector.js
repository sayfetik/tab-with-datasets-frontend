import axios from 'axios'

export default class BackendConnector {
  static host = 'http://10.100.30.74';
  static preview_endpoint = 'api/preview';
  static recommend_endpoint = 'api/recommend';
  static search_endpoint = 'api/search';
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

  static async search(search_query) {
      return await this.get(`${this.search_endpoint}/${search_query}/${this.results_amount_limit}`);
  }

  static async upload(uploadingMetadata, uploadingFiles, uploadingImage) {
      console.log('hiiiiii')
      return await this.post(this.upload_endpoint, uploadingMetadata, uploadingFiles, uploadingImage);
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

    static async post(endpoint, uploadingMetadata, files, image) {
        const formData = new FormData();

        
        
        formData.append('uploading_metadata', JSON.stringify(uploadingMetadata));

        
        
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            if (image) {
                formData.append('image', image);
            }  

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
              });
        try {
            const response = await axios({
                method: 'post',
                url: `${this.host}/${endpoint}`,
                data: formData,
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
