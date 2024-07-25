import axios from 'axios'

export default class BackendConnector {
    static host = 'http://10.100.30.74';
    static preview_endpoint = 'api/preview';
    static recommend_endpoint = 'api/recommend';
    static searchByQuery_endpoint = 'api/search_by_query';
    static searchByTags_endpoint = 'api/search_by_tags';
    static download_endpoint = 'api/download';
    static description_endpoint = 'api/generate_description';
    static tags_endpoint = 'api/generate_tags';
    static upload_endpoint = 'api/upload';
    static update_endpoint = 'api/update';
    static delete_endpoint = 'api/delete';
    static getImage_endpoint = 'api/get_image'
    static generateDescription_endpoint = 'api/generate_description';
    static generateTags_endpoint = 'api/generate_tags';

    static results_amount_limit = 12;

    static async preview(id) {
        const url = `${this.host}/${this.preview_endpoint}/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            id: data.id || '',
            title: data.title || '',
            description: data.description || '',
            geography_and_places: data.tags.geography_and_places || [],
            language: data.tags.language || [],
            data_type: data.tags.data_type || [],
            task: data.tags.task || [],
            technique: data.tags.technique || [],
            subject: data.tags.subject || [],
            owner: data.owner || '',
            authors: data.authors || '',
            data_source: data.data_source || '',
            license: data.license || '',
            number_of_files: data.number_of_files || 0,
            doi: data.doi || '',
            expected_update_frequency: data.expected_update_frequency || 'Никогда',
            last_change_date: data.last_change_date || '',
            last_change_time: data.last_change_time || '',
            downloads_number: data.downloads_number || 0,
            visibility: data.visibility || '',
            usability_rating: data.usability_rating || 0,
            size: data.size || '',
            size_bytes: data.size_bytes || 0,
            files: data.files || [],
            rating: data.rating || 0
        };
    }

    static async recommend(id) {
        return await this.get(`${this.recommend_endpoint}/${id}/4`);
    }

    static async search(search_query) {
        return await this.get(`${this.search_endpoint}/${search_query}/${this.results_amount_limit}`);
    }

    static async download(id) {
        return await this.get(`${this.download_endpoint}/${id}`);
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
    
    static async getImage(id) {
        const url = `${this.host}/${this.getImage_endpoint}/${id}`;

        try {
            const response = await axios({
                method: 'get',
                url: url,
                responseType: 'blob',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const imageUrl = URL.createObjectURL(response.data);
            return imageUrl;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async searchByQuery(searchString, filters) {
        const url = `${this.host}/${this.searchByQuery_endpoint}/${searchString}/30`;
        const requestBody = filters;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    }

    static async searchByTags(filters) {
        const url = `${this.host}/${this.searchByTags_endpoint}/30`;
        const requestBody = filters;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    }

    static async  generateDescription(collectionMethod, dataStructure, useCases) {
        const url = `${this.host}/${this.generateDescription_endpoint}`;
        const requestBody = {
            actions_taken_to_collect_and_process_the_dataset: collectionMethod,
            detailed_description_of_content: dataStructure,
            potential_use_cases: useCases
        };
        const response = await axios.post(url, requestBody);
        return response.data;
    };
    
    static async generateTags(description)  {
        const url = `${this.host}/${this.generateTags_endpoint}`;
        const requestBody = { text: description };
        const response = await axios.post(url, requestBody);
        return response.data;
    };
}
