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
    static update_endpoint = 'api/update';
    static delete_endpoint = 'api/delete';

    static results_amount_limit = 12;

    static async preview(id) {
        return await this.get(`${this.preview_endpoint}/${id}`);
    }

    static async recommend(id) {
        return await this.get(`${this.recommend_endpoint}/${id}/4`);
    }

    static async search(search_query) {
        return await this.get(`${this.search_endpoint}/${search_query}/${this.results_amount_limit}`);
    }

    static async delete(id) {
        return await this._delete(`${this.delete_endpoint}/${id}`);
    }

    static async upload(uploadingMetadata, uploadingFiles, uploadingImage) {
        const formData = new FormData();

        formData.append('uploading_metadata', JSON.stringify(uploadingMetadata));
        
        for (let i = 0; i < uploadingFiles.length; i++) {
            formData.append('files', uploadingFiles[i]);
        }
        
        if (uploadingImage) {
            formData.append('image', uploadingImage);
        }  

        return await this.post(this.upload_endpoint, formData);
    }

    static async update(updatingMetadata, updatingFiles, updatingImage) {
        const formData = new FormData();

        formData.append('metadata', JSON.stringify(updatingMetadata));

        for (let i = 0; i < updatingFiles.length; i++) {
            formData.append('files', updatingFiles[i]);
        }

        if (updatingImage) {
            formData.append('image', updatingImage);
        }

        return await this.post(this.update_endpoint, formData);
    }

  static async get(endpoint) {
        try {
            const response = await axios({
                method: 'get',
                url: `${this.host}/${endpoint}`
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

    static async _delete(endpoint) {
        try {
            const response = await axios({
                method: 'delete',
                url: `${this.host}/${endpoint}`
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
