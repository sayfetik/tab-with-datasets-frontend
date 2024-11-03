import axios from 'axios';
import { keycloak } from '../keycloak';
import { useUserProfile } from '../useUserProfile'

export default class BackendConnector {
    // Метод для получения токена
    static async getUserId() {
        if (!keycloak.authenticated) {
            throw new Error('User is not authenticated');
        }
        const token = keycloak.token;
        const user_id = token;
        return user_id;
    }

    static results_amount_limit = 12;

    static host = process.env.REACT_APP_HOST_URL;
    static preview_endpoint = 'api/preview';
    static recommend_endpoint = 'api/recommend';
    static search_endpoint = 'api/search';
    static download_initial_dataset_endpoint = 'api/download_initial_dataset';
    static download_cleaned_dataset_endpoint = 'api/download_cleaned_dataset';
    static description_endpoint = 'api/generate_description';
    static tags_endpoint = 'api/generate_tags';
    static upload_endpoint = `api/upload`;
    static update_endpoint = 'api/update';
    static delete_endpoint = 'api/delete';
    static getImage_endpoint = 'api/get_image';
    static generateDescription_endpoint = 'api/generate_description';
    static generateSmallDescription_endpoint = 'api/summarize_description';
    static generateTags_endpoint = 'api/generate_tags';
    static tagsSuggestions_endpoint = 'api/search_tags';
    static uploading_requests_endpoint = 'api/get_uploading_requests';
    static failed_requests_endpoint = 'api/get_failed_requests';
    static uploaded_requests_endpoint = 'api/get_uploaded_requests';
    static uploadRequestPreview_endpoint ='api/preview_upload_request';
    static codeInitialDataset_endpoint = 'api/get_code_for_downloading_initial_dataset';
    static codeAdvancedDataset_endpoint ='api/get_code_for_downloading_cleaned_dataset';
    static like_dataset_endpoint ='api/like_dataset';
    static dislike_dataset_endpoint ='api/dislike_dataset';
    static remove_rating_endpoint ='api/remove_rating';
    static highly_rated_datasets_endpoint ='api/get_highly_rated_datasets';


    // Метод для выполнения запроса с токеном
    static async fetchWithToken(url, options) {
        const token = await this.getUserId();
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };

        return axios({
            ...options,
            url,
            headers,
        });
    }

    static async preview(id) {
        const user_id = await this.getUserId();
        const url = `${this.host}/${this.preview_endpoint}/${id}?user_id=${user_id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const data = responseData.metadata;
        const filesStructure = responseData.files_structure;
        return {
            id: data.id || '',
            title: data.title || '',
            description: data.description || '',
            small_description: data.small_description || '',
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
            rating: data.rating || 0,
            files_structure: data.files_structure || {},
            user_reaction: responseData.rating || '',
            likes_amount: data.likes_amount || 0,
            dislikes_amount: data.dislikes_amount || 0
        };
    }

    static async recommend(id) {
        return await this.get(`${this.recommend_endpoint}/${id}/9`);
    }

    static async download_code_initial_dataset(id) {
        return await this.get(`${this.codeInitialDataset_endpoint}/${id}`);
    }

    static async download_code_cleaned_dataset(id) {
        return await this.get(`${this.codeAdvancedDataset_endpoint}/${id}`);
    }

    static async download_initial_dataset(id) {
        const user_id = await this.getUserId();
        try {
            const response = await axios({
                method: 'get',
                url: `${this.host}/${this.download_initial_dataset_endpoint}/${id}?user_id=${user_id}`,
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error downloading file:', error);
            return null;
        }
    }

    static async download_cleaned_dataset(id) {
        const user_id = await this.getUserId();
        try {
            const response = await axios({
                method: 'get',
                url: `${this.host}/${this.download_cleaned_dataset_endpoint}/${id}?user_id=${user_id}`,
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error downloading file:', error);
            return null;
        }
    }

    static async delete(id) {
        const user_id = await this.getUserId();
        return await this._delete(`${this.delete_endpoint}/${id}?user_id=${user_id}`);
    }

    static async upload(uploadingMetadata, uploadingFiles, uploadingImage) {
        const formData = new FormData();
        
        const user_id = await this.getUserId();
        const url = `${this.host}/${this.upload_endpoint}?user_id=${user_id}`;


        formData.append('uploading_metadata', JSON.stringify(uploadingMetadata));
        
        for (let i = 0; i < uploadingFiles.length; i++) {
            formData.append('files', uploadingFiles[i]);
        }
        
        if (uploadingImage) formData.append('image', uploadingImage);

        return await this.post(url, formData);
    }

    static async update(id, uploading_metadata, files_updates, updatingFiles, updatingImage) {
        const formData = new FormData();
    
        // Добавление метаданных в форму
        formData.append('uploading_metadata', JSON.stringify(uploading_metadata));
        formData.append('files_updates', JSON.stringify(files_updates));
    
        // Добавление файлов в форму
        for (let i = 0; i < updatingFiles.length; i++) {
            formData.append('files', updatingFiles[i]);
        }
    
        // Добавление изображения, если оно есть
        if (updatingImage && updatingImage instanceof File) {
            formData.append('image', updatingImage);
        } else {
            console.error('Файл изображения не выбран или неверный формат');
        }
        
        const user_id = await this.getUserId();
    
        const api_url = `${this.host}/${this.update_endpoint}/${id}?user_id=${user_id}`;
    
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                body: formData,
                headers: {
                    // Важно: не устанавливайте Content-Type, чтобы браузер сам его определил
                    // 'Content-Type': 'multipart/form-data' 
                }
            });
    
            // Проверка на успешный ответ
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Получение данных из ответа
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Ошибка при выполнении POST-запроса:', error);
            throw error; // Пробрасываем ошибку дальше
        }
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
    
            if (response.status !== 200) throw new Error(`HTTP error! status: ${response.status}`);

            const imageUrl = URL.createObjectURL(response.data);
            return { imageUrl: imageUrl, imageSize: parseInt(response.data.size, 10), imageFile: response.data };
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async search(searchString, filters) {
        const url = `${this.host}/${this.search_endpoint}/36?search_string=${searchString}`;
        const requestBody = filters
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

    static async generateDescription(parts, files) {
        const url = `${this.host}/${this.generateDescription_endpoint}`;
        const formData = new FormData();
        formData.append('parts', JSON.stringify(parts));
    
        files.forEach(file => {
            formData.append('files', file);
        });
    
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        return await response.json();
    }
    
    static async generateSmallDescription(text) {
        const url = `${this.host}/${this.generateSmallDescription_endpoint}`;
        const requestBody = {
            text: text
        };
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

        console.log(response)
        return await response.json();
    };
    
    static async generateTags(description)  {
        const url = `${this.host}/${this.generateTags_endpoint}`;
        const requestBody = { text: description };
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
    };

    static async fetchSuggestions(category, inputValue) {
        const url = `${this.host}/${this.tagsSuggestions_endpoint}/${category}/${inputValue}/3`;
        const requestBody = { tags: [] };

        try {
            const response = await axios.post(url, requestBody, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.data.tags;
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            return [];
        }
    }

    static async previewUploadRequest(request_id) {
        return await this.get(`${this.uploadRequestPreview_endpoint}/${request_id}`);
    }

    static async getUploadingRequests() {
        const user_id = await this.getUserId();
        return await this.get(`${this.uploading_requests_endpoint}/${user_id}`);
    }

    static async getFailedRequests() {
        const user_id = await this.getUserId();
        return await this.get(`${this.failed_requests_endpoint}/${user_id}`);
    }

    static async getUploadedRequests() {
        const user_id = await this.getUserId();
        return await this.get(`${this.uploaded_requests_endpoint}/${user_id}`);
    }

    static async like(dataset_id) {
        const user_id = await this.getUserId();
        return await this.get(`${this.like_dataset_endpoint}/${dataset_id}?user_id=${user_id}`);
    }
    
    static async dislike(dataset_id) {
        const user_id = await this.getUserId();
        return await this.get(`${this.dislike_dataset_endpoint}/${dataset_id}?user_id=${user_id}`);
    }

    static async remove_rating(dataset_id) {
        const user_id = await this.getUserId();
        return await this.get(`${this.remove_rating_endpoint}/${dataset_id}?user_id=${user_id}`);
    }

    static async highly_rated_datasets() {
        return await this.get(`${this.highly_rated_datasets_endpoint}/${this.results_amount_limit}`);
    }
}