/**
 * @param {string} from
 * @param {string} to
 * @returns {Promise<{rate: number, time_last_update_unix: number}>}
 */
export const fetchRate = async (from, to) => {
    const response = await fetch(`http://localhost:3000/convert?from=${from}&to=${to}`);
    const data = await response.json();
    return data;
};