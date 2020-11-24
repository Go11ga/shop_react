//export default function(url, options = {}, baseUrl = '/reactcourseapi/'){
export default function(url, options = {}, baseUrl = '/reactcourseapi/'){
    return fetch(baseUrl + url, options).then((response) => {
        if(response.status !== 200){
            return response.text().then(function(text){
                throw new Error(text);
            });
        }

        return response.json();
    });
}
