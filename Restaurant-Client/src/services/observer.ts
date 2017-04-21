export default  class  Observer {
    public static onSessionUpdate: any = () => undefined;
    public static showLoading: any = () => undefined;
    public static showSuccess: any = () => undefined;
    public static showError: any = () => undefined;
    public static saveSession(userInfo) {
        let userAuth = userInfo.access_token;
        sessionStorage.setItem('authToken', userAuth);
        let username = userInfo.userName;
        sessionStorage.setItem('username', username);

        this.onSessionUpdate();
    }
}