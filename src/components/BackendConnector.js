import axios from 'axios'

export default class BackendConnector {
    static host = 'http://10.100.30.74';
    static preview_endpoint = 'api/preview';
    static recommend_endpoint = 'api/recommend';
    static search_endpoint = 'api/search';
    static searchByQuery_endpoint = 'api/search_by_query';
    static searchByTags_endpoint = 'api/search_by_tags';
    static download_initial_dataset_endpoint = 'api/download_initial_dataset';
    static download_cleaned_dataset_endpoint = 'api/download_cleaned_dataset';
    static description_endpoint = 'api/generate_description';
    static tags_endpoint = 'api/generate_tags';
    static upload_endpoint = 'api/upload';
    static update_endpoint = 'api/update';
    static delete_endpoint = 'api/delete';
    static getImage_endpoint = 'api/get_image'
    static generateDescription_endpoint = 'api/generate_description';
    static generateSmallDescription_endpoint = 'api/summarize_description';
    static generateTags_endpoint = 'api/generate_tags';
    static tagsSuggestions_endpoint = 'api/search_tags';
    static uploadRequests_endpoint = 'api/get_upload_requests';
    static uploadRequestPreview_endpoint ='api/preview_upload_request';
    static codeInitialDataset_endpoint = 'api/get_code_for_downloading_initial_dataset';
    static codeAdvancedDataset_endpoint ='api/get_code_for_downloading_cleaned_datasett';

    static results_amount_limit = 12;

    static async preview(id) {
        const url = `${this.host}/${this.preview_endpoint}/${id}`;
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
            files_structure: filesStructure || {}
        };
    }

    static async recommend(id) {
        return await this.get(`${this.recommend_endpoint}/${id}/2`);
    }

    static async download_code_initial_dataset(id) {
        return await this.get(`${this.codeInitialDataset_endpoint}/${id}`);
    }

    static async download_code_cleaned_dataset(id) {
        return await this.get(`${this.codeAdvancedDataset_endpoint}/${id}`);
    }

    static async download_initial_dataset(id) {
        try {
            const response = await axios({
                method: 'get',
                url: `${this.host}/${this.download_initial_dataset_endpoint}/${id}`,
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error downloading file:', error);
            return null;
        }
    }

    static async download_cleaned_dataset(id) {
        try {
            const response = await axios({
                method: 'get',
                url: `${this.host}/${this.download_cleaned_dataset_endpoint}/${id}`,
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error downloading file:', error);
            return null;
        }
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
        
        if (uploadingImage) formData.append('image', uploadingImage);

        return await this.post(this.upload_endpoint, formData);
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
        
        
    
        const api_url = `${this.host}/${this.update_endpoint}/${id}`;
    
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
            console.log(response.data);
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
        const url = `${this.host}/${this.search_endpoint}/${searchString}/36`;
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

    /*static async searchByTags(filters) {
        const url = `${this.host}/${this.searchByTags_endpoint}/36`;
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
    }*/

    static async  generateDescription(collectionMethod, dataStructure, useCases) {
        const url = `${this.host}/${this.generateDescription_endpoint}`;
        const requestBody = {
            actions_taken_to_collect_and_process_the_dataset: collectionMethod,
            detailed_description_of_content: dataStructure,
            potential_use_cases: useCases
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

        return await response.json();
    };
    
    static async  generateSmallDescription(text) {
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

    static async fetchUploadRequestPreview(request_id) {
        return await this.get(`${this.uploadRequestPreview_endpoint}/${request_id}`);
    }

    static async fetchUploadRequests(account_id) {
        return await this.get(`${this.uploadRequests_endpoint}/${account_id}`);
    }
}
