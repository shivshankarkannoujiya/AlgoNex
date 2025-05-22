class ApiClient {

    constructor() {
        this.baseUrl = "http://localhost:3000/api/v1";
        this.defaultHeaders = {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }

    async customFetch(endpoint, options = {}, retry = true) {
        
        try {
            const url = `${this.baseUrl}${endpoint}`
            const headers = { ...this.defaultHeaders, ...options?.headers }
            
            const config = {
                ...options,
                headers,
                credentials: "include",
            }
    
            const response = await fetch(url, config);
    
            if (response.status === 401 && retry) {
                const refreshResponse = await fetch(`${this.baseUrl}/users/refresh-token`, {
                    method: "POST",
                    credentials: "include"
                })
    
                if (refreshResponse.ok) {
                    return this.customFetch(endpoint, options, false);
                } else {
                    throw new Error("Session expired. Please log in again.");
                }
            }
    
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json()
            return data;
        } catch (error) {
            console.error("API ERROR: ", error.message)
            throw error;
        }
    }

    async signup(username, email, password) {
        return this.customFetch("/users/signup", {
            method: "POST",
            body: JSON.stringify({username, email, password})
        })
    }


    async verifyEmail(token) {
        return this.customFetch(`/users/verify/${token}`,{
                method: "GET" 
                
        });
    }
  

    async login(email, password) {
        return this.customFetch("/users/login", {
            method: "POST",
            body: JSON.stringify({email, password})
        })
    }

    async getMe() {
        return this.customFetch("/users/me")
    }

    async logout() {
        return this.customFetch("/users/logout", {
            method: "POST",
        });
    }
}


const apiClinet = new ApiClient();
export default apiClinet