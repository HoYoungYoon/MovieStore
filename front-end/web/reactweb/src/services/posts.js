import axios from 'axios';

export function getTitle(id) {
    return axios.get('http://localhost:5000/posts/title/' + id);
}