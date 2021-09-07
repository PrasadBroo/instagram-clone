export const isvalidUsername = (username) => {
    const isVAlidUsername = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm).test(username);
    return isVAlidUsername;
}

export const isvalideBio = (bio) => {
    if(!bio)return true
    if (bio.length > 120 || bio === undefined) {
        return false
    }
    return true;

}

export const isvalidFullName = (fullName) => {
    if (fullName.length > 50 || fullName === undefined || fullName === null) {
        return false
    }
    return true;
}
export const isEverythingPassedValid = (username, bio, fullName) => {
    const isValidUsername = new RegExp(/^[a-zA-Z0-9_-]{3,16}$/).test(username);
    const isbioValid = bio.length > 120 || bio === undefined;
    const isFullNameValid = fullName.length > 20 || fullName === undefined || fullName === null;
    return isFullNameValid && isbioValid && isValidUsername;

}

export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export const isValidPassword = (password)=>{
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    return re.test(password)
}
export const isValidWebsiteLink = (website)=>{
    if(!website)return true;
    const re = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_/0-9\-#.]*)\??([a-z_/0-9\-#=&]*)/g
    return re.test(String(website).toLowerCase())
}