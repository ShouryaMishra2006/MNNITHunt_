// services/authService.ts

import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('/auth/login', { email, password });
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
    } catch (error: any) {
        return { success: false, message: error.response.data.message };
    }
};

export const signupUser = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        const response = await axios.post('/auth/signup', { email, password, firstName, lastName });
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
    } catch (error: any) {
        return { success: false, message: error.response.data.message };
    }
};
