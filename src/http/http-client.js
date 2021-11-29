import axios from 'axios';

const backendUrl = 'http://localhost:8080/map';

// POST backend /map
export async function sendMapInfo(mapData) {
    const data = mapData;
    const config = {};
    return axios.post(backendUrl, data, config);
} 