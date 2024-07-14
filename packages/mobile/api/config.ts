interface Config {
    baseUrl: string;
    webappUrl: string;
}

const CONFIG: Config = {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:50000/',
    webappUrl: process.env.EXPO_PUBLIC_WEBAPP_ROOT || 'http://127.0.0.1:3000/'
};

export default CONFIG;

